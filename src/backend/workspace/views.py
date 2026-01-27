from django.db import transaction
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse, OpenApiParameter
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
import logging
from .models import UserSequence, Session, SessionStateChoices, Model
from .tasks import start_model_training
from .serializers import WorkspaceCreateSerializer, WorkspaceDetailSerializer, SessionDetailSerializer, WorkspacePaginationSerializer

logger = logging.getLogger(__name__)

class WorkspacePagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    max_page_size = 100

class WorkspaceCreateView(APIView):
    @extend_schema(
            request=WorkspaceCreateSerializer,
            examples=[
                OpenApiExample(
                    '모델 생성 요청 예시',
                    value={
                        "workspace": "보일러_프로젝트_A",
                        "model_name": "lightgbm",
                        "start_date": "2025-12-05",
                        "end_date": "2025-12-31",
                        "parameter": { 
                            "n_estimators": 0.9,
                            "learning_rate": 0.01,
                            "max_depth": 10
                        },
                        "tuning": "grid",
                        "dependent_var": "열효율",
                        "excluded_var": [
                            "센서1", 
                            "센서2"
                        ]
                    },
                    request_only=True
                ),
            ],
            responses={
                status.HTTP_201_CREATED: {
                    "type": "object",
                    "properties": {
                        "model_id": {"type": "string", "format": "uuid"},
                        "session_id": {"type": "string", "format": "uuid"},
                        "message": {"type": "string"}
                    }
                },
                status.HTTP_400_BAD_REQUEST: WorkspaceCreateSerializer,
            }
    )
    def post(self, request):
        user = request.user
        serializer = WorkspaceCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():
                model_instance = serializer.save() 
                
                UserSequence.objects.create(
                    # user_sequence_id는 Model.save() 내에서 자동생성, created 자동 채움
                    user_id=user,
                    model_id=model_instance
                )
                
                session_instance = Session.objects.create(
                    model_id=model_instance,
                    state=SessionStateChoices.CREATED,
                    started_at=timezone.now()
                )

                transaction.on_commit(
                    lambda: start_model_training.delay(str(session_instance.session_id))
                )
            
            return Response({
                "model_id": model_instance.model_id,
                "session_id": session_instance.session_id,
                "message": "모델 학습이 백그라운드에서 시작되었습니다."
            }, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            # 트랜잭션 내 오류 발생 시 자동 롤백
            logger.error(f"Workspace creation failed: {e}", exc_info=True)
            return Response({
                "message": f"오류 발생: {e}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class WorkspaceDetailView(APIView):
    @extend_schema(
        summary="워크스페이스 상세 조회",
        parameters=[
            OpenApiParameter(
                name="model_id",
                type=str,
                location=OpenApiParameter.PATH,
                required=True,
                description="조회할 모델의 UUID"
            ),
        ],
        responses={
            200: WorkspaceDetailSerializer,
            404: OpenApiResponse(description="해당 model_id에 해당하는 Workspace를 찾을 수 없습니다.")
        }
    )
    def get(self, request, model_id):
        model_instance = get_object_or_404(Model, model_id=model_id)
        serializer = WorkspaceDetailSerializer(model_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WorkspaceSessionView(APIView):
    @extend_schema(
        summary="모델 세션 정보 조회",  
        description="모델 세션 정보 조회 데이터를 반환합니다.",
        responses={200: SessionDetailSerializer}
    )
    def get(self, request, model_id):
        session = Session.objects.filter(model_id=model_id).last()
        if not session:
            return Response({"message": "결과가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = SessionDetailSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class WorkspaceListView(generics.ListAPIView):
    serializer_class = WorkspacePaginationSerializer
    pagination_class = WorkspacePagination

    @extend_schema(
        summary="워크스페이스 목록 조회",
        responses=WorkspaceCreateSerializer,
        examples=[
            OpenApiExample(
                name='목록 조회 응답 예시',
                summary='페이지네이션 및 필드 타입 반영 예시',
                description='실제 Model 구조에 맞춘 응답 데이터입니다.',
                value={
                    "count": 15,
                    "next": "http://127.0.0.1:8000/api/workspace/list/?page=2",
                    "previous": None,
                    "results": [
                        {
                            "model_id": "550e8400-e29b-41d4-a716-446655440000",
                            "workspace": "2024_하반기_보일러_효율분석",
                            "model_name": "lightgbm",
                            "start_date": "2024-01-01",
                            "end_date": "2024-06-30",
                            "parameter": {
                                "n_estimators": 500,
                                "learning_rate": 0.01,
                                "max_depth": -1
                            },
                            "tuning": "grid",
                            "dependent_var": "heat_efficiency",
                            "excluded_var": ["sensor_error_flag", "maintenance_mode"],
                            "created_at": "2025-12-08T10:00:00Z",
                            "updated_at": "2025-12-08T10:30:00Z"
                        },
                        {
                            "model_id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
                            "workspace": "테스트_모델_RandomForest",
                            "model_name": "randomforest",
                            "start_date": "2024-07-01",
                            "end_date": "2024-07-07",
                            "parameter": {
                                "n_estimators": 100,
                                "max_depth": 5
                            },
                            "tuning": "random",
                            "dependent_var": "output_temperature",
                            "excluded_var": [],
                            "created_at": "2025-12-07T15:20:00Z",
                            "updated_at": "2025-12-07T15:20:00Z"
                        }
                    ]
                },
                response_only=True
            )
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return Model.objects.all().order_by('-created_at')

class WorkspaceDeleteView(generics.DestroyAPIView):
    queryset = Model.objects.all()
    lookup_field = 'model_id'

    @extend_schema(
        summary="워크스페이스(모델) 삭제",
        responses={
            204: None,
            404: {"description": "해당 model_id를 찾을 수 없음"}
        }
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    
from pathlib import Path
from datetime import datetime, timedelta
import pandas as pd
from django.core.cache import cache
from drf_spectacular.utils import extend_schema, OpenApiParameter

CSV_ENCODING = "cp949"

def _get_csv_dir():
    base = Path(settings.BASE_DIR)
    return base / "workspace" / "ml_pipelines" / "data" / "rawdata_2025"

def _date_to_csv_name(d: datetime.date) -> str:
    return f"{d.isoformat()}.csv"

def load_recent_csv(days: int = 30) -> pd.DataFrame:
    """
    최근 days일치 CSV를 합쳐서 반환
    - 파일명: YYYY-MM-DD.csv
    - 인코딩: cp949 (한글 컬럼명)
    - 시간 컬럼: 생성일
    """
    cache_key = f"dashboard_recent_csv:{days}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached

    csv_dir = _get_csv_dir()
    today = datetime.now().date()
    start = today - timedelta(days=days)

    frames = []
    for i in range(days + 1):
        d = start + timedelta(days=i)
        fp = csv_dir / _date_to_csv_name(d)
        if fp.exists():
            df = pd.read_csv(fp, encoding=CSV_ENCODING, index_col=False)
            frames.append(df)

    if not frames:
        empty = pd.DataFrame()
        cache.set(cache_key, empty, timeout=30)
        return empty

    df = pd.concat(frames, ignore_index=True)

    if "생성일" in df.columns:
        df["생성일"] = pd.to_datetime(df["생성일"], errors="coerce")
        df = df.dropna(subset=["생성일"]).sort_values("생성일")
    else:
        df = pd.DataFrame()

    cache.set(cache_key, df, timeout=30)
    return df

METRIC_MAP = {
    "efficiency": "입출력법 효율",
    "efficiency_instant": "효율(순간)",
    "nox": "배기가스 NOx",
    "o2": "배기가스 O2",
    "load": "부하율",
    "steam": "순간 스팀량",
    "fuel_flow": "연료량(순간유량)",
}

METRIC_UNIT = {
    "efficiency": "%",
    "efficiency_instant": "%",
    "nox": "ppm",
    "o2": "%",
    "load": "%",
    "steam": "kg/h",
    "fuel_flow": "",
}

ALLOWED_BUCKETS = {
    "5m": "5T",
    "30m": "30T",
    "1h": "1H",
    "1d": "1D",
}

def _safe_series(df: pd.DataFrame, col: str) -> pd.Series:
    s = pd.to_numeric(df[col], errors="coerce")
    return s.dropna()

def make_summary_payload(df: pd.DataFrame) -> dict:
    """
    KPI 카드용 요약
    - 평균/최대/최소를 계산해서 내려줄 수 있음
    """
    if df.empty:
        return {"last_updated": None, "kpis": []}

    last_updated = df["생성일"].max().isoformat()

    kpi_keys = [
        "efficiency",
        "efficiency_instant",
        "nox",
        "o2",
        "load",
        "steam",
        "fuel_flow",
    ]

    kpis = []
    for key in kpi_keys:
        col = METRIC_MAP.get(key)
        if col and col in df.columns:
            s = _safe_series(df, col)
            if len(s) > 0:
                kpis.append({
                    "key": key,
                    "title": f"{col} 평균",
                    "value": float(s.mean()),
                    "unit": METRIC_UNIT.get(key, ""),
                    "min": float(s.min()),
                    "max": float(s.max()),
                    "sub": "최근 30일",
                })

    return {"last_updated": last_updated, "kpis": kpis}

def make_timeseries_payload(df: pd.DataFrame, metric_key: str, bucket_key: str) -> dict:
    """
    시계열 그래프용
    - bucket 단위로 resample(mean)
    """
    if df.empty:
        return {"metric": metric_key, "bucket": bucket_key, "points": []}

    col = METRIC_MAP.get(metric_key, METRIC_MAP["efficiency"])
    if col not in df.columns:
        return {"metric": metric_key, "bucket": bucket_key, "points": []}

    bucket = ALLOWED_BUCKETS.get(bucket_key, "1H")

    tmp = df[["생성일", col]].copy()
    tmp[col] = pd.to_numeric(tmp[col], errors="coerce")
    tmp = tmp.dropna()
    if tmp.empty:
        return {"metric": metric_key, "bucket": bucket_key, "points": []}

    tmp = tmp.set_index("생성일").sort_index()
    ts = tmp.resample(bucket).mean()

    points = [
        {"t": t.isoformat(timespec="minutes"), "v": float(v)}
        for t, v in ts[col].dropna().items()
    ]

    return {
        "metric": metric_key,
        "bucket": bucket_key,
        "unit": METRIC_UNIT.get(metric_key, ""),
        "points": points,
    }

def make_heatmap_payload(df: pd.DataFrame, metric_key: str) -> dict:
    """
    히트맵(Hour × Day)용
    - 요일(Mon~Sun) x 시간(0~23) 평균값
    """
    if df.empty:
        return {"metric": metric_key, "cells": []}

    col = METRIC_MAP.get(metric_key, METRIC_MAP["efficiency"])
    if col not in df.columns:
        return {"metric": metric_key, "cells": []}

    tmp = df[["생성일", col]].copy()
    tmp[col] = pd.to_numeric(tmp[col], errors="coerce")
    tmp = tmp.dropna()
    if tmp.empty:
        return {"metric": metric_key, "cells": []}

    tmp["dow"] = tmp["생성일"].dt.day_name()
    tmp["hour"] = tmp["생성일"].dt.hour

    pivot = tmp.pivot_table(index="dow", columns="hour", values=col, aggfunc="mean")

    order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    pivot = pivot.reindex(order)

    cells = []
    for dow in pivot.index:
        if dow is None or str(dow) == "nan":
            continue
        for hour in pivot.columns:
            val = pivot.loc[dow, hour]
            if pd.notna(val):
                cells.append({
                    "day": dow[:3],          
                    "hour": int(hour),       
                    "value": float(val),
                })

    return {
        "metric": metric_key,
        "unit": METRIC_UNIT.get(metric_key, ""),
        "cells": cells,
    }

class DashboardSummaryView(APIView):
    @extend_schema(
        summary="최근 30일 운영 대시보드 KPI 요약",
        parameters=[
            OpenApiParameter(
                name="days",
                type=int,
                required=False,
                description="최근 N일 데이터(기본 30)"
            ),
        ],
    )
    def get(self, request):
        days = int(request.query_params.get("days", 30))
        days = max(1, min(days, 90))  

        df = load_recent_csv(days=days)
        payload = make_summary_payload(df)
        return Response(payload, status=status.HTTP_200_OK)


class DashboardTimeseriesView(APIView):
    @extend_schema(
        summary="최근 30일 운영 대시보드 시계열 데이터",
        parameters=[
            OpenApiParameter(
                name="metric",
                type=str,
                required=False,
                description=f"metric key: {list(METRIC_MAP.keys())} (기본 efficiency)"
            ),
            OpenApiParameter(
                name="bucket",
                type=str,
                required=False,
                description="집계 단위: 5m | 30m | 1h | 1d (기본 1h)"
            ),
            OpenApiParameter(
                name="days",
                type=int,
                required=False,
                description="최근 N일 데이터(기본 30)"
            ),
        ],
    )
    def get(self, request):
        metric = request.query_params.get("metric", "efficiency")
        bucket = request.query_params.get("bucket", "1h")
        days = int(request.query_params.get("days", 30))

        if metric not in METRIC_MAP:
            return Response(
                {"message": f"metric이 올바르지 않습니다. allowed={list(METRIC_MAP.keys())}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if bucket not in ALLOWED_BUCKETS:
            return Response(
                {"message": f"bucket이 올바르지 않습니다. allowed={list(ALLOWED_BUCKETS.keys())}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        days = max(1, min(days, 90))

        df = load_recent_csv(days=days)
        payload = make_timeseries_payload(df, metric_key=metric, bucket_key=bucket)
        return Response(payload, status=status.HTTP_200_OK)


class DashboardHeatmapView(APIView):
    @extend_schema(
        summary="최근 30일 운영 대시보드 히트맵(Hour×Day)",
        parameters=[
            OpenApiParameter(
                name="metric",
                type=str,
                required=False,
                description=f"metric key: {list(METRIC_MAP.keys())} (기본 efficiency)"
            ),
            OpenApiParameter(
                name="days",
                type=int,
                required=False,
                description="최근 N일 데이터(기본 30)"
            ),
        ],
    )
    def get(self, request):
        metric = request.query_params.get("metric", "efficiency")
        days = int(request.query_params.get("days", 30))

        if metric not in METRIC_MAP:
            return Response(
                {"message": f"metric이 올바르지 않습니다. allowed={list(METRIC_MAP.keys())}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        days = max(1, min(days, 90))

        df = load_recent_csv(days=days)
        payload = make_heatmap_payload(df, metric_key=metric)
        return Response(payload, status=status.HTTP_200_OK)

    
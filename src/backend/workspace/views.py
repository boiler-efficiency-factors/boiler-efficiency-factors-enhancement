from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse, OpenApiParameter
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

from .models import UserSequence, Session, SessionStateChoices, Model
from .tasks import start_model_training
from .serializers import WorkspaceCreateSerializer, WorkspaceDetailSerializer, FeatureImportanceSerializer

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

        #TODO: DB 작업 시작
        try:
            with transaction.atomic():
                model_instance = serializer.save() 
                
                UserSequence.objects.create(
                    # user_sequence_id는 Model.save() 내에서 자동생성, created 자동 채움
                    user_id=user,
                    model_id=model_instance
                )
                
                session_instance = Session.objects.create(
                    #TODO: started_at은 DateTime 자동으로 해놨는데 timezone을 써야하나?
                    model_id=model_instance,
                    state=SessionStateChoices.CREATED,
                    started_at=timezone.now()
                )
                
                start_model_training.delay(str(session_instance.session_id))
            
            return Response({
                "model_id": model_instance.model_id,
                "session_id": session_instance.session_id,
                "message": "모델 학습이 백그라운드에서 시작되었습니다."
            }, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            # 트랜잭션 내 오류 발생 시 자동 롤백
            return Response({
                "message": f"오류 발생: {e}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class WorkspaceDetailView(APIView):

    @extend_schema(
        summary="워크스페이스 상세 조회",
        description="""
            특정 모델(model_id)에 해당하는 Workspace의 상세 정보를 반환하는 API입니다.

            ### 기능
            - model_id(UUID)를 기반으로 Workspace 모델 정보 조회
            - 학습 설정, 파라미터, 제외 변수 등 상세 데이터 반환

            ### 요청 예시
            GET /workspace/<model_id>/

            ### 응답 예시
            {
                "model_id": "...",
                "workspace": "...",
                "model_name": "...",
                "parameter": {...},
                "excluded_var": [...],
                ...
            }
        """,
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

# ✅ [수정] 피쳐 중요도 조회용 뷰
class WorkspaceFeatureView(APIView):
    @extend_schema(
        summary="워크스페이스 피쳐중요도 조회",  
        description="특정 모델의 피쳐 중요도(Feature Importance) 데이터를 반환합니다.",
        responses={200: FeatureImportanceSerializer}
    )
    def get(self, request, model_id):
        session = Session.objects.filter(model_id=model_id).last()
        if not session:
            return Response({"message": "분석 결과가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = FeatureImportanceSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ✅ [추가] 지표(Matrix) 조회용 뷰 
class WorkspaceMatrixView(APIView):
    @extend_schema(
        summary="워크스페이스 지표 조회",  
        description="특정 모델의 성능 지표(Metrics/Confusion Matrix) 데이터를 반환합니다.",
        responses={200: FeatureImportanceSerializer}
    )
    def get(self, request, model_id):
        session = Session.objects.filter(model_id=model_id).last()
        if not session:
            return Response({"message": "분석 결과가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = FeatureImportanceSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)
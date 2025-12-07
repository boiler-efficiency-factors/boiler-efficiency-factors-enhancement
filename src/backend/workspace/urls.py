from django.urls import path
from .views import WorkspaceCreateView, WorkspaceDetailView, WorkspaceFeatureView, WorkspaceMatrixView

urlpatterns = [
    # 워크스페이스 생성
    # URL: POST /api/home/workspace/create/
    path('home/workspace/create/', 
         WorkspaceCreateView.as_view(), 
         name='workspace-create'),
    
    # 워크스페이스 상세 조회
    # URL: GET /api/home/workspace/get/<model_id>/
    path('home/workspace/get/<uuid:model_id>/',
         WorkspaceDetailView.as_view(),
         name='workspace-detail'),

     # ✅ [1] 피쳐 중요도 조회 (명세서 주소: /api/home/workspace/get/feature/<model_id>/)
    path('home/workspace/get/feature/<uuid:model_id>/', 
         WorkspaceFeatureView.as_view(), 
         name='workspace-feature'),

    # ✅ [2] 지표 조회 (명세서 주소: /api/home/workspace/get/matrix/<model_id>/)
    path('home/workspace/get/matrix/<uuid:model_id>/', 
         WorkspaceMatrixView.as_view(), 
         name='workspace-matrix'),
]
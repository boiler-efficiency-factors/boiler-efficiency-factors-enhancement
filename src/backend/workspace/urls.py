from django.urls import path
from .views import (WorkspaceCreateView, WorkspaceDeleteView, WorkspaceDetailView, WorkspaceListView, WorkspaceSessionView
                    , DashboardSummaryView, DashboardTimeseriesView, DashboardHeatmapView)

urlpatterns = [
    # 워크스페이스 생성
    # URL: POST /api/home/workspace/create/
    path('home/workspace/create/',
         WorkspaceCreateView.as_view(), 
         name='workspace-create'),

    # 워크스페이스 삭제
     # URL: GET /api/home/workspace/delete/<model_id>/
     path('home/workspace/delete/<model_id>/', 
         WorkspaceDeleteView.as_view(), 
         name='workspace-delete'),
    
    # 워크스페이스 상세 조회
    # URL: GET /api/home/workspace/get/<model_id>/
     path('home/workspace/get/<uuid:model_id>/',
         WorkspaceDetailView.as_view(),
         name='workspace-detail'),
    
    # 워크스페이스 리스트 조회
    # URL: GET /api/home/workspace/get/paging/
    path('home/workspace/get/paging/',
         WorkspaceListView.as_view(),
         name='workspace-paging'),

     # 피쳐 중요도 조회
     # URL: GET /api/home/workspace/get/session/<model_id>/)
     path('home/workspace/get/session/<uuid:model_id>/', 
         WorkspaceSessionView.as_view(), 
         name='workspace-session'),
         
    path('home/dashboard/summary/',
         DashboardSummaryView.as_view(),
         name='dashboard-summary'),

    path('home/dashboard/timeseries/',
         DashboardTimeseriesView.as_view(),
         name='dashboard-timeseries'),

    path('home/dashboard/heatmap/',
         DashboardHeatmapView.as_view(),
         name='dashboard-heatmap'),
]

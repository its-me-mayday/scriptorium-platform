from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderDraftViewSet

router = DefaultRouter()
router.register(r'', OrderDraftViewSet, basename='orderdraft')

urlpatterns = [
    path('', include(router.urls)),
]

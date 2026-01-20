from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, PropertyInquiryViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'inquiries', PropertyInquiryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
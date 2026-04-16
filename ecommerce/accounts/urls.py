from django.urls import path
from .views import UserRegistrationAPIView, UserProfileAPIView, AdminUserListAPIView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='user-register'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('admin/', AdminUserListAPIView.as_view(), name='admin-user-list'),
]
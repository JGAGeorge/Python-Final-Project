from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import AdminUserListAPIView
from orders.views import AdminOrderListAPIView
from products.views import AdminProductListCreateAPIView, AdminProductRetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/admin/accounts/', AdminUserListAPIView.as_view(), name='admin-users'),    
    path('api/admin/products/', AdminProductListCreateAPIView.as_view(), name='admin-products'),
    path('api/admin/products/<int:id>/', AdminProductRetrieveUpdateDestroyAPIView.as_view(), name='admin-product-detail'),
    path('api/admin/orders/', AdminOrderListAPIView.as_view(), name='admin-orders'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts/', include('accounts.urls')),
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
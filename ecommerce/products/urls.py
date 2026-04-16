from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, AdminProductListCreateAPIView, AdminProductRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ProductListAPIView.as_view(), name='product-list'),
    path('<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('admin/', AdminProductListCreateAPIView.as_view(), name='admin-product-list-create'),
    path('admin/<int:id>/', AdminProductRetrieveUpdateDestroyAPIView.as_view(), name='admin-product-detail'),
]
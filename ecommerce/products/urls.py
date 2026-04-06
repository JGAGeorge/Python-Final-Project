from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, LatestProductsAPIView, FeaturedCategoryProductsAPIView

urlpatterns = [
    path('', ProductListAPIView.as_view(), name='product-list'),
    path('<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('latest/', LatestProductsAPIView.as_view(), name='latest-products'),
    path('categories/', FeaturedCategoryProductsAPIView.as_view(), name='featured-categories'),
]
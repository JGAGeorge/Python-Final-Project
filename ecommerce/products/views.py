from rest_framework import generics, filters, permissions
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'category']

class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

class LatestProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Product.objects.all().order_by('-created_at')[:10]
    
class FeaturedCategoryProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        categories = Product.objects.values_list('category', flat=True).distinct()
        data = [{'category': cat} for cat in categories]
        return Response(data)
    
class AdminProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'id'
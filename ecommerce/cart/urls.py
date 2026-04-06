from django.urls import path
from .views import CartItemListCreateAPIView, CartItemUpdateDestroyAPIView

urlpatterns = [
    path('', CartItemListCreateAPIView.as_view(), name='cart-list-create'),
    path('<int:pk>/', CartItemUpdateDestroyAPIView.as_view(), name='cart-update-destroy'),
]
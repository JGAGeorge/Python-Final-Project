from django.urls import path
from .views import OrderListCreateAPIView, OrderRetrieveAPIView, OrderMarkDeliveredAPIView

urlpatterns = [
    path('', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('<int:pk>/', OrderRetrieveAPIView.as_view(), name='order-detail'),
    path('<int:pk>/deliver/', OrderMarkDeliveredAPIView.as_view(), name='order-deliver'),
]
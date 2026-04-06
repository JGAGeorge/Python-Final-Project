from rest_framework import generics, permissions
from .models import CartItem
from .serializers import CartItemSerializer

class CartItemListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        cart_item, created = CartItem.objects.get_or_create(user=self.request.user, product=product)
        if not created:
            cart_item.quantity += serializer.validated_data.get('quantity', 1)
            cart_item.save()
        else:
            serializer.save(user=self.request.user)

class CartItemUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
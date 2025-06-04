from django.shortcuts import render

from rest_framework.generics import ListAPIView
from .models import Producto
from .serializers import ProductoSerializer

class ProductoListAPIView(ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get_serializer_context(self):
        # Agrega el request al contexto para que el serializer pueda armar URLs absolutas
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


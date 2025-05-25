from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import Producto
from .serializers import ProductoSerializer
# Create your views here.


class ProductoListView(ListAPIView):
    """
    Vista para listar todos los productos.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

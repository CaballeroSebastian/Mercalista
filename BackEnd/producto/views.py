from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import Producto, Vendedorproducto
from .serializers import ProductoSerializer
# Create your views here.


class ProductoListView(ListAPIView):
    """
    Vista para listar todos los productos.
    """
    productos = Vendedorproducto.objects.filter(idvendedor = 1).values()
    queryset = Producto.objects.filter()
    serializer_class = ProductoSerializer

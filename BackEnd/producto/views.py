from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .models import Producto
from .serializers import ProductoSerializer
# Create your views here.


class ProductoListView(ListAPIView):
    serializer_class = ProductoSerializer

    def get(self, request, id_usuario):
        productos = Producto.objects.filter(usuario__id=id_usuario)
        serializer = self.serializer_class(productos, many=True)
        return Response(serializer.data)
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import Vendedorproducto, Producto, Vendedor
from .serializers import ProductoSerializer

import json

class ProductosEnVenta(APIView):

    def obtener_ids_productos(self, id_vendedor):

        permission_classes = [AllowAny]

        queryset = Producto.objects.all() #neceario para poder activar el permiso

        """
        Función auxiliar para obtener los IDs de productos asociados a un vendedor.
        """
        productos = Vendedorproducto.objects.filter(idvendedor = id_vendedor).values()
        productos_ids = []
        for i in productos:
            productos_ids.append(i['idproducto_id'])
        return productos_ids

    def get(self, request, id):
        productos_ids = self.obtener_ids_productos(id)

        # Obtener todos los productos completos de esos IDs
        productos_completo = Producto.objects.filter(idproducto__in=productos_ids)

        # Serializar
        serializer = ProductoSerializer(productos_completo, many=True)
        return Response(serializer.data)


class crearProducto(APIView):
    """
    Clase para crear un producto.
    """
    def post(self, request, id):
        serializer = ProductoSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                vendedor = Vendedor.objects.get(pk=id)
            except Vendedor.DoesNotExist:
                return Response({'error': 'Vendedor no encontrado'}, status=404)

            producto = serializer.save()
            
            Vendedorproducto.objects.create(
                idvendedor=vendedor,
                idproducto=Producto.objects.get(pk = producto.idproducto)
            )

            return Response(
                {
                    'id': producto.idproducto,
                    'mensaje': 'Producto creado correctamente'
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            

#hola
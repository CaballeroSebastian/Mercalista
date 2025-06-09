# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Vendedorproducto, Producto, Vendedor, Carrito, Pedido, Comprador
from .serializers import ProductoSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os

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
       


        #id de los productos de determiando vendedor
        productos_ids = self.obtener_ids_productos(id)

        # Obtener todos los productos completos de esos IDs
        productos_completo = Producto.objects.filter(idproducto__in=productos_ids)

        # Serializar
        serializer = ProductoSerializer(productos_completo, many=True)
        return Response(serializer.data)


class crearProducto(APIView):
    def post(self, request, id):
        print("Archivos recibidos:", request.FILES)
        print("Datos recibidos:", request.data)
        
        foto = request.FILES.get("fotos")
        print("Archivo foto:", foto.name)

        if not foto:
            return Response({'error': 'No se proporcionó una imagen'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            #carpeta_usuario = os.path.join('productos', str(id))
            #ruta_relativa = os.path.join(carpeta_usuario, foto.name)
            ruta_relativa = f'productos/{id}/{foto.name}'
            # Guardar la imagen
            ruta_guardada = default_storage.save(ruta_relativa, ContentFile(foto.read()))
            print("Ruta guardada:", ruta_guardada)
            # Crear un diccionario con los datos del formulario
            datos = {
                'nombre': request.data.get('nombre'),
                'categoriaproducto': request.data.get('categoriaproducto'),
                'cantidadstock': int(request.data.get('cantidadstock')),
                'unidadmedida': request.data.get('unidadmedida'),
                'descripcion': request.data.get('descripcion'),
                'estado': request.data.get('estado'),
                'precio': float(request.data.get('precio')),
                'fotos': ruta_guardada
            }
            print("Datos para serializar:", datos)

            serializer = ProductoSerializer(data=datos)
            if serializer.is_valid():
                try:
                    vendedor = Vendedor.objects.get(pk=id)
                except Vendedor.DoesNotExist:
                    return Response({'error': 'Vendedor no encontrado'}, status=404)

                producto = serializer.save()
                

                Vendedorproducto.objects.create(
                    idvendedor=vendedor,
                    idproducto=producto
                )

                return Response({
                    'id': producto.idproducto,
                    'mensaje': 'Producto creado correctamente',
                }, status=status.HTTP_201_CREATED)
            else:
                print("Errores de validación:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error al procesar el archivo:", str(e))
            return Response({'error': f'Error al procesar el archivo: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminarProducto(request, pk):
    try:
        print(f"Intentando eliminar producto con ID: {pk}")

        # Eliminar registros en Carrito que referencian al producto
        Carrito.objects.filter(idproducto=pk).delete()

        # Eliminar registros en VendedorProducto que referencian al producto
        Vendedorproducto.objects.filter(idproducto=pk).delete()

        # Ahora sí es seguro eliminar el producto
        producto = Producto.objects.get(pk=pk)
        producto.delete()

        print(f"Producto con ID {pk} eliminado exitosamente")
        return Response({'mensaje': 'Producto eliminado'}, status=status.HTTP_204_NO_CONTENT)
    
    except Producto.DoesNotExist:
        print(f"Producto con ID {pk} no encontrado")
        return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

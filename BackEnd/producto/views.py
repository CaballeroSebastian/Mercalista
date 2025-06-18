# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from .models import Vendedorproducto, Producto, Vendedor, Carrito, Pedido, Comprador, Usuario
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

        #obtener el id del vendedor mediante el id del usuario
        instanciaVendedor = Vendedor.objects.get(idusuario = id)
        idVendedor = instanciaVendedor.idvendedor

        #id de los productos de determiando vendedor
        productos_ids = self.obtener_ids_productos(idVendedor)

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
                    vendedor = Vendedor.objects.get(idusuario = id)
                except Vendedor.DoesNotExist:
                    # return Response({'error': 'Vendedor no encontrado'}, status=404)
                    usuario = Usuario.objects.get(pk = id)
                    vendedor = Vendedor.objects.create(idusuario = usuario)

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
    



class updateProduct(APIView):

    def updateImg(self, request, Usuario):
        foto = request.FILES.get('fotos')
        if not foto:
            return None
        print(foto.name)
        ruta_relativa = f'productos/{Usuario}/{foto.name}'
        default_storage.save(ruta_relativa, ContentFile(foto.read()))
        return ruta_relativa

    def patch(self, request, Usuario):
        idProduct = request.data.get('idProducto')
        if not idProduct:
            return Response({'error': 'ID de producto no proporcionado'}, status=400)

        try:
            producto = Producto.objects.get(idproducto=idProduct)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error obteniendo producto: {e}")
            return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            ruta = self.updateImg(request, Usuario)

            info = request.data
            producto.nombre = info.get('nombre', producto.nombre)
            producto.categoriaproducto = info.get('categoriaproducto', producto.categoriaproducto)
            producto.cantidadstock = int(info.get('cantidadstock', producto.cantidadstock))
            producto.unidadmedida = info.get('unidadmedida', producto.unidadmedida)
            producto.descripcion = info.get('descripcion', producto.descripcion)
            producto.estado = info.get('estado', producto.estado)
            producto.precio = float(info.get('precio', producto.precio))

            if ruta:
                producto.fotos = ruta

            producto.save()

            return Response({'message': 'Producto actualizado correctamente'})

        except Exception as e:
            print(f"Error actualizando producto: {e}")
            return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)


        

class ProductosVendidosView(APIView):
    def get(self, request, id_usuario):
        try:
            vendedor = Vendedor.objects.get(idusuario=id_usuario)
        except Vendedor.DoesNotExist:
            return Response({"error": "Vendedor no encontrado"}, status=404)

        pedidos = Pedido.objects.filter(idvendedor=vendedor).select_related("idcomprador__idusuario")
        carritos = Carrito.objects.filter(idpedido__in=pedidos).select_related("idproducto", "idpedido__idcomprador__idusuario")

        ventas = []

        for item in carritos:
            producto = item.idproducto
            pedido = item.idpedido
            comprador = pedido.idcomprador.idusuario

            ventas.append({
                "id": item.idcarrito,
                "comprador": f"{comprador.nombre} {comprador.apellido}",
                "producto": producto.nombre,
                "fecha": pedido.fechapedido.strftime("%Y-%m-%d"),
                "direccion": pedido.direccion,
                "cantidad": str(item.cantidadproductos),
                "total": str(item.preciototal),
                "pedidoId": str(pedido.idpedido),
                "telefono": comprador.telefono,
                "email": comprador.correo,
                "precioUnidad": str(producto.precio),
                "estado": producto.estado,
                "imagen": producto.fotos,
            })

        return Response(ventas)


class ComprasUsuarioView(APIView):
    def get(self, request, id):
<<<<<<< HEAD
        print(f"ComprasUsuarioView: Buscando compras para usuario ID: {id}")
        
        try:
            # Buscar el comprador a partir del ID de usuario
            comprador = Comprador.objects.get(idusuario = id)
            print(f"Comprador encontrado: {comprador.idcomprador}")
        except Comprador.DoesNotExist:
            print(f"Comprador no encontrado para usuario ID: {id}")
            return Response({"error": "Comprador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Filtrar pedidos hechos por ese comprador
        pedidos = Pedido.objects.filter(idcomprador=comprador)
        print(f"Pedidos encontrados: {pedidos.count()}")
=======
        # Buscar el comprador a partir del ID de usuario
        comprador = Comprador.objects.get(idusuario = id)

        # Filtrar pedidos hechos por ese comprador
        pedidos = Pedido.objects.filter(idcomprador=comprador)
>>>>>>> 5c47dc5 (se prepara rama para subirla al remoto)

        resultado = []

        for pedido in pedidos:
<<<<<<< HEAD
            print(f"Procesando pedido ID: {pedido.idpedido}")
            carritos = Carrito.objects.filter(idpedido=pedido)
            print(f"Carritos en este pedido: {carritos.count()}")
=======
            carritos = Carrito.objects.filter(idpedido=pedido)
>>>>>>> 5c47dc5 (se prepara rama para subirla al remoto)

            for carrito in carritos:
                producto = carrito.idproducto
                vendedor = pedido.idvendedor
                usuario_vendedor = vendedor.idusuario

                resultado.append({
                    "id": carrito.idcarrito,  # <-- Factura
                    "fecha": pedido.fechapedido,
                    "producto": producto.nombre,
                    "image": producto.fotos,
                    "total": float(carrito.preciototal),
                    "cantidad": f"{carrito.cantidadproductos}",
                    "precioUnidad": f"${producto.precio:,.0f}",
                    "estado": producto.estado or "N/A",
                    "unidadMedida": producto.unidadmedida,
                    "ciudad": usuario_vendedor.ciudad,
                    "telefono": usuario_vendedor.telefono,
                    "correo": usuario_vendedor.correo,
                    "vendedor": usuario_vendedor.nombre
                })

<<<<<<< HEAD
        print(f"Resultado final: {len(resultado)} compras encontradas")
=======
>>>>>>> 5c47dc5 (se prepara rama para subirla al remoto)
        return Response(resultado, status=status.HTTP_200_OK)

    
#comprador = Comprador.objects.get(idusuario = id)
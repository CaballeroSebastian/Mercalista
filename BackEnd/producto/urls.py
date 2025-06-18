#from . import views
from django.urls import path, include
from .views import ProductosEnVenta, crearProducto, eliminarProducto, updateProduct, ProductosVendidosView, ComprasUsuarioView

urlpatterns = [
    path("verProductos/<int:id>", ProductosEnVenta.as_view(), name='producto-list'),
    path("crearProducto/<int:id>", crearProducto.as_view(), name='crear-producto'),
    path('eliminarProducto/<int:pk>', eliminarProducto),
    path('actualizarProducto/<int:Usuario>', updateProduct.as_view(), name= 'actualizar-producto'),
    path('misVentas/<int:id_usuario>', ProductosVendidosView.as_view(), name= 'mis-ventas'),
    path('verCompras/<int:id>', ComprasUsuarioView.as_view(), name= 'mis-compras' ),
]
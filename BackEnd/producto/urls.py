#from . import views
from django.urls import path, include
from .views import ProductosEnVenta, crearProducto

urlpatterns = [
    path("verProductos/<int:id>", ProductosEnVenta.as_view(), name='producto-list'),
    path("crearProducto/<int:id>", crearProducto.as_view(), name='crear-producto'),
]
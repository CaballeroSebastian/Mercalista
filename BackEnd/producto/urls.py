#from . import views
from django.urls import path, include
from .views import ProductosEnVenta

urlpatterns = [
    path("verProductos/<int:id>", ProductosEnVenta.as_view(), name='producto-list'),
]
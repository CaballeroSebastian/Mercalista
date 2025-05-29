#from . import views
from django.urls import path, include
from .views import ProductoListView

urlpatterns = [
    path("verProductos/<int:id>/", ProductoListView.as_view(), name='producto-list'),
]
#from . import views
from django.urls import path, include
from .views import CrearUsuario

urlpatterns = [
    path("crearUsuario/", CrearUsuario.as_view(), name='crear-usuario'),
]
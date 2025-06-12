#from . import views
from django.urls import path, include
from .views import CrearUsuario
from .views import VerificarDatosView

urlpatterns = [
    path("crearUsuario/", CrearUsuario.as_view(), name='crear-usuario'),
    path('verificarDatos/', VerificarDatosView.as_view(), name='verificar_datos'),
]
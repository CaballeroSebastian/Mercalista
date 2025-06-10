#from . import views
from django.urls import path, include
from .views import CrearUsuario
from .views import VerificarDatosView, CrearTipoDeUsuario

urlpatterns = [
    path("crearUsuario/", CrearUsuario.as_view(), name='crear-usuario'),
    path('verificarDatos/', VerificarDatosView.as_view(), name='verificar_datos'),
    path('crear-tipo-usuario/', CrearTipoDeUsuario.as_view(), name='crear_tipo_usuario'),
]
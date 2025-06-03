from django.urls import path
from .views import VerificarPasswordView

urlpatterns = [
    path('verificar-password/', VerificarPasswordView.as_view(), name='verificar_password'),
]



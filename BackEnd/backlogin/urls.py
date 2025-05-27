

from django.urls import path
from .views import VerificarEmailView

urlpatterns = [
    path('verificar-email/', VerificarEmailView.as_view(), name='verificar_email'),
]

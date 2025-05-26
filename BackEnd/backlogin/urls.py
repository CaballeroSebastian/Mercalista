from django.urls import path
from .views import verificar_email

urlpatterns = [
    path('verificar-email/', verificar_email, name='verificar_email'),
]

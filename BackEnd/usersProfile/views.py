from django.shortcuts import render
from .models import Usuario
from rest_framework.generics import ListAPIView
from .serializers import usersProfileSerializer
# Create your views here.

class usersProfileView(ListAPIView):
    queryset = Usuario.objects.get("correo","telefono","contraseña","ciudad","cedula" )
    serializer = usersProfileSerializer


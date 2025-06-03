from django import forms
from .models import Usuario
from rest_framework import serializers


class SerializerUsuario(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['tipousuario', 'nombre', 'apellido', 'telefono', 'cedula', 'ciudad', 'departamento', 'correo', 'contraseña', 'username']

        
        
from rest_framework import serializers
from Register.models import Usuario
from django.contrib.auth.hashers import make_password

class usersProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['correo', 'telefono', 'contraseña', 'ciudad', 'cedula', 'username', 'image_profile']
        read_only_fields = ['cedula']

    def validate_contraseña(self, value):
        """Encripta la contraseña si no está ya encriptada"""
        if not value.startswith('pbkdf2_'):  # Verifica si ya está encriptada
            return make_password(value)
        return value

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'idusuario', 'tipousuario', 'nombre', 'apellido', 'telefono', 'cedula',
            'ciudad', 'correo', 'contraseña', 'departamento', 'username', 'image_profile'
        ]

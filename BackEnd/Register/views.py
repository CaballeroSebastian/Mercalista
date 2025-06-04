from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Usuario




from .serializers import  SerializerUsuario


class CrearUsuario(APIView):
    def post(self, request):
        data = SerializerUsuario(data=request.data)
        if data.is_valid():
            
            raw_password = data.validated_data['contraseña']
            hashed_password = make_password(raw_password)
            
            
            Usuario.objects.create(
                tipousuario = data.validated_data['tipousuario'],
                nombre = data.validated_data['nombre'],
                apellido = data.validated_data['apellido'],
                telefono = data.validated_data['telefono'],
                cedula = data.validated_data['cedula'],
                ciudad = data.validated_data['ciudad'],
                departamento = data.validated_data['departamento'],
                correo = data.validated_data['correo'],
                contraseña = hashed_password,
                username = data.validated_data['username'],
            )
            return Response({
                "mensaje": "Usuario creado correctamente",
                "contraseña_original": raw_password,
                "contraseña_encriptada": hashed_password
            },  status=201)
        
        else:
            return Response(data.errors, status=400)


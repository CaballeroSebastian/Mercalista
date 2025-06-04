from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Usuario


from .serializers import  SerializerUsuario

# Create your views here.

class CrearUsuario(APIView):
    def post(self, request):
        data = SerializerUsuario(data=request.data)
        if data.is_valid():
            # Aquí ya puedes acceder a validated_data
            Usuario.objects.create(
                tipousuario = data.validated_data['tipousuario'],
                nombre = data.validated_data['nombre'],
                apellido = data.validated_data['apellido'],
                telefono = data.validated_data['telefono'],
                cedula = data.validated_data['cedula'],
                ciudad = data.validated_data['ciudad'],
                departamento = data.validated_data['departamento'],
                correo = data.validated_data['correo'],
                contraseña = data.validated_data['contraseña'],
                username = data.validated_data['username'],
            )
            return Response({"mensaje": "Usuario creado correctamente"}, status=201)
        else:
            return Response(data.errors, status=400)


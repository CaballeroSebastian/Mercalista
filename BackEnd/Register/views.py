from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .models import Comprador, Vendedor




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
                #"contraseña_original": raw_password,
                #"contraseña_encriptada": hashed_password
            },  status=201)      
        else:
            return Response(data.errors, status=400)
        
class CrearTipoDeUsuario(APIView):
    def post(self, request):
        dataUsuario = SerializerUsuario(data=request.data)
        if dataUsuario.is_valid():
            Comprador.objects.create(
                idusuario=Usuario.objects.get(idusuario=dataUsuario.validated_data['username'])
            )
            
            Vendedor.objects.create(
                idusuario=Usuario.objects.get(idusuario=dataUsuario.validated_data['username'])
            )
            
            #se realiza la tabla COMPRADOR Y VENDEDOR SE CAMBIOE L GET(USERNAME POR IDUSUARIO)
class VerificarDatosView(APIView):
    def post(self, request):
        try:
            correo = request.data.get('correo')
            telefono = request.data.get('telefono')
            username = request.data.get('username')
            cedula = request.data.get('cedula')
            

            # Verificar si alguno de los datos ya existe en la base de datos
            existe_correo = Usuario.objects.filter(correo=correo).exists() if correo else False
            existe_telefono = Usuario.objects.filter(telefono=telefono).exists() if telefono else False
            existe_username = Usuario.objects.filter(username=username).exists() if username else False
            exite_cedula = Usuario.objects.filter(cedula=cedula).exists() if cedula else False
        

            return Response({
                'correo_existe': existe_correo,
                'telefono_existe': existe_telefono,
                'username_existe': existe_username,
                'cedula_existe': exite_cedula
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error en VerificarDatosView: {str(e)}")
            return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
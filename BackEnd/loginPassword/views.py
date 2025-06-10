from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Usuario


class VerificarPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            correo = request.data.get('correo')
            contraseña = request.data.get('contraseña')

            if not contraseña:
                return Response({
                    'error': 'Contraseña requerida'
                }, status=status.HTTP_400_BAD_REQUEST)

            usuario = Usuario.objects.get(correo=correo)

            # Verificación en texto plano (temporal)
            # if usuario.contraseña != contraseña:
            #     return Response({
            #         'contraseña_valida': False
            #     }, status=status.HTTP_401_UNAUTHORIZED)

            # Verificación con hash (activarla cuando ya uses make_password al guardar)
            if not check_password(contraseña, usuario.contraseña):
                return Response({
                    'contraseña_valida': False
                }, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken()
            refresh['user_id'] = usuario.idusuario
            refresh['correo'] = usuario.correo

            return Response({
                'contraseña_valida': True,
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'usuario': {
                    'idusuario': usuario.idusuario,
                    'nombre': usuario.nombre,
                    'apellido': usuario.apellido,
                    'correo': usuario.correo,
                    'tipo_usuario': usuario.tipousuario,
                    'telefono': usuario.telefono,
                    'cedula': usuario.cedula,
                    'username': usuario.username,
                    'ciudad': usuario.ciudad,

                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({
                'error': 'Error del servidor'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

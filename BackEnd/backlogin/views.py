from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Usuario

class VerificarEmailView(APIView):
    permission_classes = [AllowAny]  # Permite acceso sin autenticación
    
    def post(self, request):
        try:
            correo = request.data.get('correo')
            
            if not correo:
                return Response({'error': 'Correo no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

            # Verificar si el correo existe en la base de datos
            existe = Usuario.objects.filter(correo=correo).exists()
            
            return Response({'correo_valido': existe}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error en VerificarEmailView: {str(e)}")
            return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
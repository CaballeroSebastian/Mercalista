
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario

class VerificarEmailView(APIView):
    def post(self, request):
        correo = request.data.get('correo')

        if not correo:
            return Response({'error': 'Correo no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el correo existe en la base de datos
        existe = Usuario.objects.filter(correo=correo).exists()

        return Response({'correo_valido': existe}, status=status.HTTP_200_OK)

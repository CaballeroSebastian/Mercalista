from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from Register.models import Usuario
from .serializers import usersProfileSerializer, UsuarioSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Lista de todos los usuarios (GET)
class UsersProfileView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer

# Obtener o editar perfil por cédula (GET, PUT)
class UserProfileByCedulaView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer
    lookup_field = 'cedula'

class ProfileImageUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, cedula):
        imagen = request.FILES.get('image_profile')

        # DEBUG: imprime usuario y token
        print("Usuario autenticado:", request.user)
        print("Token:", request.auth)

        if not imagen:
            return Response({'error': 'No se envió ninguna imagen'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Busca el usuario por cédula Y vinculado al username autenticado
            usuario = Usuario.objects.get(cedula=cedula, username=request.user.username)
        except Usuario.DoesNotExist:
            return Response({'detail': 'User not found', 'code': 'user_not_found'}, status=status.HTTP_404_NOT_FOUND)

        ruta_relativa = f'imageProfile/{cedula}/{imagen.name}'
        ruta_guardada = default_storage.save(ruta_relativa, ContentFile(imagen.read()))

        usuario.image_profile = ruta_guardada
        usuario.save()

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)


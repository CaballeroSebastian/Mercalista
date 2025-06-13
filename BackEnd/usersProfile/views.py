from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from Register.models import Usuario
from .serializers import usersProfileSerializer, UsuarioSerializer

# Lista de todos los usuarios (GET)
class UsersProfileView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer

# Obtener o editar perfil por cédula (GET, PUT)
class UserProfileByCedulaView(RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer
    lookup_field = 'cedula'

    def update(self, request, *args, **kwargs):
        """Sobreescribimos el método para permitir actualizaciones parciales (solo un campo)"""
        partial = True  # <- esto permite que se manden solo los campos que quieras
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
class ProfileImageUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, cedula):
        try:
            usuario = Usuario.objects.get(cedula=cedula)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        image = request.FILES.get('image_profile')
        if not image:
            return Response({'error': 'No se envió imagen'}, status=status.HTTP_400_BAD_REQUEST)

        usuario.image_profile = image
        usuario.save()
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)

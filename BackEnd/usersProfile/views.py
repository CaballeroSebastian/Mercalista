from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from .models import Usuario
from .serializers import usersProfileSerializer

# Lista de todos los usuarios (GET)
class UsersProfileView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer

# Obtener o editar perfil por cédula (GET, PUT)
class UserProfileByCedulaView(RetrieveUpdateAPIView):  # <- actualizado aquí
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer
    lookup_field = 'cedula'

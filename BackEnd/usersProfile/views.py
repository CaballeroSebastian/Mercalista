from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Usuario
from .serializers import usersProfileSerializer

class UsersProfileView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer

class UserProfileByCedulaView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usersProfileSerializer
    lookup_field = 'cedula'

from rest_framework import serializers
from .models import Usario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usario
        fields = '__all__'  # o puedes poner los campos uno por uno si lo prefieres


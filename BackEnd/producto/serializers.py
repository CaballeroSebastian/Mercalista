from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        extra_kwargs = {
            'fotos': {'required': True}
        }

    def validate_fotos(self, value):
        if not value or not isinstance(value, str):
            raise serializers.ValidationError("La imagen es requerida y debe ser una ruta válida")
        return value

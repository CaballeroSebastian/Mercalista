from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    fotos = serializers.SerializerMethodField() 

    class Meta:
        model = Producto
        fields = ['idproducto', 'nombre', 'categoriaproducto', 'cantidadstock', 'precio', 'descripcion', 'estado', 'fotos', 'unidadmedida']

    def get_fotos(self, obj):
        request = self.context.get('request')
        if obj.fotos and request:
            return request.build_absolute_uri(obj.fotos.url)
        return None

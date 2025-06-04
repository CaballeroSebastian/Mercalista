from django.db import models

class Producto(models.Model):
    idproducto = models.AutoField(db_column='idProducto', primary_key=True)
    nombre = models.CharField(max_length=100)
    categoriaproducto = models.CharField(db_column='categoriaProducto', max_length=50)
    cantidadstock = models.IntegerField(db_column='cantidadStock')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.CharField(max_length=200)
    estado = models.CharField(max_length=8, blank=True, null=True)
    fotos = models.ImageField(upload_to='productos/', blank=True, null=True)  
    unidadmedida = models.CharField(db_column='unidadMedida', max_length=10)

    class Meta:
        managed = True  
        db_table = 'producto'

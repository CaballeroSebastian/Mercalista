from django.db import models

# Create your models here.
class Producto(models.Model):
    idproducto = models.AutoField(db_column='idProducto', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(max_length=100)
    categoriaproducto = models.CharField(db_column='categoriaProducto', max_length=50)  # Field name made lowercase.
    cantidadstock = models.IntegerField(db_column='cantidadStock')  # Field name made lowercase.
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.CharField(max_length=200)
    estado = models.CharField(max_length=8, blank=True, null=True)
    fotos = models.CharField(max_length=1)
    unidadmedida = models.CharField(db_column='unidadMedida', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'producto'
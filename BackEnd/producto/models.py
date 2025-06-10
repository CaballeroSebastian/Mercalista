from django.db import models
from Register.models import Usuario

# Create your models here.
class Producto(models.Model):
    idproducto = models.AutoField(db_column='idProducto', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(max_length=100)
    categoriaproducto = models.CharField(db_column='categoriaProducto', max_length=50)  # Field name made lowercase.
    cantidadstock = models.IntegerField(db_column='cantidadStock')  # Field name made lowercase.
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.CharField(max_length=200)
    estado = models.CharField(max_length=8, blank=True, null=True)
    fotos = models.CharField(max_length=255)
    unidadmedida = models.CharField(db_column='unidadMedida', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'producto'

class Vendedorproducto(models.Model):
    idvendedorproducto = models.AutoField(db_column='idVendedorProducto', primary_key=True)  # Field name made lowercase.
    idvendedor = models.ForeignKey('Vendedor', models.DO_NOTHING, db_column='idVendedor')  # Field name made lowercase.
    idproducto = models.ForeignKey('Producto', models.DO_NOTHING, db_column='idProducto')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vendedorProducto'

class Vendedor(models.Model):
    idvendedor = models.AutoField(db_column='idVendedor', primary_key=True)  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vendedor'

class Comprador(models.Model):
    idcomprador = models.AutoField(db_column='idComprador', primary_key=True)  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'comprador'

class Usuario(models.Model):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)  # Field name made lowercase.
    tipousuario = models.CharField(db_column='tipoUsuario', max_length=9)  # Field name made lowercase.
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=10)
    cedula = models.CharField(max_length=10)
    ciudad = models.CharField(max_length=10)
    correo = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'usuario'

class Carrito(models.Model):
    idcarrito = models.AutoField(db_column='idCarrito', primary_key=True)  # Field name made lowercase.
    cantidadproductos = models.IntegerField(db_column='cantidadProductos')  # Field name made lowercase.
    preciototal = models.DecimalField(db_column='precioTotal', max_digits=10, decimal_places=2)  # Field name made lowercase.
    idproducto = models.ForeignKey('Producto', models.DO_NOTHING, db_column='idProducto')  # Field name made lowercase.
    idpedido = models.ForeignKey('Pedido', models.DO_NOTHING, db_column='idPedido')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'carrito'

class Pedido(models.Model):
    idpedido = models.AutoField(db_column='idPedido', primary_key=True)  # Field name made lowercase.
    direccion = models.CharField(max_length=50)
    fechapedido = models.DateTimeField(db_column='fechaPedido')  # Field name made lowercase.
    idcomprador = models.ForeignKey('Comprador', models.DO_NOTHING, db_column='idComprador')  # Field name made lowercase.
    idvendedor = models.ForeignKey('Vendedor', models.DO_NOTHING, db_column='idVendedor')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'pedido'
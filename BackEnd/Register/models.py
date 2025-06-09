from django.db import models

#USUARIOS
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
    username = models.CharField(db_column='userName', unique=True, max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usuario'
        
        
#COMPRADORES Y VENDEDORES  
class Comprador(models.Model):
    idcomprador = models.AutoField(db_column='idComprador', primary_key=True)  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'comprador'
        
        
class Vendedor(models.Model):
    idvendedor = models.AutoField(db_column='idVendedor', primary_key=True)  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vendedor'
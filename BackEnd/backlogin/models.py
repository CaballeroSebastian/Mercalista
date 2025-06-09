from django.db import models

# Create your models here.

class Usuario(models.Model):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)  # Field name made lowercase.
    tipousuario = models.CharField(db_column='tipoUsuario', max_length=9)  # Field name made lowercase.
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=10, unique= True)
    cedula = models.CharField(max_length=10, unique= True)
    ciudad = models.CharField(max_length=10)
    correo = models.CharField(max_length=100, unique= True)
    contraseña = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)

    class Meta:
        managed = False
        db_table = 'usuario'
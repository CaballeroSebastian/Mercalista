from django.db import models
class Usuario(models.Model):
    image_profile = models.ImageField(upload_to='imageProfile/', null=True, blank=True)

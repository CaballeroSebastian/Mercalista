from django.db import models
class Usuario(models.Model):
    image_profile = models.CharField(max_length= 255, null=True, blank=True)

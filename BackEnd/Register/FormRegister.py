from django import forms
from models import Usuario

class FormRegister(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['idusuario',
                'tipousuario',
                'nombre',
                'apellido',
                'telefono',
                'cedula',
                'ciudad',
                'correo',
                'contraseña',
                'departamento'
        ]
        
        
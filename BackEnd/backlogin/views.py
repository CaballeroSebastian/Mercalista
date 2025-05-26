from django.shortcuts import render
from django.http import JsonResponse
from .models import Usuario
import json

def verificar_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        if Usuario.objects.filter(email=email).exists():
            return JsonResponse({'email_valido': True})
        else:
            return JsonResponse({'email_valido': False}, status=404)
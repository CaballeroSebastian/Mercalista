#from . import views
from django.urls import path
from .views import usersProfileView

urlpatterns = [
    path(":int<cedula>", usersProfileView.as_view(), name='profile-users'),
]
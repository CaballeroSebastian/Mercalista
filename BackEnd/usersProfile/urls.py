from django.urls import path
from .views import UsersProfileView, UserProfileByCedulaView #ProfileImageUpdateView

urlpatterns = [
    path('', UsersProfileView.as_view()),
    path('<str:cedula>/', UserProfileByCedulaView.as_view()),
    #path('update-image/<str:cedula>/', ProfileImageUpdateView.as_view()),
]


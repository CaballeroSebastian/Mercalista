from django.urls import path
from .views import UsersProfileView, UserProfileByCedulaView

urlpatterns = [
    path('', UsersProfileView.as_view()),
    path('<str:cedula>/', UserProfileByCedulaView.as_view()),
]

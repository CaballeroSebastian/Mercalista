from django.urls import path
from .views import UsersProfileView, UserProfileByCedulaView

urlpatterns = [
    path('', UsersProfileView.as_view()),  # /profile/
    path('<str:cedula>/', UserProfileByCedulaView.as_view()),  # /profile/<cedula>/
]
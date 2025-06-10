from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import UsersProfileView, UserProfileByCedulaView, ProfileImageUpdateView

urlpatterns = [
    path('', UsersProfileView.as_view()),  # /profile/
    path('<str:cedula>/', UserProfileByCedulaView.as_view()),  # /profile/<cedula>/
    path('update-image/<str:cedula>/', ProfileImageUpdateView.as_view(), name='update-image'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    
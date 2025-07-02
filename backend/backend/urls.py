from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserDetailView, UserListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/user/details/", UserDetailView.as_view(), name="user-detail"),
    path("api/user/list/", UserListView.as_view(), name="user-list"),
    path("api-auth/", include("rest_framework.urls")),
]

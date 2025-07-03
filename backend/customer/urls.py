from django.urls import path
from .views import CustomerCreateView, CustomerToggleView, CustomerListView, CustomerDetailView, CustomerUpdateView

urlpatterns = [
    path("create/", CustomerCreateView.as_view(), name="customer-create"),
    path("detail/<int:pk>/", CustomerDetailView.as_view(), name="customer-detail"),
    path("update/<int:pk>/", CustomerUpdateView.as_view(), name="customer-update"),
    path("toggle/<int:pk>/", CustomerToggleView.as_view(), name="customer-deactivate"),
    path("list/", CustomerListView.as_view(), name="customer-list")
]
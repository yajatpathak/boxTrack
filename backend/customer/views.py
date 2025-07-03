from django.db.models import Q
from django.utils.dateparse import parse_date
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from .serializers import CustomerSerializer
from.models import Customer

class CustomerCreateView(generics.CreateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class CustomerDetailView(generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class CustomerUpdateView(generics.UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()

class CustomerToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try: 
            customer = Customer.objects.get(pk=pk)
            customer.is_active = not customer.is_active
            customer.save()
            return Response({"message": "Customer was toggled", "is_active": customer.is_active})
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)
        
class CustomerListView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        request: Request = self.request
        queryset = Customer.objects.all().order_by("-created_at")

        is_active = request.query_params.get("is_active")
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == "true")

        search = request.query_params.get("search")
        if search:
            queryset = queryset.filter(Q(first_name__icontains=search)| Q(last_name__icontains=search) | Q(email__icontains=search))

        created_by = request.query_params.get("created_by")
        if created_by is not None:
            queryset = queryset.filter(created_by__id=created_by)

        created_from = request.query_params.get("created_from")
        created_to = request.query_params.get("created_to")
        if created_from:
            parsed_from = parse_date(created_from)
            if parsed_from:
                queryset = queryset.filter(created_at__date__gte=parsed_from)
        if created_to:
            parsed_to = parse_date(created_to)
            if parsed_to:
                queryset = queryset.filter(created_at__date__lte=parsed_to)
        
        return queryset

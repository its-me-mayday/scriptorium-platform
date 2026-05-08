from rest_framework import viewsets
from .models import OrderDraft
from .serializers import OrderDraftSerializer

class OrderDraftViewSet(viewsets.ModelViewSet):
    queryset = OrderDraft.objects.all()
    serializer_class = OrderDraftSerializer

from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/customers/', include('customers.urls')),
    path('api/products/', include('products.urls')),
    path('api/inbox/', include('inbox.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/drafts/', include('drafts.urls')),
]

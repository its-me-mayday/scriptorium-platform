from django.db import models

class Product(models.Model):
    sku = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    unit = models.CharField(max_length=50, default='unita')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProductAlias(models.Model):
    product = models.ForeignKey(Product, related_name='aliases', on_delete=models.CASCADE)
    alias = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Product Aliases"

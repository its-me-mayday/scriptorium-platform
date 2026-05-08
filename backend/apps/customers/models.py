from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=255)
    vat_number = models.CharField(max_length=50, blank=True, null=True)
    fiscal_code = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Address(models.Model):
    customer = models.ForeignKey(Customer, related_name='addresses', on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Italy')
    is_default = models.BooleanField(default=False)

class Contact(models.Model):
    customer = models.ForeignKey(Customer, related_name='contacts', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)

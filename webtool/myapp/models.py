

# Create your models here.
from django.db import models

class Userinfo(models.Model):
    Username = models.CharField(max_length=10, null=False)
    Ac = models.CharField(max_length=10, null=False)
    Pa = models.CharField(max_length=20, null=False)
    cEmail = models.EmailField(max_length=100, blank=True, default='')



    def __str__(self):
        return self.NAME
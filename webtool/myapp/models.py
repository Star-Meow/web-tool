

# Create your models here.

from django.db import models

class TEST(models.Model):
    ID = models.IntegerField(primary_key=True,)
    NAME = models.CharField(max_length=255,)

    class Meta:						# 如果讀取已有資料的必要引數！
        db_table = "Test_Table"

    def __str__(self):
        return self.NAME
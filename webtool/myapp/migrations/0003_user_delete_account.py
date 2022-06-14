# Generated by Django 4.0.5 on 2022-06-14 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_account_delete_test'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Ac', models.CharField(max_length=10)),
                ('Pa', models.CharField(max_length=20)),
                ('cEmail', models.EmailField(blank=True, default='', max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='Account',
        ),
    ]

# Generated by Django 4.0.5 on 2022-06-14 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_user_delete_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Userinfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Username', models.CharField(max_length=10)),
                ('Ac', models.CharField(max_length=10)),
                ('Pa', models.CharField(max_length=20)),
                ('cEmail', models.EmailField(blank=True, default='', max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]

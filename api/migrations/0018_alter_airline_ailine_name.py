# Generated by Django 4.0.1 on 2023-07-15 02:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_airline_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airline',
            name='ailine_name',
            field=models.CharField(max_length=50),
        ),
    ]

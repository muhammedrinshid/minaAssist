# Generated by Django 4.0.1 on 2023-07-15 02:19

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_airport_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airline',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]

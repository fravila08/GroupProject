# Generated by Django 4.1 on 2022-08-20 14:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back_app', '0005_alter_appliedjobs_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appliedjobs',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 20, 14, 2, 48, 121606)),
        ),
        migrations.AlterField(
            model_name='forum',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 20, 14, 2, 48, 122012)),
        ),
        migrations.AlterField(
            model_name='interview',
            name='interview_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 20, 14, 2, 48, 121845)),
        ),
    ]
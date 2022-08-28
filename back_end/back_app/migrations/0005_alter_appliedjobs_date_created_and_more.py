# Generated by Django 4.0.5 on 2022-08-28 19:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back_app', '0004_posts_first_name_posts_last_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appliedjobs',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 28, 14, 56, 44, 608964)),
        ),
        migrations.AlterField(
            model_name='comments_to_post',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 28, 14, 56, 44, 611194)),
        ),
        migrations.AlterField(
            model_name='interview',
            name='interview_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 28, 14, 56, 44, 609764)),
        ),
        migrations.AlterField(
            model_name='posts',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 28, 14, 56, 44, 610478)),
        ),
        migrations.AlterField(
            model_name='replies_to_comment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 28, 14, 56, 44, 611749)),
        ),
    ]
# Generated by Django 4.1 on 2022-08-19 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='job_title',
            field=models.CharField(default='unknown', max_length=250),
        ),
        migrations.AddField(
            model_name='appuser',
            name='profile_picture',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='appuser',
            name='residing_state',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='last_name',
            field=models.CharField(default='unknown', max_length=250),
        ),
    ]

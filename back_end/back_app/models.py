from operator import mod
from xml.etree.ElementTree import Comment
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.http import HttpResponse
from datetime import datetime


class AppUser(AbstractUser):
    first_name = models.CharField(max_length=50, null=False, default='unkown')
    last_name = models.CharField(max_length=50, null=False, default='unknown')
    job_title = models.CharField(max_length=100, null=False, default='unknown')
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    profile_picture = models.CharField(
        max_length=250, default='https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg')
    residing_state = models.CharField(max_length=250, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    # line above means both email and password would be required


class AppliedJobs(models.Model):
    completed = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now())
    date_completed = models.DateField(null=True)
    deadline = models.DateField(null=True)
    color = models.CharField(max_length=250, null=True)
    salary = models.CharField(max_length=250, null=True)
    location = models.CharField(max_length=250, null=True)
    company_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=150)
    description = models.TextField()
    company_link = models.CharField(max_length=255)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)


class Interview(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    interview_date = models.DateTimeField(default=datetime.now())
    completed = models.BooleanField(default=False)
    company_name = models.CharField(max_length=100)

    def __str__(self):
        return f"Interviewing company: {self.company_name} for {self.user}"


class Posts(models.Model):
    title = models.CharField(max_length=150, default="New Forum")
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=datetime.now())
    company_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"Comment: {self.title} for {self.user}"


class Comments_To_Post(models.Model):
    title = models.CharField(max_length=150, default="New Forum")
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=datetime.now())
    description = models.TextField()
    forum= models.ForeignKey(Posts, on_delete=models.CASCADE)
    
class Replies_To_Comment(models.Model):
    comment = models.ForeignKey(Comments_To_Post, on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=datetime.now())
    description = models.TextField()

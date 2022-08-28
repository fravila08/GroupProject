from logging import exception
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core import serializers
from dotenv import load_dotenv
from .models import *
import json
import requests
import os


# Create your views here.


def send_the_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)


# This will create a signup route NOTE: this doesnt render anything instead it's specifically
# dedicated to altering the datbase by creating new users that can sign in or out


@api_view(['POST'])
def sign_up(request):
    user = AppUser.objects.create_user(
        first_name=request.data['firstName'],
        last_name=request.data['lastName'],
        job_title=request.data['jobTitle'],
        username=request.data['email'],
        password=request.data['password'],
        email=request.data['email'])
    print(user)
    return Response({"message": "success"})
  #  except:
  #      return Response({"message": "Failed to sign up user"})


@api_view(['POST'])
def log_in(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
            except Exception as e:
                print(str(e))
            return HttpResponse('Youre logged in')
        else:
            return HttpResponse('Not Active')
    else:
        return HttpResponse('No user recognized')


@api_view(['POST'])
def log_out(request):
    print('here')
    logout(request)
    return HttpResponse('Logged Out')


@api_view(['GET'])
def curr_user(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=[
                                     'first_name', 'email', 'password'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user': None})


@api_view(['GET'])
def profile_page(request):
    current_user = AppUser.objects.filter(id=request.user.id).values()
    return Response(current_user[0])


@api_view(['GET', 'POST'])
def jobs_applied_for(request):
    if request.method == "GET":
        current = AppliedJobs.objects.filter(user=request.user.id).values()
        return Response(list(current))
    if request.method == 'POST':
        try:
            user = request.user
            company_link = request.data['link']
            job_description = request.data['description']
            company_name = request.data['company_name']
            job_title = request.data['job_title']
            new_job = AppliedJobs.objects.create(
                user=user, company_link=company_link, description=job_description, company_name=company_name, job_title=job_title)
            new_job.save()
            if request.data['deadline']:
                deadline = request.data['deadline']
                new_job(deadline=deadline)
                new_job.save()
            if request.data['date_completed']:
                date_comp = request.data['date_completed']
                new_job(date_completed=date_comp)
                new_job.save()
            if request.data['completed']:
                completed = request.data['completed']
                new_job(completed=completed)
                new_job.save()
            if request.data['salry']:
                salary = request.data['salry']
                new_job(salary=salary)
                new_job.save()
            if request.data['color']:
                color = request.data['color']
                new_job(color=color)
                new_job.save()
            if request.data['location']:
                location = request.data['location']
                new_job(location=location)
                new_job.save()
            return Response({"message": "success"})
        except:
            return Response({"message": "failed to post new job application"})


@api_view(["DELETE", "PUT"])
def update_job(request, jobId):
    job = AppliedJobs.objects.filter(id=jobId)
    if request.method == "DELETE":
        try:
            job.delete()
            return Response({"msg": "Job deleted"})
        except:
            return Response({"msg": "Job NOT deleted"})

    if request.method == "PUT":
        try:
            job.update(
                company_name=request.data['company_name'], job_title=request.data['job_title'], salary=request.data['salary'], location=request.data['location'])
            return Response({'msg': 'Job updated'})
        except:
            return Response({'msg': 'Job NOT updated'})


@api_view(["GET", "POST"])
def interviews(request):
    if request.method == "GET":
        current = Interview.objects.filter(user=request.user.id).values()
        return Response(list(current))
    if request.method == "POST":
        try:
            user = request.user
            company_name = request.data['company_name']
            interview = Interview.objects.create(
                user=user, company_name=company_name)
            interview.save()
            if request.data['interview_date']:
                interview_date = request.data["interview_date"]
                interview(interview_date=interview_date)
                interview.save()
            if request.data['completed']:
                completed = request.data['completed']
                interview(completed=completed)
                interview.save()
            return Response({"message": "new post of job interview"})
        except:
            return Response({"message": "interview creation failed"})


@api_view(["GET", "POST"])
def posts(request):
    # for now we will only have 1 social page and it will return all posts
    if request.method == "GET":
        company = 'Google'
        #current = Post.objects.filter(company_name = company)
        all_posts = Posts.objects.all().values()
        return JsonResponse(list(all_posts), safe=False)
    if request.method == "POST":
        try:
            title = request.data['title']
            user = request.user
            company_name = request.data['company_name']
            job_title = request.data['job_title']
            description = request.data['description']
            date_created = request.data['date_created']
            print('received date:', date_created)
            post = Posts.objects.create(
                title=title, user=user, company_name=company_name, job_title=job_title, description=description, date_created=date_created)
            post.save()
            print('views.py: post created ', post.date_created)
            db_post = Posts.objects.get(id=post.id)
            json_post = serializers.serialize('json', {db_post})
            return JsonResponse(json_post, safe=False)
        except(e):
            print('error:', e)


@api_view(['PUT', 'DELETE'])
def update_post(request, postId):
    if(request.method == 'DELETE'):
        try: 
            post = Posts.objects.filter(id=request.data['postId'])
            post.delete()
            posts = Posts.objects.all().values()
            print(list(posts))
            return JsonResponse(list(posts), safe=False)
        except Exception as e:
            print('error', e)
    if request.method == 'PUT':
#        if request.data['title']:
#            post.title = request.data['title']
#        if request.data['company_name']:
#            post.company_name = request.data['company_name']
#        if request.data['job_title']:
#            post.job_title = request.data['job_title']
#       post.description = request.data['description']
#       edited_post = Posts.objects.get(id=postId).values()
#       return Response(list(edited_post)[0])
        try:
            post = Posts.objects.filter(id=request.data['postId'])
            post.update(description=request.data['description'])
            data = list(post.values())[0]
            return JsonResponse(data)
        except Exception as e:
            print(e);


@api_view(['GET'])
def check_authentication(request):
    # check if user is authenticated
    if request.user.is_authenticated:
        return Response({'message': 'yes'})
    else:
        return Response({'message': 'no'})


@api_view(['GET'])
def job_search(request, jobName):
    load_dotenv()
    url = "https://job-search4.p.rapidapi.com/monster/search"
    querystring = {"query": jobName, "state": "IL", "page": "1"}

    headers = {
        "X-RapidAPI-Key": os.environ['rapidKey'],
        "X-RapidAPI-Host": "job-search4.p.rapidapi.com"
    }

    response = requests.request(
        "GET", url, headers=headers, params=querystring)
    return Response(json.loads(response.text)["jobs"])


@api_view(["GET", "POST"])
def comments(request):
    if request.method == "POST":
        try:
            title = request.data['title']
            user = request.user
            description = request.data['description']
            post = request.data['post']
            comment = Comments_To_Post.objects.create(
                title=title, user=user, description=description, post=post)
            comment.save()
            return Response({"message": "new comment for this Post"})
        except:
            return Response({"message": "comment creation failed"})
    if request.method == "GET":
        post = request.data['post']
        comment = Comments_To_Post.objects.filter(post=post)
        return Response(list(comment))


@api_view(["GET", "POST"])
def replies_to_comments(request):
    if request.method == "POST":
        try:
            user = request.user
            description = request.data['description']
            comment = request.data['comment']
            reply = Replies_To_Comment.objects.create(
                user=user, description=description, comment=comment)
            reply.save()
            return Response({"message": "new reply for this comment"})
        except:
            return Response({"message": "reply creation failed"})
    if request.method == "GET":
        comment = request.data['comment']
        replies = Replies_To_Comment.objects.filter(comment=comment)
        return Response(list(replies))

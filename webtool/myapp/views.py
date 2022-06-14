from django.shortcuts import render, redirect
from myapp import forms

from myapp.models import Account
from django.contrib.auth import authenticate
from django.contrib import auth

def login(request):
	return render(request, "login.html", locals())

def register(request):
	postform = forms.PostForm(request.POST)
	if request.method == "POST":
		if postform.is_valid():  #forms驗證通過
			Ac = postform['Ac']
			Pa = postform['Pa']
			cEmail = postform['cEmail']
			unit = Account.objects.create(Ac = Ac , Pa = Pa , cEmail =cEmail)
			unit.save()
			redirect('/login/')
			return render(request, "login.html", locals())
		else:
			message = '驗證沒過'
			return render(request, "register.html", locals())
	else:
		message = '歸零'
		postform = forms.PostForm()
	return render(request, "register.html", locals())

def index(request):
	return render(request, "todolist_v1.html")


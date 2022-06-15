
from enum import Flag
from pickle import TRUE
from urllib import response
from django.shortcuts import render, redirect
from flask import session
from myapp.models import Userinfo
from myapp import forms
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.sessions.models import Session
	
def space(request):
	return redirect('/login/')

def register(request):
	if 'Username' not in request.session:	
		postform = forms.PostForm(request.POST)
		if request.method == "POST":
			if postform.is_valid():  #forms驗證通過

					Username = postform.cleaned_data['Username']
					POSTAc = postform.cleaned_data['Ac']
					POSTPa = postform.cleaned_data['Pa']
					cEmail = postform.cleaned_data['cEmail']
					unit = Userinfo.objects.create(Ac = POSTAc , Pa = POSTPa , cEmail = cEmail,Username = Username)
					unit.save()
					return redirect('/login/')
			else:
				messages.success(request, "請確認驗證碼是否錯誤?")
				return render(request, "register.html", locals())
		else:
			message = '歸零'
			postform = forms.PostForm()
		return render(request, "register.html", locals())
	else:
		return redirect('/index/')

def login(request):
	LoginFrom = forms.LoginFrom(request.POST)
	if 'Username' not in request.session:
		if request.method == "POST":
			if LoginFrom.is_valid():  #forms驗證通過
				LoginAc = LoginFrom.cleaned_data['Ac']
				LoginPa = LoginFrom.cleaned_data['Pa']
				unit = Userinfo.objects.get(Ac = LoginAc)
				if str(unit.Ac) == str(LoginAc):#帳號對
					if str(unit.Pa) == str(LoginPa):#密碼對
						
						request.session['Username'] = str(unit.Username)
						return redirect('/index/')
					else:#密碼錯
						
						messages.warning(request, "帳戶或是密碼錯誤,請再檢查一遍")
						return render(request, "login.html", locals())
				else:#帳號錯
					messages.warning(request, "帳戶或是密碼錯誤,請再檢查一遍")
					return render(request, "login.html", locals())


			else:#驗證沒過
				messages.warning(request, "沒有通過表單驗證,請再檢查一遍")
				return render(request, "login.html", locals())
						
		else:
			return render(request, "login.html", locals())
	else:
		return redirect('/index/')

def logout(request):
	if 'Username' in request.session:
		del request.session['Username']	
	return redirect('/login/')

def index(request):
	if 'Username' not in request.session:
		return redirect('/login/')
	else:
		username = request.session['Username']
		return render(request, "index.html",  locals())

def alarm(request):
	if 'Username' not in request.session:

		return redirect('/login/')
	else:
		username = request.session['Username']
		return render(request, "alarm.html",  locals())



def setting(request,mode=None):
	if 'Username' in request.session:
		EditFrom = forms.EditFrom(request.POST)
		Username = request.session['Username']
		if request.method == "POST":
			unit = Userinfo.objects.get(Username=Username) 
			if EditFrom.is_valid():  #forms驗證通過
				RlPa = unit.Pa
				OldPa = EditFrom.cleaned_data['Pa']
				if str(OldPa) == str(RlPa):
					unit.Pa = EditFrom.cleaned_data['NewPa']
					unit.cEmail = EditFrom.cleaned_data['cEmail']
					unit.save()
					del request.session['Username']	
					return redirect('/login/')
				else:
					messages.warning(request, "密碼錯誤,請再檢查一遍")
					return render(request, "setting.html",  locals())
			else:
				messages.warning(request, "沒有通過form驗證,請再檢查一遍")
				return render(request, "setting.html",  locals())
		else:
			messages.warning(request, "沒有通過表單驗證,請再檢查一遍")
			return render(request, "setting.html",  locals())

	else:
		return redirect('/login/')

def aboutus(request):
	if 'Username' not in request.session:

		return redirect('/login/')
	else:
		username = request.session['Username']
		return render(request, "aboutus.html",  locals())

def howtouse(request):
	if 'Username' not in request.session:

		return redirect('/login/')
	else:
		username = request.session['Username']
		return render(request, "howtouse.html",  locals())
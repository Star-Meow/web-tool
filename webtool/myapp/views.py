

# Create your views here.

from django.shortcuts import render, redirect
from myapp import forms
from django.contrib.auth import authenticate
from django.contrib import auth

def login(request):
	if request.method == "POST":
		postform = forms.PostForm(request.POST)
		if postform.is_valid():  #forms驗證通過
			username = postform.cleaned_data['username']
			pd =  postform.cleaned_data['pd']
			user1 = authenticate(username=username, password=pd)  #管理者驗證
			if user1 is not None:  #驗證通過
				auth.login(request, user1)  #登入
				postform = forms.PostForm()
				return redirect('/manage/')
			else:  #驗證未通過
				message = '登入失敗！'
		else:
			message = '驗證碼錯誤！'
	else:
		message = '帳號、密碼及驗證碼都必須輸入！'
		postform = forms.PostForm()
	return render(request, "login.html", locals())


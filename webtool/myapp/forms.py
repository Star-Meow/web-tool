from django import forms
from captcha.fields import CaptchaField

class PostForm(forms.Form):
    Username = forms.CharField(min_length=1,max_length=20,initial='')
    Ac = forms.CharField(min_length=1,max_length=10,initial='')
    Pa = forms.CharField(widget=forms.PasswordInput())
    cEmail = forms.EmailField(max_length=100,initial='',required=True)
    captcha = CaptchaField()


class LoginFrom(forms.Form):
    Ac = forms.CharField(min_length=1,max_length=10,initial='')
    Pa = forms.CharField(widget=forms.PasswordInput())
    captcha = CaptchaField()

class EditFrom(forms.Form):
    Pa = forms.CharField(widget=forms.PasswordInput())
    NewPa = forms.CharField(widget=forms.PasswordInput())
    cEmail = forms.EmailField(max_length=100,initial='',required=True)
    captcha = CaptchaField()
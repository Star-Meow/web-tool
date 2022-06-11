from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-yos=ep8ck)$2y872cgkn&o-7mzbg=ey1ja-gl6(j7mgdebi!s6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',
    'captcha',
]

CAPTCHA_NOISE_FUNCTIONS = (
    #'captcha.helpers.noise_null', #没有樣式  
    'captcha.helpers.noise_arcs', #線  
    'captcha.helpers.noise_dots', #點  
)

CAPTCHA_IMAGE_SIZE = (150, 70) #圖片大小 

CAPTCHA_BACKGROUND_COLOR = '#ffffff' #背景頻色

CAPTCHA_CHALLENGE_FUNCT = 'captcha.helpers.random_char_challenge' #圖片為英文字母 
#CAPTCHA_CHALLENGE_FUNCT = 'captcha.helpers.math_challenge' #圖片中為數學計算式  
  
CAPTCHA_LENGTH = 5 #英文字母個數 

CAPTCHA_TIMEOUT = 3 #時間限制(分)  

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'webtool.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'webtool.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
'''
DATABASES = {
  'default': {
    'ENGINE': 'sql_server.pyodbc',			        # odbc連線固定寫法
    'NAME': 'DESKTOP-O0LA24R',				            # 自定義資料庫連線名
    'USER': 'sa',					                # 資料庫連線賬戶
    'PASSWORD': 'shido456852',				        # 資料庫連線密碼
    'HOST': '127.0.0.1',				            # 資料庫服務地址(本機)
    'PORT': '1433',					                # 資料庫連線埠(SQL預設1433 PORT)
    'OPTIONS':{
        'driver':'ODBC Driver 17 for SQL Server',	# ODBC連線應用驅動
    }
  }
}
'''
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'zh-hant'

TIME_ZONE = 'Asia/Taipei'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

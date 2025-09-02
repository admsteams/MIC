from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('borrower-solutions/', views.borrower_solutions, name='borrower_solutions'),
    path('contact/', views.contact, name='contact'),
    path('submit-inquiry/', views.submit_inquiry, name='submit_inquiry'),
    path('subscribe/', views.subscribe, name='subscribe'),
    path('calculator/', views.calculator, name='calculator'),
]
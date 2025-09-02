from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('services/direct-investment/', views.direct_investment, name='direct_investment'),
    path('services/pooled-fund/', views.pooled_fund, name='pooled_fund'),
    path('services/fixed-return/', views.fixed_return, name='fixed_return'),
    path('borrower-solutions/', views.borrower_solutions, name='borrower_solutions'),
    path('calculator/', views.calculator, name='calculator'),
    path('contact/', views.contact, name='contact'),
    path('submit-inquiry/', views.submit_inquiry, name='submit_inquiry'),
    path('subscribe/', views.subscribe, name='subscribe'),
    path('testimonials/', views.testimonials, name='testimonials'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('pricing/', views.pricing, name='pricing'),
    path('blog/', views.blog, name='blog'),
]
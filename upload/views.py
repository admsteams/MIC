from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm, InquiryForm, SubscriptionForm

def home(request):
    form = InquiryForm()
    return render(request, 'index.html', {'form': form})

def about(request):
    return render(request, 'about.html')

def services(request):
    return render(request, 'services.html')

def direct_investment(request):
    return render(request, 'services/direct_investment.html')

def pooled_fund(request):
    return render(request, 'pooled_fund.html')

def fixed_return(request):
    return render(request, 'fixed_return.html')

def borrower_solutions(request):
    return render(request, 'services/borrower_solutions.html')

def calculator(request):
    return render(request, 'calculator.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            try:
                send_mail(
                    f'Contact Form: {subject}',
                    f'Name: {name}\nEmail: {email}\nMessage: {message}',
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.CONTACT_EMAIL],
                    fail_silently=False,
                )
                return JsonResponse({'status': 'success', 'message': 'Your message has been sent successfully.'})
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': f'Failed to send message: {str(e)}'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Please correct the errors below.', 'errors': form.errors})
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})

def submit_inquiry(request):
    if request.method == 'POST':
        form = InquiryForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            interest = form.cleaned_data['interest']
            amount = form.cleaned_data['amount']
            message = form.cleaned_data['message']
            try:
                send_mail(
                    f'Investment Inquiry from {name}',
                    f'Name: {name}\nEmail: {email}\nPhone: {phone}\nInterest: {interest}\nAmount: {amount}\nMessage: {message}',
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.INQUIRY_EMAIL],
                    fail_silently=False,
                )
                return JsonResponse({'status': 'success', 'message': 'Your inquiry has been submitted successfully.'})
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': f'Failed to send inquiry: {str(e)}'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Please correct the errors below.', 'errors': form.errors})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

def subscribe(request):
    if request.method == 'POST':
        form = SubscriptionForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            # Add to newsletter list (placeholder)
            return JsonResponse({'status': 'success', 'message': 'You have been subscribed successfully.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Please enter a valid email address.', 'errors': form.errors})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

def testimonials(request):
    return render(request, 'testimonials.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def pricing(request):
    return render(request, 'pricing.html')

def blog(request):
    return render(request, 'blog.html')
from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    subject = forms.CharField(max_length=200)
    message = forms.CharField(widget=forms.Textarea)

class InquiryForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20)
    interest = forms.ChoiceField(choices=[('direct', 'Direct Mortgage Investment'), ('pooled', 'Pooled Mortgage Fund'), ('fixed', 'Fixed Return Investment')])
    amount = forms.DecimalField()
    message = forms.CharField(widget=forms.Textarea)

class SubscriptionForm(forms.Form):
    email = forms.EmailField()
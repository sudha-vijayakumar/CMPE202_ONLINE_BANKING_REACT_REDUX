from django import forms

class UserRegistrationForm(forms.Form):
    First_Name = forms.CharField(
        required = True,
        label = 'First_Name',
        max_length = 32
    )

    Last_Name = forms.CharField(
        required = True,
        label = 'Last_Name',
        max_length = 32
    )

    Username = forms.CharField(
        required = True,
        label = 'Username',
        max_length = 32
    )

    Email = forms.CharField(
        required = True,
        label = 'Email',
        max_length = 32,
    )

    Password = forms.CharField(
        required = True,
        label = 'Password',
        max_length = 32,
        widget = forms.PasswordInput()
    )

    Total_Accounts = forms.IntegerField(
        required = True,
        label = 'Total Accounts'
    )
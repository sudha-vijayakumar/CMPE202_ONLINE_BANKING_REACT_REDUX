from django.db import models
import uuid
from django.urls import reverse
from random import randint
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import UserManager
# def random_with_N_digits(n):
#     range_start = 10**(n-1)
#     range_end = (10**n)-1
#     return randint(range_start, range_end)

# User details
class Customer(AbstractBaseUser):
    REQUIRED_FIELDS = ['Email']
    USERNAME_FIELD = 'Username'
    Cust_UUID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    First_Name = models.CharField(max_length=200)
    Last_Name = models.CharField(max_length=200)
    Email = models.EmailField(max_length=254, unique=True)
    Username = models.CharField(max_length=65, unique=True)
    Password = models.CharField(max_length=128)
    Total_Accounts = models.IntegerField(null=True, default=1)
    isAdmin = models.CharField(max_length=5,default="False")

    objects = UserManager()

class Account(models.Model):
    Customer_ID = models.ForeignKey('Customer', on_delete=models.CASCADE)
    Account_Number = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ACCOUNT_TYPES = (
        ('Checking', 'Checking Account'),
        ('Savings', 'Savings Account'),
    )
    Account_Type = models.CharField(max_length=8, choices=ACCOUNT_TYPES)
    Balance = models.FloatField()
    STATUS_TYPES = (
        ('Active', 'Active Account'),
        ('Inactive', 'Account is not Active'),
    )
    status = models.CharField(max_length=10, choices=STATUS_TYPES, default='Inactive')


class Transaction(models.Model):
    Account_Number = models.ForeignKey('Account', on_delete=models.CASCADE)
    Acc_Number = models.UUIDField()
    ACCOUNT_TYPES = (
        ('Checking', 'Checking Account'),
        ('Savings', 'Savings Account'),
    )
    Account_Type = models.CharField(max_length=8, choices=ACCOUNT_TYPES)
    TRANSACTION_TYPES = (
        ('Withdrawal', 'Amount Withdrawn'),
        ('Deposit', 'Amount Deposited'),
        ('Send', ' Amount Sent'),
        ('Receive', 'Amount Received'),
        ('Transfer', 'Amount Transferred'),
        ('Refund', 'Refund from Admin'),
        ('Fees', 'Fees from Admin')
    ) 
    Transaction_Type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    Amount = models.FloatField()
    Details = models.CharField(max_length=250, blank=True)
    Transaction_Date = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ['Transaction_Date']

class Admin(AbstractBaseUser):
    REQUIRED_FIELDS = ['Username']
    USERNAME_FIELD = 'Username'
    Admin_UUID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    First_Name = models.CharField(max_length=200)
    Last_Name = models.CharField(max_length=200)
    Email = models.EmailField(max_length=254, unique=True)
    Password = models.CharField(max_length=128, default="test")
    Username = models.CharField(max_length=65, unique=True)

    objects = UserManager()


class Register(models.Model):
    First_Name = models.CharField(max_length=200)
    Last_Name = models.CharField(max_length=200)
    Email = models.EmailField(max_length=254, unique=True)
    Username = models.CharField(max_length=65, unique=True)
    Password = models.CharField(max_length=128)
    Total_Accounts = models.IntegerField()
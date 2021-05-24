from django.shortcuts import render, redirect
from .models import Account, Customer, Transaction, Admin
from .serializers import AccountSerializer, TransactionSerializer, CustomerSerializer, AdminSerializer, CustomerSerializerWithToken, AdminSerializerWithToken
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
import json
from django.contrib.auth.models import User, auth
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from .forms import UserRegistrationForm
from django import forms
from datetime import datetime, timedelta
from dateutil.relativedelta import *
# import requests

class AccountView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class CustomerView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class TransactionView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class AdminView(generics.ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer


class create_customer_token(APIView):
    """
    input_payload_example = {"First_Name": "John", "Last_Name": "Test", "Email": "john@gmail.com", "Password": "johnpass", "Username": "john1", "Total_Accounts": 1}
    """
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        print("CALLING FUNCTION")
        serializer = CustomerSerializerWithToken(data=request.data)
        if serializer.is_valid():

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class create_admin_token(APIView):
    """
    input_payload_example = {"First_Name": "John", "Last_Name": "Test", "Email": "john@gmail.com", "Password": "johnpass", "Username": "john1", "isAdmin": True}
    """
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        print("CALLING FUNCTION")
        serializer = AdminSerializerWithToken(data=request.data)
        if serializer.is_valid():

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def is_admin(request):
    """
    input_payload_example = {"Email": "email@gmail.com"}
    """
    payload = json.loads(request.body)
    email = payload['Email']
    admins = Customer.objects.filter(isAdmin="True")
    for admin in admins:
        print("Admin: ", admin)
        print("Email: ", email)
        if (str(admin) == str(email)):
            return JsonResponse({'Response': "True"}, safe=False)
    return JsonResponse({'Response': "False"}, safe=False)


@api_view(["GET"])
def get_customers(request):
    print("THIS IS RUNNING")
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)
    return JsonResponse({'customers': serializer.data}, safe=False)


@api_view(["GET"])
def get_customer(request, customer_id):
    customer_item = Customer.objects.filter(Cust_UUID = customer_id)
    serializer = CustomerSerializer(customer_item, many=True)
    return JsonResponse({'customer': serializer.data}, safe=False)

@api_view(["PUT"])
def get_customer_by_username(request):
    print("Getting customer by username")
    """
    input_payload_example = {"Username" : "username"}
    """
    payload = json.loads(request.body)
    Username = payload['Username']
    customer = Customer.objects.get(Username = Username)
    serializer = CustomerSerializer(customer)
    return JsonResponse({'customer': serializer.data}, safe=False)

@api_view(["POST"])
def create_customer(request):
    print("CALLING FUNCTION")
    """
    input_payload_example = {"First_Name": "John", "Last_Name": "Test", "Email": "john@gmail.com", "Password": "johnpass", "Username": "john1", "Total_Accounts": 1}
    """
    payload = json.loads(request.body)
    try:
        customer = Customer.objects.create(
            First_Name=payload['First_Name'],
            Last_Name=payload['Last_Name'],
            Email=payload['Email'],
            Password = make_password(payload['Password']),
            Username=payload['Username'],
            Total_Accounts = payload['Total_Accounts']
        )
        customer.save()
        serializer = CustomerSerializer(customer)
        num_accounts = payload['Total_Accounts']
        if (num_accounts == 1):
            account1 = Account.objects.create(
                Customer_ID=customer,
                Account_Type='Checking',
                Balance = 1000,
                status='Inactive'
            )
            account1.save()
        elif (num_accounts == 2):
            account1 = Account.objects.create(
                Customer_ID=customer,
                Account_Type='Checking',
                Balance = 1000,
                status='Inactive'
            )
            account1.save()
            account2 = Account.objects.create(
                Customer_ID=customer,
                Account_Type='Savings',
                Balance = 300,
                status='Inactive'
            )
            account2.save()
        return JsonResponse({'customer': serializer.data}, safe=False)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False)

@api_view(["DELETE"])
def delete_customer(request, customer_id):
    print("CALLING DELETE FUNCTION")
    customer = Customer.objects.get(Cust_UUID = customer_id)
    customer.delete()
    return Response("Delete Successful")

@api_view(["PUT"])
def change_customer_email(request, customer_id):
    """ 
    request format: {"Email": "New Email"}
    """
    print("Changing customer email")
    payload = json.loads(request.body)
    customer = Customer.objects.get(Cust_UUID = customer_id)
    customer.Email = payload["Email"]
    customer.save() 
    serializer = CustomerSerializer(customer)
    return JsonResponse({'customer': serializer.data}, safe=False)

@api_view(["POST"])
def create_account(request):
    print("Creating Account")
    """
    input_payload_example: {"Customer_ID": "UUID", "Account_Type": "Checking","Balance":"1000"}
    """
    payload = json.loads(request.body)
    customer_id = payload['Customer_ID']
    customer = Customer.objects.get(Cust_UUID = customer_id)
    account = Account.objects.create(
        Customer_ID=customer,
        Account_Type=payload['Account_Type'],
        Balance = payload['Balance'],
        status='Inactive'
    )
    account.save()
    customer_id = payload['Customer_ID']
    customer = Customer.objects.get(Cust_UUID = customer_id)
    customer.Total_Accounts = customer.Total_Accounts + 1
    customer.save()
    serializer = AccountSerializer(account)
    return JsonResponse({'account': serializer.data}, safe=False)


@api_view(["POST"])
def register(request):
    form = UserRegistrationForm(request.POST)
    if form.is_valid():
        userObj = form.cleaned_data
        first_name = userObj['First_Name']
        last_name = userObj['Last_Name']
        email =  userObj['Email']
        Username = userObj['Username']
        password =  userObj['Password']
        total_accounts = userObj['Total_Accounts']
        if not (User.objects.filter(Username=Username).exists() or User.objects.filter(email=email).exists()):
            User.objects.create_user(first_name, last_name, Username, email, password, total_accounts)
            user = authenticate(email = email, password = password)
            login(request, user)
            return HttpResponseRedirect('/')    
        else:
            raise forms.ValidationError('Looks like a username with that email or password already exists')

        return render(request, 'http://localhost:3000/auth/register', {'form' : form})

@api_view(["PUT"])
def deposit(request):
    print("Depositing into Account")
    """
    input_payload_example: {"Account_Num": 12345, "Deposit": 500}
    """
    payload = json.loads(request.body)
    account_number = payload['Account_Num']
    account = Account.objects.get(Account_Number = account_number)
    status = account.status
    if (status == "Inactive"):
        return JsonResponse({'Error': "Account needs to be activated to make transactions"}, safe=False)
    deposit = payload['Deposit']
    account.Balance = account.Balance + deposit
    account.save()
    serializer = AccountSerializer(account)
    transaction = Transaction.objects.create(
        Account_Number=account,
        Acc_Number=account_number,
        Account_Type=account.Account_Type,
        Transaction_Type="Deposit",
        Amount = deposit
    )
    transaction.save()
    return JsonResponse({'account': serializer.data}, safe=False)

@api_view(["PUT"])
def withdraw(request):
    print("Withdrawing From Account")
    """
    input_payload_example: {"Account_Num": 12345, "Amount": 500}
    """
    payload = json.loads(request.body)
    account_number = payload['Account_Num']
    account = Account.objects.get(Account_Number = account_number)
    status = account.status
    if (status == "Inactive"):
        return JsonResponse({'Error': "Account needs to be activated to make transactions"}, safe=False)
    amount = payload['Amount']
    if (amount < account.Balance): 
        account.Balance = account.Balance - amount
        account.save()
    else:
        return JsonResponse({'error': 'You dont have enough to withdraw that much'}, safe=False)
    serializer = AccountSerializer(account)
    transaction = Transaction.objects.create(
        Account_Number=account,
        Acc_Number=account_number,
        Account_Type=account.Account_Type,
        Transaction_Type="Withdrawal",
        Amount = amount
    )
    transaction.save()
    return JsonResponse({'account': serializer.data}, safe=False)

@api_view(["GET"])
def get_accounts(request, customer_id):
    print("Getting All Accounts associated with a Specific Customer")
    """
    no input payload. Endpoint : account/api/getAccount/UUID
    """
    customer = Customer.objects.get(Cust_UUID = customer_id)
    accounts = Account.objects.filter(Customer_ID = customer)
    serializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': serializer.data}, safe=False)

@api_view(["PUT"])
def get_active_accounts_for_customer(request):
    """
    input payload: {'Customer_ID' : Customer_UUID}
    """
    payload = json.loads(request.body)
    customer_id = payload['Customer_ID']
    customer = Customer.objects.get(Cust_UUID = customer_id)
    accounts = Account.objects.filter(Customer_ID = customer, status='Active')
    serializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': serializer.data}, safe=False)

@api_view(["PUT"])
def get_inactive_accounts_for_customer(request):
    """
    input payload: {'Customer_ID' : Customer_UUID}
    """
    payload = json.loads(request.body)
    customer_id = payload['Customer_ID']
    customer = Customer.objects.get(Cust_UUID = customer_id)
    accounts = Account.objects.filter(Customer_ID = customer, status='Inactive')
    serializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': serializer.data}, safe=False)

@api_view(["GET"])
def get_all_inactive_accounts(request):
    accounts = Account.objects.filter(status='Inactive')
    serializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': serializer.data}, safe=False)

@api_view(["GET"])
def get_all_active_accounts(request):
    accounts = Account.objects.filter(status='Active')
    serializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': serializer.data}, safe=False)

@api_view(["PUT"])
def get_inactive_accounts_by_username(request):
    """
    input payload: {'Username' : username}
    """
    payload = json.loads(request.body)
    Username = payload['Username']
    customer = Customer.objects.get(Username = Username)
    accounts = Account.objects.filter(Customer_ID = customer, status='Inactive')
    serializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': serializer.data}, safe=False)

@api_view(["PUT"])
def approve_account(request):
    """
    input payload: {"Account_Num": 1234}
    """
    payload = json.loads(request.body)
    account_num = payload['Account_Num']
    account = Account.objects.get(Account_Number = account_num)
    account.status = "Active"
    account.save()
    serializer = AccountSerializer(account)
    return JsonResponse({'account': serializer.data}, safe=False)

@api_view(["PUT"])
def close_account(request):
    """
    input payload: {"Account_Num": 1234}
    """
    payload = json.loads(request.body)
    account_num = payload['Account_Num']
    account = Account.objects.get(Account_Number = account_num)
    account.status = "Inactive"
    account.save()
    serializer = AccountSerializer(account)
    return JsonResponse({'account': serializer.data}, safe=False)

@api_view(["PUT"])
def add_refund(request):
    """
    input payload: {"Account_Num": 1234, "Amount": 100}
    """
    payload = json.loads(request.body)
    account_num = payload['Account_Num']
    account = Account.objects.get(Account_Number = account_num)
    amount = payload['Amount']
    account.Balance = account.Balance + amount
    account.save()
    refund_transaction = Transaction.objects.create(
        Account_Number=account,
        Acc_Number=account.Account_Number,
        Account_Type=account.Account_Type,
        Transaction_Type="Refund",
        Amount=amount
    )
    refund_transaction.save()
    serializer = TransactionSerializer(refund_transaction)
    return JsonResponse({'transaction': serializer.data}, safe=False)

@api_view(["PUT"])
def charge_fee(request):
    """
    input payload: {"Account_Num": 1234, "Amount": 100}
    """
    payload = json.loads(request.body)
    account_num = payload['Account_Num']
    account = Account.objects.get(Account_Number = account_num)
    amount = payload['Amount']
    account.Balance = account.Balance - amount
    account.save()
    fee_transaction = Transaction.objects.create(
        Account_Number=account,
        Acc_Number=account.Account_Number,
        Account_Type=account.Account_Type,
        Transaction_Type="Fees",
        Amount=amount
    )
    fee_transaction.save()
    serializer = TransactionSerializer(fee_transaction)
    return JsonResponse({'transaction': serializer.data}, safe=False)

@api_view(["PUT"])
def transfer_transaction(request):
    print("Doing money transaction right now")
    """
    input_payload_example: { "Source_Account_Num": 1234, "Dest_Account_Num": 1234, "Amount": 112, "Details": "Testing Send"}
    """
    payload = json.loads(request.body)
    source_account_num = payload['Source_Account_Num']
    dest_account_num = payload['Dest_Account_Num']
    amount = payload['Amount']
    details = payload['Details']
    source_account = Account.objects.get(Account_Number = source_account_num)
    status = source_account.status
    if (status == "Inactive"):
        return JsonResponse({'Error': "Account needs to be activated to make transactions"}, safe=False)
    dest_account = Account.objects.get(Account_Number = dest_account_num)
    if (amount > source_account.Balance):
        return JsonResponse({'error': 'You dont have that much money.'}, safe=False)
    else:
        source_account.Balance = source_account.Balance - amount
        dest_account.Balance = dest_account.Balance + amount 
    source_account.save()
    dest_account.save()
    send_transaction = Transaction.objects.create(
        Account_Number=source_account,
        Acc_Number=source_account.Account_Number,
        Account_Type=source_account.Account_Type,
        Transaction_Type="Transfer",
        Amount = amount
    )
    send_transaction.save()
    recv_transaction = Transaction.objects.create(
        Account_Number=dest_account,
        Acc_Number=dest_account.Account_Number,
        Account_Type=dest_account.Account_Type,
        Transaction_Type="Transfer",
        Amount = amount
    )
    recv_transaction.save()
    serializer = TransactionSerializer(send_transaction)
    return JsonResponse({'transaction': serializer.data}, safe=False)

@api_view(["PUT"])
def send_transaction(request):
    payload = json.loads(request.body)
    source_account_num = payload['Source_Account_Num']
    dest_account_num = payload['Dest_Account_Num']
    amount = payload['Amount']
    details = payload['Details']
    source_account = Account.objects.get(Account_Number = source_account_num)
    status = source_account.status
    if (status == "Inactive"):
        return JsonResponse({'Error': "Account needs to be activated to make transactions"}, safe=False)
    if (amount > source_account.Balance):
        return JsonResponse({'Error': 'You dont have enough money'}, safe=False)
    else:
        source_account.Balance = source_account.Balance - amount 
    source_account.save()
    send_transaction = Transaction.objects.create(
        Account_Number=source_account,
        Acc_Number=source_account.Account_Number,
        Account_Type=source_account.Account_Type,
        Transaction_Type="Send",
        Amount = amount
    )
    send_transaction.save()
    serializer = TransactionSerializer(send_transaction)
    return JsonResponse({'transaction': serializer.data}, safe=False) 

@api_view(["GET"])
def get_transactions(request, account_number):
    print("Getting all transactions")
    """
    No Input Payload
    """
    account = Account.objects.get(Account_Number = account_number)
    transactions = Transaction.objects.filter(Account_Number = account)
    serializer = TransactionSerializer(transactions, many=True)
    return JsonResponse({'transactions': serializer.data}, safe=False)

@api_view(["GET"])
def get_balance(request, account_number):
    print("Getting Balance")
    """
    No Input Payload
    """
    account = Account.objects.get(Account_Number = account_number)
    balance = account.Balance 
    return JsonResponse({'Balance': balance}, safe=False)

@api_view(["PUT"])
def get_transactions_18_months_by_account(request):
    """
    input_payload: {"Account_Number": 1234}
    """
    payload = json.loads(request.body)
    account_number = payload['Account_Number']
    account = Account.objects.filter(Account_Number = account_number)
    current_date = datetime.now()
    early_date = current_date + relativedelta(months=-18)
    transactions = Transaction.objects.filter(Account_Number__in = account, Transaction_Date__gte=early_date)
    serializer = TransactionSerializer(transactions, many=True)
    return JsonResponse({'transactions': serializer.data}, safe=False)

@api_view(["PUT"])
def get_transactions_by_range_by_account(request):
    """
    input_payload = {"Account_Number" : 1234, "Range": 6}
    """
    payload = json.loads(request.body)
    account_number = payload['Account_Number']
    date_range = int(payload['Range'])
    account = Account.objects.filter(Account_Number = account_number)
    current_date = datetime.now()
    early_date = current_date + relativedelta(months=-date_range)
    transactions = Transaction.objects.filter(Account_Number__in = account, Transaction_Date__gte=early_date)
    serializer = TransactionSerializer(transactions, many=True)
    return JsonResponse({'transactions': serializer.data}, safe=False)





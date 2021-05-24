from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Account, Customer, Transaction, Admin, Register
from django.contrib.auth.hashers import make_password
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['Cust_UUID', 'First_Name', 'Last_Name', 'Email', 'Username', 'Password', 'Total_Accounts', 'isAdmin']
        extra_kwargs = {'Password': {'write_only': True}}

    def create(self, validated_data):
        customer = Customer.objects.create(
            First_Name=validated_data['First_Name'],
            Last_Name=validated_data['Last_Name'],
            Email=validated_data['Email'],
            Username=validated_data['Username'],
            Total_Accounts = validated_data['Total_Accounts']
        )
        customer.set_password(validated_data['Password'])
        customer.save()
        customer.save()
        return customer


class CustomerSerializerWithToken(serializers.ModelSerializer):


    token = serializers.SerializerMethodField()
    # Password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token


    def create(self, validated_data):
        customer = Customer.objects.create(
            First_Name=validated_data['First_Name'],
            Last_Name=validated_data['Last_Name'],
            Email=validated_data['Email'],
            Username=validated_data['Username'],
            Total_Accounts = validated_data['Total_Accounts']
        )
        customer.set_password(validated_data['Password'])
        customer.save()
        return customer

    class Meta:
        model = Customer
        fields = ['token', 'Cust_UUID', 'First_Name', 'Last_Name', 'Email',  'Username', 'Password', 'Total_Accounts', 'isAdmin']
        extra_kwargs = {'Password': {'write_only': True}}

class AdminSerializerWithToken(serializers.ModelSerializer):


    token = serializers.SerializerMethodField()
    # Password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token


    def create(self, validated_data):
        admin = Customer.objects.create(
            First_Name=validated_data['First_Name'],
            Last_Name=validated_data['Last_Name'],
            Email=validated_data['Email'],
            Username=validated_data['Username'],
            isAdmin=validated_data['isAdmin']
        )
        admin.set_password(validated_data['Password'])
        admin.save()
        return admin

    class Meta:
        model = Customer
        fields = ['token', 'Cust_UUID', 'First_Name', 'Last_Name', 'Email',  'Username', 'Password', 'Total_Accounts', 'isAdmin']
        extra_kwargs = {'Password': {'write_only': True}}

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['Customer_ID', 'Account_Number', 'Account_Type', 'Balance', 'status']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['Account_Number', 'Acc_Number', 'Account_Type', 'Transaction_Type', 'Amount', 'Details', 'Transaction_Date']


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['Admin_UUID', 'First_Name', 'Last_Name', 'Email', 'Password', 'Username']

    def create(self, validated_data):
        admin = Admin.objects.create(
            First_Name=validated_data['First_Name'],
            Last_Name=validated_data['Last_Name'],
            Email=validated_data['Email'],
            Password = make_password(validated_data['Password']),
            Username=validated_data['Username']
        )
        admin.save()
        return admin


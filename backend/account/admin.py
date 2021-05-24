from django.contrib import admin
from .models import Customer, Account, Transaction, Admin


admin.site.register(Customer)
admin.site.register(Account)
admin.site.register(Transaction)
admin.site.register(Admin)
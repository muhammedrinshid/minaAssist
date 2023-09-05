from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
import uuid
from django.conf import settings

from django_countries.fields import CountryField


# Custom user model

class CustomAccountManager(BaseUserManager):


    def create_superuser(self,email,agency_name,password,**other_fields):
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_admin',True)
        other_fields.setdefault('is_superuser',True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'super must a assigned to is_staff=true'
            )
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'super must a assigned to is_superuser=true'
            )
        return(self.create_user(email,agency_name,password,**other_fields))


   


    def create_user(self,email,agency_name,password,**other_fields):
        if not email:
            raise ValueError('You must provide a email address')
        email=self.normalize_email(email)
        user=self.model(email=email,agency_name=agency_name,**other_fields)
        user.set_password(password)
        user.save()
        return user

class NewUser(AbstractBaseUser,PermissionsMixin):
    id=models.UUIDField(unique=True,default=uuid.uuid4,editable=False,primary_key=True)
    agency_name=models.CharField(max_length=25)
    email=models.EmailField(unique=True,verbose_name="user_email",max_length=50 )
    branch=models.CharField(max_length=25)
    image=models.ImageField(null=True,blank=True)
    # last_login=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)
    is_staff=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    parent_user=models.ForeignKey("self",on_delete=models.CASCADE,null=True,blank=True)
    staff_name=models.CharField(max_length=25,null=True,blank=True)
    district=models.CharField(max_length=25,null=True,blank=True)
    state=models.CharField(max_length=25,null=True,blank=True)
    address=models.CharField(max_length=75,null=True,blank=True)
    pincode=models.CharField(max_length=7,null=True,blank=True)

    objects=CustomAccountManager()
    USERNAME_FIELD='email'

    REQUIRED_FIELDS=['agency_name','branch']

    def __str__(self):
        return self.agency_name
    
#airports for global access
class Airport(models.Model):
     id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
     country=models.CharField(max_length=20,null=True,blank=True)
     airport_name=models.CharField(max_length=20,null=True,blank=True)
     airport_code=models.CharField(max_length=4)
     airport_place=  models.CharField(max_length=50)
     def __str__(self):
         return self.airport_code
     






# Countries for global access

class Country(models.Model):
     contry_name=models.CharField(max_length=20)
     created_on=models.DateTimeField(auto_now_add=True)
     capital=models.CharField(max_length=20,null=True,blank=True)
    #  flag_image=
     def __str__(self):
         return self.contry_name
     
#Airline for global access  
class Airline(models.Model):
     id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)

     airline_name=models.CharField(max_length=50)
     created_on=models.DateTimeField(auto_now_add=True)
    #  airline_logo=
     def __str__(self):
         return self.airline_name



#Agencies
class Agency(models.Model):
     id=models.UUIDField(unique=True,default=uuid.uuid4,editable=False,primary_key=True)
     owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
     created_on=models.DateTimeField(auto_now_add=True)
     name=models.CharField(max_length=30)
     branch=models.CharField(null=True,blank=True,max_length=24)
     short_name=models.CharField(null=True,blank=True,max_length=8)
     remarks=models.TextField(null=True,blank=True)
     image=models.ImageField(null=True,blank=True)
     def __str__(self):
         return self.name


#Appoinments

class AccountTransation(models.Model):
     id=models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
     transaction_date=models.DateField(null=True,blank=True)
     owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
     created_on=models.DateTimeField(auto_now_add=True)
     debit_or_credit=models.BooleanField()
     agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
     balance=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
     net_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
     gross_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
     transaction_method=models.CharField(null=True,blank=True,max_length=50)
     bill_no=models.CharField(null=True,blank=True,max_length=50)
     notes=models.TextField(max_length=250,null=True,blank=True)
     title=models.CharField(max_length=250,null=True,blank=True)
     
     def __str__(self):
        return self.title



class Appoinment(models.Model):
        id=models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
        created_on=models.DateTimeField(auto_now_add=True)
        updated_on=models.DateTimeField(auto_now=True)
        owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
        applicant_name=models.CharField(max_length=30)
        submission_date=models.DateField(null=True,blank=True)
        appoinment_date=models.DateField(null=True,blank=True)
        care_of=models.CharField(max_length=25,null=True,blank=True)
        phone=models.CharField(max_length=13,null=True, blank=True)
        appoinment_time=models.TimeField(null=True, blank=True)
        pass_seva_username=models.CharField(max_length=20,null=True,blank=True)
        pass_seva_password=models.CharField(max_length=20,null=True,blank=True)
        office=models.CharField(max_length=20,null=True,blank=True)
        agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
        paid=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
        net_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
        gross_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
        notes=models.TextField(max_length=250,null=True,blank=True)
        appoinment_type=models.CharField(max_length=18,null=True,blank=True)
        transaction=models.OneToOneField(AccountTransation, on_delete=models.CASCADE,null=True,blank=True)
        def __str__(self):
         return self.applicant_name

        
    # issued tickets
class Issued_ticket(models.Model):
        id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
        owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
        created_on=models.DateTimeField(auto_now_add=True)
        update_on=models.DateTimeField(auto_now=True)
        number_of_travelers=models.DecimalField(decimal_places=0,null=True,blank=True,max_digits=2)
        phone=models.CharField(max_length=13,null=True,blank=True)
        pax_name=models.CharField(max_length=30)
        care_of=models.CharField(max_length=30,null=True,blank=True)
        booked_on=models.DateField()
        depature_date=models.DateField(null=True,blank=True)
        pnr=models.CharField(max_length=7,null=True,blank=True)
        depature_time=models.TimeField(null=True,blank=True)
        depature_port=models.ForeignKey(Airport,on_delete=models.CASCADE,null=True,blank=True,)
        arrival_port=models.ForeignKey(Airport,on_delete=models.CASCADE,null=True,blank=True,related_name='arrival')
        airline=models.ForeignKey(Airline,on_delete=models.CASCADE,null=True,blank=True)
        agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
        paid=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
        net_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
        gross_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
        notes=models.TextField(max_length=250,null=True,blank=True)
        transaction=models.OneToOneField(AccountTransation, on_delete=models.CASCADE,null=True,blank=True)
        def __str__(self):
         return self.pax_name


#visa's

class Applied_visa(models.Model):
    id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
    owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
    created_on=models.DateTimeField(auto_now_add=True)
    updated_on=models.DateTimeField(auto_now=True)
    applicant_name=models.CharField(max_length=30)
    pass_issue=models.DateField(null=True,blank=True)
    pass_expiry=models.DateField(null=True,blank=True)
    care_of=models.CharField(max_length=30,null=True,blank=True)
    dob=models.DateField(null=True,blank=True)
    remitted_date=models.DateField(blank=True,null=True)
    country=CountryField()
    pass_number=models.CharField(max_length=10,null=True,blank=True)
    phone=models.CharField(max_length=13,null=True,blank=True)
    agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
    visa_type=models.CharField(max_length=15)
    visa_mode=models.CharField(max_length=15)
    paid=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
    net_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
    gross_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
    notes=models.TextField(max_length=250,null=True,blank=True)
    transaction=models.OneToOneField(AccountTransation, on_delete=models.CASCADE,null=True,blank=True)
    def __str__(self):
         return self.applicant_name


# Attastations
class Attastation(models.Model):
     id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
     owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
     created_on=models.DateTimeField(auto_now_add=True)
     updated_on=models.DateTimeField(auto_now=True)
     pass_number=models.CharField(max_length=10,null=True,blank=True)
     applicant_name=models.CharField(max_length=20)
     phone=models.CharField(max_length=13,null=True,blank=True)
     care_of=models.CharField(max_length=30,null=True,blank=True)
     certificate=models.CharField(max_length=30,null=True,blank=True)
     agency=models.ForeignKey(Agency,on_delete=models.CASCADE,blank=True,null=True)
     transaction=models.OneToOneField(AccountTransation, on_delete=models.CASCADE,null=True,blank=True)
     remitted_date=models.DateField(blank=True,null=True)
     paid=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
     net_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
     gross_amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
     country=CountryField()

     dob=models.DateField(null=True,blank=True)

     notes=models.TextField(max_length=250,null=True,blank=True)
     def __str__(self):
         return self.applicant_name



#abstractd passport details will store here
class AbstractedPassport(models.Model):
    id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
    owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
    given_name=models.CharField(max_length=25,null=True,blank=True)
    surname=models.CharField(max_length=20,null=True,blank=True)
    pass_number=models.CharField(max_length=10,null=True,blank=True)
    dob=models.DateField(blank=True,null=True)
    pass_issue=models.DateField(blank=True,null=True)
    pass_expiry=models.DateField(blank=True,null=True)
    issue_place=models.CharField(max_length=10,null=True,blank=True)
    sex=models.CharField(max_length=5,null=True,blank=True)


class   TicketOnSale(models.Model):
    id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
    owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
    depature_port=models.ForeignKey(Airport,on_delete=models.CASCADE,null=True,blank=True,related_name='depature')
    arrival_port=models.ForeignKey(Airport,on_delete=models.CASCADE,null=True,blank=True,)
    created_on=models.DateTimeField(auto_now_add=True)
    date=models.DateField(blank=True,null=True)
    depature_time=models.TimeField(blank=True,null=True)
    arrival_time=models.TimeField(blank=True,null=True)
    airline=models.ForeignKey(Airline,on_delete=models.CASCADE,null=True,blank=True)
    amount=models.DecimalField(decimal_places=2,max_digits=8,null=True,blank=True)
    seats=models.DecimalField(decimal_places=0,max_digits=3,null=True,blank=True)
    cabin_baggage=models.DecimalField(decimal_places=0,max_digits=3,null=True,blank=True)
    checkin_baggage=models.DecimalField(decimal_places=0,max_digits=3,null=True,blank=True)
    stops=models.DecimalField(decimal_places=0,max_digits=1,null=True,blank=True)
    phone=models.CharField(max_length=13,null=True,blank=True)
    flight_number=models.CharField(max_length=13,null=True,blank=True)
    mail=models.EmailField(null=True,blank=True)

    


class TicketRequest(models.Model):
    id=models.UUIDField(default= uuid.uuid4,unique=True, primary_key=True,editable=False)
    owner=models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)
    applicant_name=models.CharField(max_length=20)
    
    depature_port=models.ForeignKey(Airport,on_delete=models.CASCADE,null=True,blank=True,related_name='depaturePort')
    arrival_port=models.ForeignKey(Airport,on_delete=models.CASCADE,null=True,blank=True,)
    created_on=models.DateTimeField(auto_now_add=True)
    from_date=models.DateField(blank=True,null=True)
    to_date=models.DateField(blank=True,null=True)
    phone=models.CharField(max_length=13,null=True,blank=True)
    seats=models.DecimalField(decimal_places=0,max_digits=3,null=True,blank=True)
    pass_number=models.CharField(max_length=10,null=True,blank=True)





    
    




        


       


        


from rest_framework import serializers,pagination
from .models import NewUser,Appoinment,Attastation,AccountTransation,TicketRequest,Agency,Airline,Airport,Issued_ticket,Applied_visa,TicketOnSale
from django_countries import countries
from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin


class CreateUserSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={"input__type":"password"},write_only=True)
    class Meta:
        model=NewUser
        fields=['email','agency_name','is_staff','is_admin','branch','password','password2']
        extra_kwargs={
            'password':{'write_only':True}
        
        }
    def save(self):
        user=NewUser(email=self.validated_data['email'],agency_name=self.validated_data['agency_name'],branch=self.validated_data['branch'],is_admin=True,is_staff=True)
        password=self.validated_data['password']    
        password2=self.validated_data['password2']   
        if password!=password2:
            raise serializers.ValidationError({'password':'password must be same'})
        user.set_password(password)
        user.save()
        return user
    


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model=Airport
        fields='__all__'    
class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model=Airline
        fields=['id','airline_name']    
class AppoinmentSerializer(serializers.ModelSerializer):


    class Meta:
        model=Appoinment
               
        exclude=['owner','transaction']

class AccountTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=AccountTransation
        exclude=['owner','id']


class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        
        model=Agency  
        exclude=['owner']      

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=['agency_name','branch','image']
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=['agency_name','branch','image','address',"state","district","pincode"]

class TicketSerializer(serializers.ModelSerializer):
   

    class Meta:
        model=  Issued_ticket
        exclude=['owner']      
class GetTicketSerializer(serializers.ModelSerializer):
    depature_port=AirportSerializer()
    arrival_port=AirportSerializer()
    airline=AirlineSerializer()
    agency=AgencySerializer()

    class Meta:
        model=  Issued_ticket
        exclude=['owner','transaction']    
class GetTicketRequestSerializer(serializers.ModelSerializer):
    depature_port=AirportSerializer()
    arrival_port=AirportSerializer()
   

    class Meta:
        model=  TicketRequest
        exclude=['owner']    
class GetAgencytSerializer(serializers.ModelSerializer):
    class Meta:
        model=  Agency
        exclude=['owner']    


class GetTicketOnSaleSerializer(serializers.ModelSerializer):
    depature_port=AirportSerializer()
    arrival_port=AirportSerializer()
    airline=AirlineSerializer()
    owner=UserSerializer()

    class Meta:
        model=  TicketOnSale
        fields='__all__'    
class GetTransactionsSerializer(serializers.ModelSerializer):
    
    agency=AgencySerializer()

    class Meta:
        model=  AccountTransation
        exclude=['owner',]    
          
class GetVisaSerializer(serializers.ModelSerializer):
    country=CountryField(country_dict=True)
    agency=AgencySerializer()
    

    class Meta:
        model=  Applied_visa
        exclude=['owner',]      


class GetAttastaionSerializer(serializers.ModelSerializer):
    country=CountryField(country_dict=True)
    agency=AgencySerializer()
    

    class Meta:
        model=  Attastation
        exclude=['owner','transaction',]      
class VisaSerializer(serializers.ModelSerializer):

    class Meta:
        model=  Applied_visa
        exclude=['owner']      
class SellTicketSerializer(serializers.ModelSerializer):

    class Meta:
        model=  TicketOnSale
        exclude=['owner']      
class TicketRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model=  TicketRequest
        exclude=['owner']      
class AttastationtSerializer(serializers.ModelSerializer):

    class Meta:
        model=  Attastation
        exclude=['owner',]      
class CreateAgecnySerializer(serializers.ModelSerializer):
    image=serializers.ImageField(required=False)

    class Meta:
        model=  Agency
        exclude=['owner']      

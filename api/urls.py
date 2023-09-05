from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,)
from .views import MyTokenObtainPairView
urlpatterns = [
    path('',views.getroutes,name="get routes"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-user/', views.createUser, name='create_user'),
    path('create-appoinment/', views.createAppoinment, name='create_appoinment'),
    path('create-agency/', views.createAgency, name='create_agency'),
   

    path('ticket/', views.ticket, name='ticket'),
    path('visa/', views.createVisa, name='visa  '),
    path('profile/', views.profile, name='profile  '),
    path('attastation/', views.addAttastation, name='attastation'),
    path('ticken-on-sale/', views.createTicketOnSale, name='ticken-on-sale'),
    path('ticket-request/', views.createTicketRequest, name='ticken-request'),
    path('get-ticket-requests/', views.getTicketRequests, name='ticken-request'),
    path('transaction/', views.createTransaction, name='transaction'),
    path('get-agencies/',views.getAgencies,name='get_agencies'),
    path('get-appoinments/',views.getAppoinments,name='get_appoinments'),
    path('get-tickets/',views.getTickets,name='get_tickets'),
    path('get-ticket-on-sales/',views.getTicketOnSales,name='get_ticket_on_sales'),
    path('get-my-ticket-on-sales/',views.getMyTicketOnSales,name='get_my_ticket_on_sales'),
    path('get-visas/',views.getVisas,name='get_visas'),
    path('get-attastations/',views.getAttastations,name='get_attastations'),
    path('get-attastation/<str:pk>/',views.attastation,name='attastation'),
    path('appoinment/<str:pk>/',views.appoinment,name='appoinment'), 
    path('transaction/<str:pk>/',views.transaction,name='transaction'), 
    path('depature/<str:pk>/',views.depature,name='depature'),
    path('ticket-request/<str:pk>/',views.ticketRequest,name='depature'),
    path('get-ticket-on-sale/<str:pk>/',views.ticketOnSale,name='get_ticket_on_sale'),
    path('get-transactions/<str:pk>/',views.getTransactions,name='depature'),
    path('final-amount/<str:pk>/',views.getFinalAmount,name='final_amount'),
    path('visa/<str:pk>/',views.visa,name='visa'),
    path('agency/<str:pk>/',views.agency,name='agency'),
    path('alter-seats/<str:pk>/',views.alterSeats,name='alter_seats'),
   
    path('sample/',views.sample,name='sample'),
    

]

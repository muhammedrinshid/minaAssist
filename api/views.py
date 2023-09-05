from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serailizers import CreateUserSerializer,AirlineSerializer, AppoinmentSerializer,ProfileSerializer, GetAgencytSerializer, GetTicketRequestSerializer, GetTicketOnSaleSerializer, GetTransactionsSerializer, CreateAgecnySerializer, GetAttastaionSerializer, GetVisaSerializer, GetTicketSerializer, AttastationtSerializer, TicketRequestSerializer, SellTicketSerializer, AccountTransactionSerializer, VisaSerializer, AgencySerializer, TicketSerializer
from rest_framework import status
from django_countries import countries
from .models import Agency,NewUser, Airline, Airport, TicketOnSale, TicketRequest, Appoinment, Issued_ticket, Applied_visa, Attastation, AccountTransation
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum
import datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['agency'] = user.agency_name
        token['branch'] = user.branch
        token['staff_name'] = user.staff_name
        try:
          token['image'] = user.image.url 
        except:
            token['image'] = None
        token['address'] = user.address
        token['district'] = user.district
        token['state'] = user.state
        token['pincode'] = user.pincode
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getroutes(req):

    return Response("congragilations")


@api_view(["POST"])
def createUser(req):
    serializer = CreateUserSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET","PUT"])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method=="GET":
        userProfile=NewUser.objects.get(id=request.user.id)
        serialized=ProfileSerializer(userProfile)
        return Response(serialized.data)
    elif request.method=="PUT":
        userProfile=NewUser.objects.get(id=request.user.id)
        serialized=ProfileSerializer(instance=userProfile,data=request.data,partial=True)
        if serialized.is_valid():
            try:
                serialized.save(image=request.FILES["image"])
            except:
                serialized.save()           
            return Response(serialized.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serialized.errors,status=status.HTTP_304_NOT_MODIFIED)






@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createAppoinment(request):
    serializer = AccountTransactionSerializer(data=request.data)
    if serializer.is_valid():
        transation = serializer.save(owner=request.user)
        appoinmentSerialized = AppoinmentSerializer(data=request.data)
        if appoinmentSerialized.is_valid():
            appoinmentSerialized.save(
                owner=request.user, transaction=transation)
            return Response(appoinmentSerialized.data, status=status.HTTP_201_CREATED)

    else:
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createAgency(request):
    serialized = CreateAgecnySerializer(data=request.POST)

    if serialized.is_valid():
        try:
            serialized.save(
                owner=request.user,

                image=request.FILES["image"])
        except:
            serialized.save(
                owner=request.user,

            )

        return Response(serialized.data, status=status.HTTP_201_CREATED)

    else:
        return Response(serialized.errors, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ticket(request):
    if request.method == "POST":
        transactionSerialized = AccountTransactionSerializer(data=request.data)
        if transactionSerialized.is_valid():
            transaction = transactionSerialized.save(owner=request.user)
            ticketserialized = TicketSerializer(data=request.data)
            if ticketserialized.is_valid():
                ticketserialized.save(owner=request.user,
                                      transaction=transaction)
                return Response(ticketserialized.data, status=status.HTTP_201_CREATED)

            else:
                return Response(ticketserialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

        else:
            return Response(transactionSerialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createVisa(request):
    if request.method == "POST":
        transactionSerialized = AccountTransactionSerializer(data=request.data)
        if transactionSerialized.is_valid():
            transaction = transactionSerialized.save(owner=request.user)

            visa_serialized = VisaSerializer(data=request.data)
            if visa_serialized.is_valid():
                visa_serialized.save(owner=request.user,
                                     transaction=transaction)
                return Response(visa_serialized.data, status=status.HTTP_201_CREATED)

            else:
                return Response(visa_serialized.errors)

        else:
            return Response(transactionSerialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTicketOnSale(request):
    if request.method == "POST":

        ticket_on_sale_erialized = SellTicketSerializer(data=request.data)
        if ticket_on_sale_erialized.is_valid():
            ticket_on_sale_erialized.save(owner=request.user)
            return Response(ticket_on_sale_erialized.data, status=status.HTTP_201_CREATED)

        else:
            return Response(ticket_on_sale_erialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTicketRequest(request):
    if request.method == "POST":

        ticket_request_erialized = TicketRequestSerializer(data=request.data)
        if ticket_request_erialized.is_valid():
            ticket_request_erialized.save(owner=request.user)
            return Response(ticket_request_erialized.data, status=status.HTTP_201_CREATED)

        else:
            return Response(ticket_request_erialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addAttastation(request):
    if request.method == "POST":
        transactionSerialized = AccountTransactionSerializer(data=request.data)
        if transactionSerialized.is_valid():
            transaction = transactionSerialized.save(
                owner=request.user)
            attastation_serialized = AttastationtSerializer(data=request.data)
            if attastation_serialized.is_valid():
                attastation_serialized.save(
                    owner=request.user, transaction=transaction)
                return Response(attastation_serialized.data, status=status.HTTP_201_CREATED)

            else:
                return Response(attastation_serialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(transactionSerialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTransaction(request):
    if request.method == "POST":
        transactionSerialized = AccountTransactionSerializer(data=request.data)
        if transactionSerialized.is_valid():
            transactionSerialized.save(owner=request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(transactionSerialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTransactions(request, pk):
    parms = request.GET.dict()
    paginator = PageNumberPagination()
    paginator.page_size = 80
    q = parms["q"]

    if(parms["from"] == '' or parms["to"] == ''):
        transactions = AccountTransation.objects.filter(Q(agency=pk) &
                                                        (Q(title__contains=q) | Q(bill_no__contains=q))).order_by('-transaction_date')

    else:

        transactions = AccountTransation.objects.filter(Q(agency=pk) &
                                                        Q(transaction_date__range=[parms["from"], parms["to"]]) &
                                                        (Q(title__contains=q) | Q(bill_no__contains=q))).order_by('-transaction_date')
    result_page = paginator.paginate_queryset(transactions, request)
    serialized = GetTransactionsSerializer(result_page, many=True)
    return paginator.get_paginated_response(serialized.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFinalAmount(request, pk):
    credits = AccountTransation.objects.filter(Q(agency=pk) & Q(
        debit_or_credit=True)).aggregate(Sum('net_amount')) or 0
    debits = AccountTransation.objects.filter(Q(agency=pk) & Q(
        debit_or_credit=False)).aggregate(Sum('net_amount')) or 0
    result = dict()
    result["credit_final"] = credits['net_amount__sum']
    result["debit_final"] = debits['net_amount__sum']

    return Response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAgencies(request):
    agencies = Agency.objects.filter(owner=request.user)
    serializer = AgencySerializer(agencies, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAppoinments(request):
    parms = request.GET.dict()
    q = parms["q"]
    paginator = PageNumberPagination()
    paginator.page_size = 50

    if "order" in parms.keys():
        order = parms['order']
        if order == 'true':
            appoinments = Appoinment.objects.filter(Q(owner=request.user)
                                                    & Q(appoinment_date__range=[parms["from"], parms["to"]])
                                                    & (Q(applicant_name__contains=q)
                                                       | Q(care_of__contains=q)
                                                       | Q(office__contains=q))).order_by('-appoinment_date')
        else:
            appoinments = Appoinment.objects.filter(Q(owner=request.user)
                                                    & Q(submission_date__range=[parms["from"], parms["to"]])
                                                    & (Q(applicant_name__contains=q)
                                                       | Q(care_of__contains=q)
                                                       | Q(office__contains=q))).order_by('-submission_date')
    else:
        appoinments = Appoinment.objects.filter(Q(owner=request.user)
                                                & Q(appoinment_date__range=[parms["from"], parms["to"]])
                                                & (Q(applicant_name__contains=q)
                                                   | Q(care_of__contains=q)
                                                   | Q(office__contains=q))).order_by('-appoinment_date')

    result_page = paginator.paginate_queryset(appoinments, request)

    serialized = AppoinmentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serialized.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTicketRequests(request):
    delfrom = datetime.date(1900, 1, 1)
    delto = datetime.date.today()
    TicketRequest.objects.filter(
        from_date__range=[delfrom, delto], owner=request.user).delete()
    parms = request.GET.dict()
    q = parms["q"]
    tickets = TicketRequest.objects.filter(Q(owner=request.user)
                                           & (Q(applicant_name__contains=q)
                                              | Q(depature_port__airport_code__contains=q)
                                              | Q(arrival_port__airport_code__contains=q))).order_by('from_date')
    serialized = GetTicketRequestSerializer(tickets, many=True)
    return Response(serialized.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def ticketRequest(request, pk):
    if request.method == "GET":
        ticketrequest = TicketRequest.objects.get(id=pk)
        serialized = GetTicketRequestSerializer(ticketrequest, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":
        ticketrequest = TicketRequest.objects.get(id=pk)
        serialized = (TicketRequestSerializer(
            instance=ticketrequest, data=request.data, partial=True))
        if serialized.is_valid():
            serialized.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
    elif request.method == "DELETE":

        try:
            ticketrequest = TicketRequest.objects.get(id=pk)
            ticketrequest.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVisas(request):
    paginator = PageNumberPagination()
    paginator.page_size = 50

    parms = request.GET.dict()
    mode = ''
    q = parms["q"]

    if(parms['type'] == "true"):
        mode = "stambing"
    else:
        mode = 'evisa'

    visas = Applied_visa.objects.filter(Q(owner=request.user)
                                        & Q(visa_mode=mode)
                                        & Q(remitted_date__range=[parms["from"], parms["to"]])
                                        & (Q(applicant_name__contains=q)
                                           | Q(care_of__contains=q)
                                           | Q(agency__name__contains=q))).order_by('-remitted_date')
    result_page = paginator.paginate_queryset(visas, request)
    serialized = GetVisaSerializer(result_page, many=True)
    return paginator.get_paginated_response(serialized.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAttastations(request):
    paginator = PageNumberPagination()
    paginator.page_size = 50

    parms = request.GET.dict()
    q = parms["q"]

    visas = Attastation.objects.filter(Q(owner=request.user)
                                       & Q(remitted_date__range=[parms["from"], parms["to"]])
                                       & (Q(applicant_name__contains=q)
                                          | Q(care_of__contains=q)
                                          | Q(agency__name__contains=q))).order_by('-remitted_date')
    result_page = paginator.paginate_queryset(visas, request)
    serialized = GetAttastaionSerializer(result_page, many=True)
    return paginator.get_paginated_response(serialized.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyTicketOnSales(request):
    flights = TicketOnSale.objects.filter(
        owner=request.user).order_by('-created_on')
    seriaized = GetTicketOnSaleSerializer(flights, many=True)
    return Response(seriaized.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def alterSeats(request, pk):
    flight = TicketOnSale.objects.get(id=pk)
    if request.user == flight.owner:
        serialized = SellTicketSerializer(
            flight, data=request.data, partial=True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data["seats"], status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialized.errors)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTicketOnSales(request):
    delfrom = datetime.date(1900, 1, 1)
    delto = datetime.date.today()
    TicketOnSale.objects.filter(date__range=[delfrom, delto]).delete()

    parms = request.GET.dict()
    origin = parms["origin"]
    destination = parms["destination"]
    date = parms["date"]
    if(date == '' and destination == '' and origin == ''):
        flights = TicketOnSale.objects.all().order_by("-created_on")
    elif(date == '' and destination != '' and origin != ''):
        flights = TicketOnSale.objects.filter(
            depature_port=origin, arrival_port=destination).order_by('-date')
    elif(date != '' and destination == '' and origin != ''):
        flights = TicketOnSale.objects.filter(
            depature_port=origin, date=date).order_by('-depature_time')

    elif(date != '' and destination != '' and origin == ''):
        flights = TicketOnSale.objects.filter(
            date=date, arrival_port=destination).order_by('-depature_time')

    elif(date == '' and destination != '' and origin == ''):
        flights = TicketOnSale.objects.filter(
            arrival_port=destination).order_by('-date')

    elif(date != '' and destination == '' and origin == ''):
        flights = TicketOnSale.objects.filter(
            date=date).order_by('-depature_time')

    elif(date == '' and destination == '' and origin != ''):
        flights = TicketOnSale.objects.filter(
            depature_port=origin).order_by('-date')

    else:
        flights = TicketOnSale.objects.filter(
            depature_port=origin, arrival_port=destination, date=date).order_by('-depature_time')

    serialized = GetTicketOnSaleSerializer(flights, many=True)
    return Response(serialized.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def appoinment(request, pk):
    if request.method == "GET":
        appoinment = Appoinment.objects.get(id=pk)
        serialized = AppoinmentSerializer(appoinment, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":
        appoinment = Appoinment.objects.get(id=pk)
        serialized = AppoinmentSerializer(
            appoinment, data=request.data, partial=True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
    elif request.method == "DELETE":
        appoinment = Appoinment.objects.get(id=pk)
        appoinment.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def ticketOnSale(request, pk):
    if request.method == "GET":
        ticket = TicketOnSale.objects.get(id=pk)
        serialized = GetTicketOnSaleSerializer(ticket, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":
        ticket = TicketOnSale.objects.get(id=pk)
        if ticket.owner == request.user:
            serialized = SellTicketSerializer(
                instance=ticket, data=request.data, partial=True)
            if serialized.is_valid():
                serialized.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                print(serialized.errors)
                return Response(status=status.HTTP_304_NOT_MODIFIED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == "DELETE":
        ticket = TicketOnSale.objects.get(id=pk)
        if request.user == ticket.owner:
            ticket.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def transaction(request, pk):
    if request.method == "GET":
        transaction = AccountTransation.objects.get(id=pk)
        serialized = GetTransactionsSerializer(transaction, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":
        transaction = AccountTransation.objects.get(id=pk)
        if request.data["debit_or_credit"] == False:
            data = dict()
            data = request.data
            del data['id']
            del data['created_on']
            del data['notes']
            transaction_serialized = AccountTransactionSerializer(
                transaction, data=request.data, partial=True)
            if transaction_serialized.is_valid():
                try:
                    ticket = Issued_ticket.objects.get(
                        id=transaction.issued_ticket.id)
                    serialized = TicketSerializer(
                        ticket, data=data, partial=True)
                    if serialized.is_valid():
                        serialized.save()
                        transaction_serialized.save()
                        return Response(status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_304_NOT_MODIFIED)
                except:
                    try:
                        visa = Applied_visa.objects.get(
                            id=transaction.applied_visa.id)
                        serialized = VisaSerializer(
                            visa, data=data, partial=True)
                        if serialized.is_valid():
                            serialized.save()
                            transaction_serialized.save()
                            return Response(status=status.HTTP_201_CREATED)
                        else:
                            return Response(status=status.HTTP_304_NOT_MODIFIED)
                    except:
                        try:
                            attastation = Attastation.objects.get(
                                id=transaction.attastation.id)
                            serialized = AttastationtSerializer(
                                attastation, data=data, partial=True)
                            if serialized.is_valid():
                                serialized.save()
                                transaction_serialized.save()
                                return Response(status=status.HTTP_201_CREATED)
                            else:
                                return Response(status=status.HTTP_304_NOT_MODIFIED)
                        except:
                            return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_304_NOT_MODIFIED)
        else:
            transaction_serialized = AccountTransactionSerializer(
                transaction, data=request.data, partial=True)
            if transaction_serialized.is_valid():
                transaction_serialized.save()
                return Response(status=status.HTTP_201_CREATED)
    elif request.method == "DELETE":

        try:
            transaction = AccountTransation.objects.get(id=pk)
            transaction.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def depature(request, pk):
    if request.method == "GET":
        depature = Issued_ticket.objects.get(id=pk)
        serialized = GetTicketSerializer(depature, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":

        depature = Issued_ticket.objects.get(id=pk)
        if request.user == depature.owner:
            transaction = AccountTransation.objects.get(
                id=depature.transaction.id)
            transaction_serialized = AccountTransactionSerializer(
                transaction, data=request.data, partial=True)
            if transaction_serialized.is_valid():
                serialized = TicketSerializer(
                    depature, data=request.data, partial=True)
                if serialized.is_valid():
                    serialized.save()
                    transaction_serialized.save()
                    return Response(request.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serialized.errors)
            else:
                return Response(serialized.errors)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == "DELETE":
        ticket = Issued_ticket.objects.get(id=pk)
        try:
            transaction = AccountTransation.objects.get(
                id=ticket.transaction.id)
            transaction.delete()
            ticket.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def visa(request, pk):

    if request.method == "GET":
        data = Applied_visa.objects.get(id=pk)
        serialized = GetVisaSerializer(data, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":
        visa = Applied_visa.objects.get(id=pk)
        if request.user == visa.owner:
            transaction = AccountTransation.objects.get(id=visa.transaction.id)
            transaction_serializer = AccountTransactionSerializer(
                transaction, data=request.data, partial=True)
            if transaction_serializer.is_valid():
                serialized = VisaSerializer(
                    visa, data=request.data, partial=True)
                if serialized.is_valid():
                    serialized.save()
                    transaction_serializer.save()
                    return Response(serialized.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serialized.errors)
            else:
                return Response(transaction_serializer.errors)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == "DELETE":
        visa = Applied_visa.objects.get(id=pk)
        try:
            transaction = AccountTransation.objects.get(id=visa.transaction.id)
            transaction.delete()
            visa.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def agency(request, pk):
    if request.method == "GET":
        data = Agency.objects.get(id=pk)
        serialized = GetAgencytSerializer(data, many=False)
        print(serialized.data   )
        
        return Response(serialized.data)
    elif request.method == "PUT":
        data = Agency.objects.get(id=pk)
        if request.user == data.owner:
            serialized = AgencySerializer(instance=data, data=request.data)
            if serialized.is_valid():

                try:
                    serialized.save(image=request.FILES["image"])
                except:
                    serialized.save()
                return Response(status=status.HTTP_201_CREATED)
            print(serialized.errors)
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    elif request.method=="DELETE":
        data=Agency.objects.get(id=pk)
        if data.owner==request.user:
            data.delete()
            return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def attastation(request, pk):

    if request.method == "GET":
        data = Attastation.objects.get(id=pk)
        serialized = GetAttastaionSerializer(data, many=False)
        return Response(serialized.data)
    elif request.method == "PUT":
        data = Attastation.objects.get(id=pk)
        transaction = AccountTransation.objects.get(id=data.transaction.id)
        transaction_serialized = AccountTransactionSerializer(
            transaction, data=request.data, partial=True)
        if request.user == data.owner:
            if transaction_serialized.is_valid():
                serialized = AttastationtSerializer(
                    data, data=request.data, partial=True)
                if serialized.is_valid():
                    serialized.save()
                    transaction_serialized.save()
                    return Response(serialized.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serialized.errors)
            else:
                return Response(serialized.errors)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == "DELETE":
        attastation = Attastation.objects.get(id=pk)
        try:
            transaction = AccountTransation.objects.get(
                id=attastation.transaction.id)
            transaction.delete()
            attastation.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['GET'])
def getTickets(request):
    parms = request.GET.dict()
    q = parms["q"]
    paginator = PageNumberPagination()
    paginator.page_size = 50

    if "order" in parms.keys():
        if(parms["order"] == 'true'):
            tickets = Issued_ticket.objects.filter(Q(owner=request.user)
                                                   & Q(booked_on__range=[parms["from"], parms["to"]])
                                                   & (Q(pax_name__contains=q)
                                                      | Q(care_of__contains=q)
                                                      | Q(airline__airline_name__contains=q))).order_by('-booked_on')
        else:
            tickets = Issued_ticket.objects.filter(Q(owner=request.user)
                                                   & Q(depature_date__range=[parms["from"], parms["to"]]) & (
                Q(pax_name__contains=q)
                | Q(care_of__contains=q)
                | Q(airline__airline_name__contains=q))).order_by('depature_date')

    else:
        tickets = Issued_ticket.objects.filter(Q(owner=request.user)
                                               & Q(depature_date__range=[parms["from"], parms["to"]]) & (
            Q(pax_name__contains=q)
            | Q(care_of__contains=q)
            | Q(airline__airline_name__contains=q))).order_by('depature_date')

    resul_page = paginator.paginate_queryset(tickets, request)
    serialized = GetTicketSerializer(resul_page, many=True)
    return paginator.get_paginated_response(serialized.data)


@api_view(["GET"])
def sample(req):
    tickets = Airline.objects.all()
    serializer = AirlineSerializer(tickets, many=True)
    return Response(serializer.data)

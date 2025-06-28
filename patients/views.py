from rest_framework import viewsets
from .serializers import PatientSerializer, TreatmentRecordSerializer
from django.utils.timezone import now
from .models import Patient, Appointment, TreatmentRecord
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AppointmentSerializer 



class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class TreatmentRecordViewSet(viewsets.ModelViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = TreatmentRecordSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

@api_view(['GET'])
def dashboard_data(request):
    total_patients = Patient.objects.count()
    total_appointments = Appointment.objects.count()
    total_treatments = TreatmentRecord.objects.count()
    upcoming_appointments = Appointment.objects.filter(appointment_date__gte=now()).count()

    data = {
        "total_patients": total_patients,
        "total_appointments": total_appointments,
        "upcoming_appointments": upcoming_appointments,
        "total_treatments": total_treatments,
    }

    return Response(data)



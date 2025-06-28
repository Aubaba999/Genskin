from rest_framework import serializers
from .models import Patient, TreatmentRecord
from .models import Appointment

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class TreatmentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentRecord
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
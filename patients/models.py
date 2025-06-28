from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    diagnosis = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TreatmentRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='treatments')
    visit_date = models.DateField()
    diagnosis = models.TextField()
    medication = models.CharField(max_length=200)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.name} - {self.visit_date}"
    
class Appointment(models.Model):
    patient = models.ForeignKey('patients.Patient', on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], default='scheduled')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.name} - {self.appointment_date.strftime('%Y-%m-%d %H:%M')}"


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, TreatmentRecordViewSet, AppointmentViewSet
from .views import dashboard_data


router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'records', TreatmentRecordViewSet)
router.register(r'appointments', AppointmentViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard_data),

]

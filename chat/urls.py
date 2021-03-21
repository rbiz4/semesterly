# chat/urls.py
from django.conf.urls import url
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.views.generic.base import RedirectView

import timetable.views
from helpers.mixins import FeatureFlowView

from . import views

urlpatterns = [
    url(r'^chat/*$', RedirectView.as_view(url="/")),
]
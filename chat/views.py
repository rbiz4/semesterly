# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# chat/views.py
from django.shortcuts import render

def index(request):
    return render(request, 'chat/index.html')

# Create your views here.

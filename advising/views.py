from __future__ import unicode_literals
# -*- coding: utf-8 -*-

# Copyright (C) 2017 Semester.ly Technologies, LLC
#
# Semester.ly is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Semester.ly is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.


import semesterly.views

# currently unused. TODO: add get_feature_flow()

#feature_name = 'ADVISING'

from django.shortcuts import get_object_or_404, render, redirect
from helpers.mixins import ValidateSubdomainMixin, RedirectToSignupMixin
from student.models import Student
from student.utils import get_student
from timetable.models import Timetable, Course, Section, Semester
from forum.models import Transcript, Comment
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from forum.serializers import TranscriptSerializer, CommentSerializer
from django.db import transaction


class InvitedForumView(ValidateSubdomainMixin, RedirectToSignupMixin, APIView):
    """ Handles the accessing of invited user forum transcripts. """

    def get(self, request):
        """
        Returns all invited transcripts for the user making the request:
            invited_transcripts: Array of transcripts the user has been added to.
        """
        student = Student.objects.get(user=request.user)
        return Response(
            {'invited_transcripts': TranscriptSerializer(
                student.invited_transcripts, many=True).data},
            status=status.HTTP_200_OK)


class InvitedForumTranscriptView(ValidateSubdomainMixin, RedirectToSignupMixin, APIView):
    """ Handles the accessing of individual user forum transcripts. """

    def get(self, request, sem_name, year):
        """
        Returns the forum transcript associated with a particular semester
        for the user making the request:
            transcript: The retrieved transcript
        """

        student = Student.objects.get(user=request.user)
        semester = Semester.objects.get(name=sem_name, year=year)
        transcript = get_object_or_404(
            Transcript, owner=request.data['owner'], semester=semester)
        if transcript not in student.invited_transcripts.all():
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response({'transcript': TranscriptSerializer(transcript).data},
                        status=status.HTTP_200_OK)

    def post(self, request, sem_name, year):
        """Creates a new comment.
        Required data:
            content: The comment's message.
            timestamp: The time it was sent.
            jhed: The jhed of the owner of the transcript.
        """

        student = Student.objects.get(user=request.user)
        semester = Semester.objects.get(name=sem_name, year=year)
        transcript = get_object_or_404(
            Transcript,
            owner=Student.objects.get(jhed=request.data['jhed']),
            semester=semester)

        if student not in transcript.advisors.all():
            return Response(status=status.HTTP_403_FORBIDDEN)

        comment = Comment.objects.create(author=student,
                                         content=request.data['content'],
                                         timestamp=request.data['timestamp'],
                                         transcript=transcript)
        comment.save()

        return Response(status=status.HTTP_201_CREATED)


class InvitedTimetableView(ValidateSubdomainMixin, RedirectToSignupMixin, APIView):
    """ Handles the accessing of invited user timetables. """
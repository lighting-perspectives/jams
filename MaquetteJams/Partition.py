#!/usr/bin/env python
# coding: utf-8

import Project


class Track():
    def __init__(self):
        self.notes = {i: 0 for i in range(Project.MAX_DIV * Project.DIV)}


class Partition:
    def __init__(self):
        self.tracks = {}
        for nt in range(0, Project.NB_TRACKS):
            track = Track()
            self.tracks[nt] = track

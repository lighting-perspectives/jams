#!/usr/bin/env python
# coding: utf-8

import Draws
from Project import Project

TOP_MARGE = 50
LEFT_MARGE = 50
PAD_WIDTH = 40
PAD_HEIGHT = 40
PAD_SPACE = 5
TRACK_SPACE = 10


class Pad:
    def __init__(self, fenetre, track, bar, timediv):
        self.track = track
        self.bar = bar
        self.timediv = timediv
        x1 = LEFT_MARGE + (bar * 4 + timediv) * (PAD_WIDTH + PAD_SPACE)
        x2 = x1 + PAD_WIDTH
        y1 = TOP_MARGE + track * (PAD_HEIGHT + TRACK_SPACE)
        y2 = y1 + PAD_HEIGHT
        self.interface = Draws.PadRect(fenetre, x1, y1, x2, y2)

    def draw(self, time):
        played = False
        start = (self.bar * 4 + self.timediv) * Project.TEMPO / Project.DIV
        end = start + Project.TEMPO / Project.DIV
        # print(str(start) + " - " + str(time) + " - " + str(end))
        if start <= time < end:
            played = True
        self.interface.draw(played)


class Track:
    def __init__(self, fenetre, num):
        self.num = num
        self.pads = []
        for i in range(0, Project.NB_BARS * Project.DIV):
            bar = i // Project.DIV
            timediv = i - bar * 4
            self.pads.append(Pad(fenetre, self.num, bar, timediv))

    def draw(self, time):
        for p in self.pads:
            p.draw(time)
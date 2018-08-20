#!/usr/bin/env python
# coding: utf-8

import Draws
import Project
import Utils


TOP_MARGE = 120
LEFT_MARGE = 50
PAD_WIDTH = 60
PAD_HEIGHT = 60
PAD_SPACE = 5
TRACK_SPACE = 10


# ****************************************** BUTTON
class Button:
    def __init__(self, func, fenetre, x1, y1, x2, y2, text):
        self.interface = Draws.RectangleText(fenetre, x1, y1, x2, y2, text)
        self.text = text
        self.func = func

    def click(self, mouse_pos):
        x, y = mouse_pos
        if Utils.isIn(x, y, self.interface.x1, self.interface.y1, self.interface.x2, self.interface.y2):
            self.func()

    def draw(self):
        self.interface.draw()


# ****************************************** PAD
class Pad:
    def __init__(self, fenetre, track, bar, timediv, sound):
        self.track = track
        self.bar = bar
        self.timediv = timediv
        if Project.DIV == 8:
            ecart = timediv // 2
        elif Project.DIV == 4:
            ecart = timediv
        else:
            ecart = timediv // 4

        x1 = LEFT_MARGE + (bar * 4 + ecart) * (PAD_WIDTH + PAD_SPACE)

        if Project.DIV == 16 and timediv % 2 == 1:
            x1 += PAD_WIDTH / 2

        y1 = TOP_MARGE + track * (PAD_HEIGHT + TRACK_SPACE)
        if Project.DIV == 8 and timediv % 2 == 1:
            y1 += PAD_HEIGHT / 2

        if Project.DIV == 16 and timediv % 4 > 1:
            y1 += PAD_HEIGHT / 2

        if Project.DIV == 8:
            y2 = y1 + (PAD_HEIGHT * 0.45)
            x2 = x1 + PAD_WIDTH
        elif Project.DIV == 4:
            y2 = y1 + PAD_HEIGHT
            x2 = x1 + PAD_WIDTH
        else:
            y2 = y1 + (PAD_HEIGHT * 0.45)
            x2 = x1 + (PAD_WIDTH * 0.45)

        self.interface = Draws.PadRect(fenetre, x1, y1, x2, y2, track)
        self.triggered = False
        self.sound = sound

    def update(self, time):
        start = (self.bar * Project.DIV + self.timediv) * (60000 / Project.TEMPO) / Project.DIV
        end = start + (60000 / Project.TEMPO) / Project.DIV
        if start <= time < end:
            self.trig(time)
        else:
            self.untrig()

    def play(self):
        self.sound.play()

    def trig(self, time):
        # if not self.triggered and self.state:
        if not self.triggered and Project.partition.tracks[self.track].notes[self.bar * Project.MAX_DIV + (self.timediv * Project.MAX_DIV / Project.DIV)] != 0:
            self.play()
            self.triggered = True

    def untrig(self):
        self.triggered = False

    def draw(self, time):
        played = False
        start = (self.bar * Project.DIV + self.timediv) * (60000 / Project.TEMPO) / Project.DIV
        end = start + (60000 / Project.TEMPO) / Project.DIV
        # print(str(start) + " - " + str(time) + " - " + str(end))
        if start <= time <= end:
            played = True
        self.interface.draw(played, Project.partition.tracks[self.track].notes[self.bar * Project.MAX_DIV + (self.timediv * Project.MAX_DIV / Project.DIV  )] != 0)

    def click(self, mouse_pos):
        x, y = mouse_pos
        if Utils.isIn(x, y, self.interface.x1, self.interface.y1, self.interface.x2, self.interface.y2):
            self.selected()

    def selected(self):
        if Project.partition.tracks[self.track].notes[self.bar * Project.MAX_DIV + (self.timediv * Project.MAX_DIV / Project.DIV)] != 0:
            Project.partition.tracks[self.track].notes[self.bar * Project.MAX_DIV + (self.timediv * Project.MAX_DIV / Project.DIV)] = 0
        else:
            Project.partition.tracks[self.track].notes[self.bar * Project.MAX_DIV + (self.timediv * Project.MAX_DIV / Project.DIV)] = 127
        # print(str(Project.partition.tracks[1].notes))


# ****************************************** TRACK
class Track:
    def __init__(self, fenetre, num, sound):
        self.num = num
        self.pads = []
        self.sound = sound
        self.fenetre = fenetre
        for i in range(0, Project.NB_BARS * Project.DIV):
            bar = i // Project.DIV
            timediv = i - bar * Project.DIV
            self.pads.append(Pad(fenetre, self.num, bar, timediv, sound))

    def reinit(self):
        self.pads = []
        for i in range(0, Project.NB_BARS * Project.DIV):
            bar = i // Project.DIV
            timediv = i - bar * Project.DIV
            self.pads.append(Pad(self.fenetre, self.num, bar, timediv, self.sound))

    def draw(self, time):
        for p in self.pads:
            p.draw(time)

    def update(self, time):
        for p in self.pads:
            p.update(time)

    def click(self, mouse_pos):
        for p in self.pads:
            p.click(mouse_pos)

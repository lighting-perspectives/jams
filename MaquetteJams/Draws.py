#!/usr/bin/env python
# coding: utf-8

import pygame
import Colours
import math


class Rectangle:
    def __init__(self, fenetre, x1, y1, x2, y2):
        self.fenetre = fenetre
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2

    @property
    def x1(self):
        return self._x1

    @x1.setter
    def x1(self, value):
        if value >= 0:
            self._x1 = value

    @property
    def x2(self):
        return self._x2

    @x2.setter
    def x2(self, value):
        if value >= 0:
            self._x2 = value

    @property
    def y2(self):
        return self._y2

    @y2.setter
    def y2(self, value):
        if value >= 0:
            self._y2 = value

    @property
    def y1(self):
        return self._y1

    @y1.setter
    def y1(self, value):
        if value >= 0:
            self._y1 = value

    def draw(self):
        col = Colours.GENERAL_BUTTON
        pygame.draw.rect(self.fenetre,
                         col,
                         pygame.Rect(self._x1, self._y1, self._x2-self._x1, self._y2-self._y1))


class RectangleText(Rectangle):
    def __init__(self, fenetre, x1, y1, x2, y2, text):
        Rectangle.__init__(self, fenetre, x1, y1, x2, y2)
        self.text = text

    def draw(self):
        Rectangle.draw(self)
        font = pygame.font.SysFont('Comic Sans MS', 16)
        text_surface = font.render(self.text, False, Colours.TEXT)
        self.fenetre.blit(text_surface, (self.x1, self.y1))


class RectangleOfPad(Rectangle):
    def __init__(self, fenetre, x1, y1, x2, y2, track):
        Rectangle.__init__(self, fenetre, x1, y1, x2, y2)
        self.track = track

    def draw(self, played, state):
        col = Colours.PAD_ON[self.track] if played else Colours.PAD_OFF[self.track]
        pygame.draw.rect(self.fenetre,
                         col,
                         pygame.Rect(self._x1, self._y1, self._x2-self._x1, self._y2-self._y1))

        if state:
            pygame.draw.ellipse(self.fenetre,
                                Colours.BACKGROUND,
                                pygame.Rect(self._x1, self._y1, self._x2-self._x1, self._y2-self._y1))


class PadRect(RectangleOfPad):
    def __init__(self, fenetre, x1, y1, x2, y2, track):
        RectangleOfPad.__init__(self, fenetre, x1, y1, x2, y2, track)






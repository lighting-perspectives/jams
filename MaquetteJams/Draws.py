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

    def draw(self, played):
        col = Colours.PAD_ON if played else Colours.PAD_OFF
        pygame.draw.rect(self.fenetre,
                         col,
                         pygame.Rect(self._x1, self._y1, self._x2-self._x1, self._y2-self._y1))

        # font = pygame.font.SysFont('Comic Sans MS', 30)
        # text_surface = font.render('TEST', False, Colours.white)
        # self.fenetre.blit(text_surface, (50, 50))


class PadRect(Rectangle):
    def __init__(self, fenetre, x1, y1, x2, y2):
        Rectangle.__init__(self, fenetre, x1, y1, x2, y2)






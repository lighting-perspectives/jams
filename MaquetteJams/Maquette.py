#!/usr/bin/env python
# coding: utf-8

import pygame, time
from pygame.locals import *
import math
import Draws
import Colours
import Pad
import Project

import Partition

BUTTON_WIDTH = 60
BUTTON_HEIGHT = 40

SOUNDS = ["./sounds/hihat.wav", "./sounds/bd.wav", "./sounds/bd.wav", "./sounds/bd.wav"]


def main():
    maquette = Maquette()
    maquette.run()


class Maquette:
    def __init__(self):
        pygame.mixer.pre_init(44100, -16, 2, 512)
        pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=512)
        pygame.init()
        pygame.font.init()
        self.fenetre = pygame.display.set_mode((1500, 800))
        self.fenetre.fill(Colours.BACKGROUND)
        pygame.display.flip()
        self.clock = pygame.time.Clock()

        Project.partition = Partition.Partition()

        self.tracks = []

        for k, v in Project.partition.tracks.items():
            track = Pad.Track(self.fenetre, k, pygame.mixer.Sound(SOUNDS[k]))
            self.tracks.append(track)

        self.noire_button = Pad.Button(self.noire_selected, self.fenetre,
                                       50, 50, 50 + BUTTON_WIDTH, 50 + BUTTON_HEIGHT, 'noire')
        self.croche_button = Pad.Button(self.croche_selected, self.fenetre,
                                        150, 50, 150 + BUTTON_WIDTH, 50 + BUTTON_HEIGHT, 'croche')
        self.doublecroche_button = Pad.Button(self.doublecroche_selected, self.fenetre,
                                        250, 50, 250 + BUTTON_WIDTH, 50 + BUTTON_HEIGHT, 'double')

        self.moins_tempo_button = Pad.Button(self.moins_tempo, self.fenetre,
                                       350, 50, 350 + BUTTON_WIDTH, 50 + BUTTON_HEIGHT, '<')
        self.plus_tempo_button = Pad.Button(self.plus_tempo, self.fenetre,
                                       450, 50, 450 + BUTTON_WIDTH, 50 + BUTTON_HEIGHT, '>')

        self.buttons = []
        self.buttons.append(self.noire_button)
        self.buttons.append(self.croche_button)
        self.buttons.append(self.doublecroche_button)
        self.buttons.append(self.moins_tempo_button)
        self.buttons.append(self.plus_tempo_button)

    def moins_tempo(self):
        Project.modif_tempo(-2)

    def plus_tempo(self):
        Project.modif_tempo(2)

    def noire_selected(self):
        Project.DIV = 4
        self.reinit_tracks()

    def croche_selected(self):
        Project.DIV = 8
        self.reinit_tracks()

    def doublecroche_selected(self):
        Project.DIV = 16
        self.reinit_tracks()

    def reinit_tracks(self):
        for tr in self.tracks:
            tr.reinit()

    def run(self):
        continuer = 1
        while continuer:
            # msElapsed = self.clock.tick(60)
            for event in pygame.event.get():
                if event.type == QUIT:
                    continuer = 0
                    # if event.type == KEYDOWN:
                    #     if event.key == K_LEFT:
                    #         ship_pos_x -= 0.2 * msElapsed
                    #     if event.key == K_RIGHT:
                    #         ship_pos_x += 0.2 * msElapsed

                if event.type == pygame.MOUSEBUTTONUP:
                    mouse_pos = pygame.mouse.get_pos()
                    for tr in self.tracks:
                        tr.click(mouse_pos)
                    for b in self.buttons:
                        b.click(mouse_pos)

            self.update()
            self.draw()
            pygame.display.flip()

    def draw(self):
        # surface = pygame.display.get_surface()  # get the surface of the current active display
        # x, y = size = surface.get_width(), surface.get_height()  # create an array of surface.width and surface.height
        self.fenetre.fill(Colours.BACKGROUND)

        timemillis = pygame.time.get_ticks()
        time = timemillis % (60000 / Project.TEMPO * Project.NB_BARS)

        # print("time : " + str(time))

        for tr in self.tracks:
            tr.draw(time)

        for b in self.buttons:
            b.draw()

    def update(self):
        timemillis = pygame.time.get_ticks()
        time = timemillis % (60000 / Project.TEMPO * Project.NB_BARS)

        for tr in self.tracks:
            tr.update(time)

if __name__ == '__main__':
    main()

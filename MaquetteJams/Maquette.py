#!/usr/bin/env python
# coding: utf-8

import pygame, time
from pygame.locals import *
import math
import Draws
import Colours
import Pad
from Project import Project


def main():
    maquette = Maquette()
    maquette.run()


class Maquette:
    def __init__(self):
        # pygame.mixer.pre_init(44100, -16, 2, 4096)
        pygame.init()
        pygame.font.init()
        # pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=4096)
        self.fenetre = pygame.display.set_mode((1500, 800))
        self.fenetre.fill(Colours.BACKGROUND)
        pygame.display.flip()
        self.clock = pygame.time.Clock()

        self.tracks = []
        track = Pad.Track(self.fenetre, 0)
        self.tracks.append(track)

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
            self.draw()
            pygame.display.flip()

    def draw(self):

        # surface = pygame.display.get_surface()  # get the surface of the current active display
        # x, y = size = surface.get_width(), surface.get_height()  # create an array of surface.width and surface.height
        self.fenetre.fill(Colours.BACKGROUND)

        timemillis = pygame.time.get_ticks()
        time = timemillis % (Project.TEMPO * Project.NB_BARS)

        # print("time : " + str(time))

        for tr in self.tracks:
            tr.draw(time)


if __name__ == '__main__':
    main()

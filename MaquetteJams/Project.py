#!/usr/bin/env python
# coding: utf-8


# Pulsation par minute
TEMPO = 60
# Division de chaque mesure 4 = 4 noires, 8 = 8 croches...
DIV = 8

NB_BARS = 4
MAX_DIV = 16

NB_TRACKS = 4

partition = None


def modif_tempo(diff):
    global TEMPO
    TEMPO += diff
    if TEMPO > 300:
        TEMPO = 300
    if TEMPO < 30:
        TEMPO  =30




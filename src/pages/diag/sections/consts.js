import React from 'react'
import StateFunc from "./stateFunc/StateFunc";
import Sensmotor from "./sensmotor/Sensmotor";
import Grammatic from "./grammatic/Grammatic";
import Lexis from "./lexis/Lexis";
import CoherentSpeech from "./coherentSpeech/CoherentSpeech";

export const SECTIONS = [
    {tabName: 'Состояние функций', component: <StateFunc />},
    {tabName: 'Сенсо-моторный уровень', component: <Sensmotor />},
    {tabName: 'Грамматика', component: <Grammatic />},
    {tabName: 'Лексика', component: <Lexis />},
    {tabName: 'Связная речь', component: <CoherentSpeech />},
]
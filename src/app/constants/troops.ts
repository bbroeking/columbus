import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from "./resources";
export interface Troop {
    name: string,
    type: string,
    uid: string,
    docid: string,
}

export interface COMBAT_TROOP {
    name: string,
    type: string,
    uid: string,
    docid: string,
    [Attributes.HP]: number,
    [Attributes.ATTACK]: number,
    [Attributes.DEFENSE]: number,
    [Attributes.MINDAMAGE]: number,
    [Attributes.MAXDAMAGE]: number,
    [Attributes.SKEWDAMAGE]: number
}
export interface TROOP_MODEL {
    type: string,
    buildResources: Object,
    baseStats: Stats,
    buildTime: number
}

export interface Stats {
    [Attributes.HP]: number,
    [Attributes.ATTACK]: number,
    [Attributes.DEFENSE]: number,
    [Attributes.MINDAMAGE]: number,
    [Attributes.MAXDAMAGE]: number,
    [Attributes.SKEWDAMAGE]: number
}

export enum Attributes {
    HP = 'HP',
    ATTACK = "Attack",
    DEFENSE = "Defense",
    MINDAMAGE = "MinHit",
    MAXDAMAGE = "MaxHit",
    SKEWDAMAGE = "SkewHit"
}

export const MARINE = 'marine';
export const MARAUDER = 'marauder';

export const TROOPS: {[key: string]: TROOP_MODEL} = {
    [MARINE]: {
        'type': MARINE,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'baseStats': {
            [Attributes.HP]: 20,
            [Attributes.ATTACK]: 5,
            [Attributes.DEFENSE]: 5,
            [Attributes.MINDAMAGE]: 0,
            [Attributes.MAXDAMAGE]: 5,
            [Attributes.SKEWDAMAGE]: 1
        },
        'buildTime': 10000000
    },

    [MARAUDER]: {
        'type': MARAUDER,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'baseStats': {
            [Attributes.HP]: 30,
            [Attributes.ATTACK]: 3,
            [Attributes.DEFENSE]: 7,
            [Attributes.MINDAMAGE]: 0,
            [Attributes.MAXDAMAGE]: 5,
            [Attributes.SKEWDAMAGE]: 1
        },
        'buildTime': 100000000
    },
}

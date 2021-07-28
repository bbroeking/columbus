import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from "./resources";
export interface Troop {
    name: string,
    rank: number,
    type: string,
    uid: string,
    id: string,
    deployed: boolean
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
    buildResources: BuildResources,
    baseStats: Stats,
    buildTime: number
}

export interface BuildResources {
    [MINERALS]: number,
    [ENERGY]: number,
    [RARE_MINERALS]: number,
    [RARE_ENERGY]: number,
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
            [MINERALS]: 200,
            [RARE_MINERALS]: 0,
            [ENERGY]: 10,
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
        'buildTime': 1000
    },

    [MARAUDER]: {
        'type': MARAUDER,
        'buildResources': {
            [MINERALS]: 250,
            [RARE_MINERALS]: 0,
            [ENERGY]: 50,
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
        'buildTime': 1000
    },
}

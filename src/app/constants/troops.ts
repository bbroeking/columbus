import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from "./resources";

// troops

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
    baseStats: Stats
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
    MINDAMAGE = "Min Hit",
    MAXDAMAGE = "Max Hit",
    SKEWDAMAGE = "Skew Hit"
}

export const MARINE = 'marine';

export const TROOPS = [
    {
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
        }
    },
]
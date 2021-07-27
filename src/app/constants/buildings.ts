import {ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS} from "./resources";
import {MARAUDER, MARINE, TROOPS} from './troops';

// Army
export const BARRACKS = 'Barracks';
export const GROUND_MECH_PRODUCTION = 'ground-mech-production';
export const AIR_MECH_PRODUCTION = 'air-mech-production';
// Research
export const BIO_RESEARCH = 'BioResearch Facility';
export const MECH_RESEARCH = 'mech-research';
// Refinery
export const MINERALS_REFINERY = 'Minerals Refinery';
export const ENERGY_REFINERY = 'Energy Refinery';

export interface Structure {
    id: string;
    buildResources: Object,
    options: Object,
    buildTime: number
}

export const BUILDINGS: {[key: string]: Structure} = {
    [BARRACKS]: {
        'id': BARRACKS,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {
            [MARINE]: TROOPS[MARINE],
            [MARAUDER]: TROOPS[MARAUDER],
        },
        'buildTime': 100
    },
    [MINERALS_REFINERY]: {
        'id': MINERALS_REFINERY,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {},
        'buildTime': 1000
    },
    [ENERGY_REFINERY]: {
        'id': ENERGY_REFINERY,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {},
        'buildTime': 1000
    },
    [BIO_RESEARCH]: {
        'id': BIO_RESEARCH,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {},
        'buildTime': 1000
    },
    // [GROUND_MECH_PRODUCTION]: {
    //     'id': GROUND_MECH_PRODUCTION,
    //     'buildResources': {
    //         [MINERALS]: 0,
    //         [RARE_MINERALS]: 0,
    //         [ENERGY]: 0,
    //         [RARE_ENERGY]: 0
    //     },
    //     'options': {},
    //     'buildTime': 10000000
    // },
    // [AIR_MECH_PRODUCTION]: {
    //     'id': AIR_MECH_PRODUCTION,
    //     'buildResources': {
    //         [MINERALS]: 0,
    //         [RARE_MINERALS]: 0,
    //         [ENERGY]: 0,
    //         [RARE_ENERGY]: 0
    //     },
    //     'options': {},
    //     'buildTime': 10000000
    // },
    // [MECH_RESEARCH]: {
    //     'id': MECH_RESEARCH,
    //     'buildResources': {
    //         [MINERALS]: 0,
    //         [RARE_MINERALS]: 0,
    //         [ENERGY]: 0,
    //         [RARE_ENERGY]: 0
    //     },
    //     'options': {},
    //     'buildTime': 1000
    // },
};
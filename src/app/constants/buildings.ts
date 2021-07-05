import {ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS} from "./resources";
import {MARINE, TROOPS} from './troops';

// Army
export const BARRACKS = 'barracks';
export const GROUND_MECH_PRODUCTION = 'ground-mech-production';
export const AIR_MECH_PRODUCTION = 'air-mech-production';
// Research
export const BIO_RESEARCH = 'bio-research';
export const MECH_RESEARCH = 'mech-research';
// Refinery
export const MINERALS_REFINERY = 'minerals-refinery';
export const ENERGY_REFINERY = 'energy-refinery';

export interface Structure {
    id: string;
    buildResources: Object,
    options: Object,
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
            [MARINE]: TROOPS[MARINE]
        }
    },
    [GROUND_MECH_PRODUCTION]: {
        'id': GROUND_MECH_PRODUCTION,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {}
    },
    [AIR_MECH_PRODUCTION]: {
        'id': AIR_MECH_PRODUCTION,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {}
    },
    [BIO_RESEARCH]: {
        'id': BIO_RESEARCH,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {}
    },
    [MECH_RESEARCH]: {
        'id': MECH_RESEARCH,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {}
    },
    [MINERALS_REFINERY]: {
        'id': MINERALS_REFINERY,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {}
    },
    [ENERGY_REFINERY]: {
        'id': ENERGY_REFINERY,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'options': {}
    }
};
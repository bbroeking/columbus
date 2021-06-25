import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from "./resources";

// troops

export const MARINE = 'marine';

export const TROOPS = [
    {
        'type': MARINE,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
]

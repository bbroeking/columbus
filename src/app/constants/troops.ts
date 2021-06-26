import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from "./resources";

// troops
export interface TROOP_MODEL {
    
}
export const MARINE = 'marine';

export const TROOPS: TROOP_MODEL[] = [
    {
        'type': MARINE,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'stats': {
            'hp': 10,
            'attack': '5',
            'defense': '5'
        }
    },
]

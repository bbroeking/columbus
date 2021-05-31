// Army
export const INFANTRY_PRODUCTION = 'infantry-prod';
export const GROUND_MECH_PRODUCTION = 'ground-mech-production';
export const AIR_MECH_PRODUCTION = 'air-mech-production';
// Research
export const BIO_RESEARCH = 'bio-research';
export const MECH_RESEARCH = 'mech-research';
// Refinery
export const MINERALS_REFINERY = 'minerals-refinery';
export const ENERGY_REFINERY = 'energy-refinery';


// Resources
export const MINERALS = 'minerals';
export const RARE_MINERALS = 'rare-minerals';
export const ENERGY = 'energy';
export const RARE_ENERGY = 'rare-energy';

export const buildings = [
    {
        'id': INFANTRY_PRODUCTION,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
    {
        'id': GROUND_MECH_PRODUCTION,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
    {
        'id': AIR_MECH_PRODUCTION,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
    {
        'id': BIO_RESEARCH,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
    {
        'id': MECH_RESEARCH,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
    {
        'id': MINERALS_REFINERY,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    },
    {
        'id': ENERGY_REFINERY,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        }
    }
];
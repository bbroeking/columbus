import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from "./resources";
import { BuildResources } from "./troops";

export interface RESEARCH {
    type: string;
    buildResources: BuildResources,
    buildTime: number
}

export const STIMPACK = 'StimPack';

export const RESEARCH: {[key: string]: RESEARCH} = {
    [STIMPACK]: {
        'type': STIMPACK,
        'buildResources': {
            [MINERALS]: 0,
            [RARE_MINERALS]: 0,
            [ENERGY]: 0,
            [RARE_ENERGY]: 0
        },
        'buildTime': 100
    },
}
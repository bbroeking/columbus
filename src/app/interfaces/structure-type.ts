export enum UnitProduction {
    BARRACKS = "Barracks",
}

export enum ResearchProduction {
    BIO_RESEARCH ="BioResearch Facility",
}

export enum ResourceProduction {
    MINERALS_REFINERY = "Minerals Refinery",
    ENERGY_REFINERY = "Energy Refinery"
}

export type StructureType = UnitProduction | ResearchProduction | ResourceProduction;

/**
 * Property-related types shared across frontend and backend
 */
export interface PropertyFeatures {
    gla: number;
    beds: number;
    baths: number;
    lotSize: number;
    age: number;
    distance?: number;
    [key: string]: unknown;
}
export interface SubjectProperty extends PropertyFeatures {
    address: string;
    yearBuilt: number;
    propertyType?: PropertyType;
    condition?: PropertyCondition;
    finishLevel?: FinishLevel;
    notes?: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
}
export interface ComparableProperty extends PropertyFeatures {
    address: string;
    salePrice: number;
    saleDate: string;
    yearBuilt: number;
    propertyType?: PropertyType;
    condition?: PropertyCondition;
    latitude?: number;
    longitude?: number;
    daysSinceSale?: number;
}
export declare const PropertyType: {
    readonly SINGLE_FAMILY: "single_family";
    readonly CONDOMINIUM: "condominium";
    readonly TOWNHOUSE: "townhouse";
    readonly MULTI_FAMILY: "multi_family";
};
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
export declare const PropertyCondition: {
    readonly NEW_CONSTRUCTION: "new_construction";
    readonly EXCELLENT: "excellent";
    readonly GOOD: "good";
    readonly FAIR: "fair";
    readonly POOR: "poor";
};
export type PropertyCondition = (typeof PropertyCondition)[keyof typeof PropertyCondition];
export declare const FinishLevel: {
    readonly LUXURY: "luxury";
    readonly HIGH: "high";
    readonly STANDARD: "standard";
    readonly BASIC: "basic";
};
export type FinishLevel = (typeof FinishLevel)[keyof typeof FinishLevel];
//# sourceMappingURL=property.d.ts.map
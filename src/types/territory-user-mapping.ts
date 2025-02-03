export type TerritoryMapping = {
    createdBy?: string,
    createdOn?: string,
    updatedBy?: string,
    updatedOn?: string,
    userScheduleId?: number,
    description?: string,
    isActive?: boolean,
    daysScheduleId?: number,
    userId?: number,
    territoryId?: number,
    branchId?: number
    geoRouteId?: number,
};

export type TerritoryMappingSummary = {
    geoFenceId?: number,
    geoFenceName?: string,
    branchId?: number,
    branchName?: string,
    geoTagId?: number,
    geoTagName?: string,
    territoryId?: number,
    territoryName?: string,
    mapNo?: string,
    territoryScheduleId?: number,
    territoryScheduleName?: string,
    geoRouteId?: number,
    geoRouteName?: string,
    userId?: number,
    userName?: string,
    marketingOfficer?: string,
    weekId?: number,
    weekName?: string,
    dayId?: number,
    dayName?: string,
    noOfJointPartners?: number,
    maxNoOfJointPartners?: number,
    joinPartnerDifference?: number,
    noOfLoans?: number
};

export type SummaryDashboard = {
    totalNumberOfCIF?: number,
    numberOfJointPartners?: number,
    maximumNumberOfJointPartners?: number,
    jointPartnersDifference?: number,
    numberOfLoans?: number
}

export type PaginationDTO = {
    count?: number;
    from?: number;
    to?: number;
    total?: number;
}

export type TerritoryMappingListResType = {
    pagination?: PaginationDTO;
    result?: TerritoryMapping[];
};

export type TerritoryMappingSummaryListResType = {
    pagination?: PaginationDTO;
    result?: TerritoryMappingSummary[];
};

export interface TerritoryStateProps {
    territoryMappingList: TerritoryMappingListResType | null;
    territoryMappingFdd: TerritoryMapping[] | null;
    territoryMapping: TerritoryMapping | null;
    territoryMappingSummaryList: TerritoryMappingSummaryListResType | null;
    scheduleSummaryDashboard: SummaryDashboard | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean;
}

export interface DefaultRootStateProps {
    territoryMapping: TerritoryStateProps;
}

export type listParametersType = {
    page?: number;
    per_page?: number;
    direction?: "asc" | "desc";
    sort?: string;
    search?: string;
    territoryId?: number;
    userId?: number;

    geoFenceId?: number;
    branchId?: number;
    geoRouteId?: number;
};

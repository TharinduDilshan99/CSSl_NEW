export type Ingredient = {
};

export type ClusterCodeListResType = {
    pagination?: paginationType
    result?: ClusterCodesType[]
};

export type ClusterCodeResType = {
    clusterId?: number,
    code?: string,
    description?: string,
    isActive?: boolean
};

export type ClusterCodeReqType = {
    code?: string,
    description?: string,
};

export type ClusterCodeFdd = ClusterCodesType[];

export interface ClusterCodeStateProps {
    clusterCodeList: ClusterCodeListResType | null;
    clusterCode: ClusterCodeResType | null;
    clusterCodeFdd: ClusterCodeFdd | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    cluster: ClusterCodeStateProps;
}

export type listParametersType = {
    page?: number
    per_page?: number
    direction?: "asc" | "desc"
    search?: string
    sort?: string
}

export type paginationType = {
    count?: number,
    from?: number,
    to?: number,
    total?: number
}

export type ClusterCodesType = {
    code?: string,
    description?: string,
    clusterId?: number,
    isActive?: boolean
}

export type ClusterCodeType = {
    clusterId?: number,
    code?: string,
    description?: string,
    isActive?: boolean
}
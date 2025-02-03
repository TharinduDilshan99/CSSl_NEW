// ==============================|| ProffesionalQualification Types ||============================== //
export type ProffesionalQualificationPostAdd = {
    actlProffesionalQualificationId?: number;
    membershipType?: string;
    gradeMembership?: string;
    methodOfEntry?: string;
    address?: string;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
  cv?: String | null;

  
  
  };
  
  export type ProffesionalQualification = {
    actlProffesionalQualificationId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    proffesionalQualificationCode?: string,
    proffesionalQualificationId?: number,
    proffesionalQualificationName?: string,
    isActive?: boolean,
    statusId?: number
  }
  export type ProffesionalQualifications = {
    actlProffesionalQualificationId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    proffesionalQualificationCode?: string,
    proffesionalQualificationId?: number,
    proffesionalQualificationName?: string,
    isActive?: boolean,
    statusId?: number
  }
  
  export type ProffesionalQualificationList = {
    pagination?: {
      count?: number;
      from?: number;
      to?: number;
      total?: number;
    };
    result?: Array<ProffesionalQualifications>;
  };
  
  export interface ProffesionalQualificationStateProps {
    proffesionalQualifications: ProffesionalQualificationList | null;
    proffesionalQualification: ProffesionalQualification | null;
    selectProffesionalQualifications: ProffesionalQualification[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean;
  }
  
  export interface DefaultRootStateProps {
    proffesionalQualification: ProffesionalQualificationStateProps;
  }
  
  export interface queryParamsProps1 {
    page: number;
    per_page: number;
    sort: 'proffesionalQualificationId';
    direction: 'asc' | 'desc';
    search: string;
  }
  
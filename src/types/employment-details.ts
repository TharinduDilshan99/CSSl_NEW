// ==============================|| employmentDetails Types ||============================== //
export type EmploymentDetailsPostAdd = {
    actlEmploymentDetailsId?: number;
    companyName?: string;
    otherComName?: string;
    designation?: string;
    companyAddress?: string;
    contactNumber?: string;
    startDate?: string | Date | null;
    currentlyWorking?: string | boolean;
    endDate?: string | Date | null;
  cv?: String | null;

  
  
  };
  
  export type EmploymentDetails = {
    actlEmploymentDetailsId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    employmentDetailsCode?: string,
    employmentDetailsId?: number,
    employmentDetailsName?: string,
    isActive?: boolean,
    statusId?: number
  }
  export type EmploymentDetailss = {
    actlEmploymentDetailsId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    employmentDetailsCode?: string,
    employmentDetailsId?: number,
    employmentDetailsName?: string,
    isActive?: boolean,
    statusId?: number
  }
  
  export type EmploymentDetailsList = {
    pagination?: {
      count?: number;
      from?: number;
      to?: number;
      total?: number;
    };
    result?: Array<EmploymentDetailss>;
  };
  
  export interface EmploymentDetailsStateProps {
    employmentDetailss: EmploymentDetailsList | null;
    employmentDetails: EmploymentDetails | null;
    selectEmploymentDetailss: EmploymentDetails[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean;
  }
  
  export interface DefaultRootStateProps {
    employmentDetails: EmploymentDetailsStateProps;
  }
  
  export interface queryParamsProps1 {
    page: number;
    per_page: number;
    sort: 'employmentDetailsId';
    direction: 'asc' | 'desc';
    search: string;
  }
  
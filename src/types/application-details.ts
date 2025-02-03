// ==============================|| applicationDetails Types ||============================== //
export type ApplicationDetailsPostAdd = {
    actlApplicationDetailsId?: number;
    memberType?: string;
  title?: string;
  nameWithInitials?: string;
  lastName?: string;
  fullName?: string;
  nicPassport?: string;
  contactNumber?: string;
  dateOfBirth?: string | Date | null;
  email?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  cv?: String | null;

  
  
  };
  
  export type ApplicationDetails = {
    actlApplicationDetailsId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    applicationDetailsCode?: string,
    applicationDetailsId?: number,
    applicationDetailsName?: string,
    isActive?: boolean,
    statusId?: number
  }
  export type ApplicationDetailss = {
    actlApplicationDetailsId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    applicationDetailsCode?: string,
    applicationDetailsId?: number,
    applicationDetailsName?: string,
    isActive?: boolean,
    statusId?: number
  }
  
  export type ApplicationDetailsList = {
    pagination?: {
      count?: number;
      from?: number;
      to?: number;
      total?: number;
    };
    result?: Array<ApplicationDetailss>;
  };
  
  export interface ApplicationDetailsStateProps {
    applicationDetailss: ApplicationDetailsList | null;
    applicationDetails: ApplicationDetails | null;
    selectApplicationDetailss: ApplicationDetails[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean;
  }
  
  export interface DefaultRootStateProps {
    applicationDetails: ApplicationDetailsStateProps;
  }
  
  export interface queryParamsProps {
    page: number;
    per_page: number;
    sort: 'applicationDetailsId';
    direction: 'asc' | 'desc';
    search: string;
  }
  
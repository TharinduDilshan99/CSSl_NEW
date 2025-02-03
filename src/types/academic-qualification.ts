// ==============================|| academicQualification Types ||============================== //
export type AcademicQualificationPostAdd = {
    actlAcademicQualificationId?: number;
    instituteName?: string;
    otherInstituteName?: string;
    qualificationName?: string;
    otherqualificationName?: string;
    employmentType?: string;
    instituteAddress?: string;
    fromDate?: string | Date | null;
    toDate?: string | Date | null;
    receivedDate?: string | Date | null;
  cv?: String | null;

  
  
  };
  
  export type AcademicQualification = {
    actlAcademicQualificationId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    academicQualificationCode?: string,
    academicQualificationId?: number,
    academicQualificationName?: string,
    isActive?: boolean,
    statusId?: number
  }
  export type AcademicQualifications = {
    actlAcademicQualificationId?: number,
    description?: string,
    flRStatus?: {
      description?: string,
      isActive?: boolean,
      statusCode?: string,
      statusId?: number
    },
    academicQualificationCode?: string,
    academicQualificationId?: number,
    academicQualificationName?: string,
    isActive?: boolean,
    statusId?: number
  }
  
  export type AcademicQualificationList = {
    pagination?: {
      count?: number;
      from?: number;
      to?: number;
      total?: number;
    };
    result?: Array<AcademicQualifications>;
  };
  
  export interface AcademicQualificationStateProps {
    academicQualifications: AcademicQualificationList | null;
    academicQualification: AcademicQualification | null;
    selectAcademicQualifications: AcademicQualification[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean;
  }
  
  export interface DefaultRootStateProps {
    academicQualification: AcademicQualificationStateProps;
  }
  
  export interface queryParamsProps1 {
    page: number;
    per_page: number;
    sort: 'academicQualificationId';
    direction: 'asc' | 'desc';
    search: string;
  }
  
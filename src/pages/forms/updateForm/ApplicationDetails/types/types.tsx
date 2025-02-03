import { Column, HeaderGroup } from "react-table";
import { FC } from "react";
import { ApplicationDetails, ApplicationDetailss } from "types/application-details";
// import { EmploymentDetails, EmploymentDetailss } from "types/employment-details";


export interface dataProps extends ApplicationDetailss { }

export interface ReactTableProps {
    columns: Column[];
    data: dataProps[];
    renderRowSubComponent: FC<any>;
    handleAddEdit: () => void;
    getHeaderProps: (column: HeaderGroup) => {};
}

export interface VehicleTypeProps extends ApplicationDetails { }





// export interface EmploymentProps extends EmploymentDetailss { }

// export interface ReactTableProps1 {
//     columns: Column[];
//     data: EmploymentProps[];
//     renderRowSubComponent: FC<any>;
//     handleAddEdit: () => void;
//     getHeaderProps: (column: HeaderGroup) => {};
// }

// export interface EmploymentDetailsProps extends EmploymentDetails { }


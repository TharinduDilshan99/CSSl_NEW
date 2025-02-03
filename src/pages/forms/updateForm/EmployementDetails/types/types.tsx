import { Column, HeaderGroup } from "react-table";
import { FC } from "react";
// import { ApplicationDetails, ApplicationDetailss } from "types/application-details";
import { EmploymentDetails, EmploymentDetailss } from "types/employment-details";


export interface dataProps extends EmploymentDetailss { }

export interface ReactTableProps {
    columns: Column[];
    data: dataProps[];
    renderRowSubComponent: FC<any>;
    handleAddEdit: () => void;
    getHeaderProps: (column: HeaderGroup) => {};
}

export interface EmployeProps extends EmploymentDetails { }
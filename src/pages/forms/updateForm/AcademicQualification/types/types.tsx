import { Column, HeaderGroup } from "react-table";
import { FC } from "react";
// import { ApplicationDetails, ApplicationDetailss } from "types/application-details";
import { AcademicQualification, AcademicQualifications } from "types/academic-qualification";


export interface dataProps extends AcademicQualifications { }

export interface ReactTableProps {
    columns: Column[];
    data: dataProps[];
    renderRowSubComponent: FC<any>;
    handleAddEdit: () => void;
    getHeaderProps: (column: HeaderGroup) => {};
}

export interface AcademicProps extends AcademicQualification { }
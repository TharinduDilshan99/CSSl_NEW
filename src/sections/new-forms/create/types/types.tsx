import { Column } from "react-table"

export interface dataProps {
    inquiryDesignId?: number
    id?: number
    sampleNo?: string
    buyersDesignRef?: string
    color?: number
    miniumPrice?: number
    maximumPrice?: number
    sampleQty?: number
}

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    handleAddEdit: () => void
    handleRemove: (id: number) => void
}

export interface PropertyListProps {
    id?: number
    
    booleanValues?: boolean,
    inputType?: string,
    inquiryDesignId?: number,
    inquiryId?: number,
    isCommon?: boolean,
    itemId?: number,
    productCommonPropertyID?: number,
    productId?: number,
    propertyId?: number,
    value?: string
}

export interface InquiryDesignsFormProps {
    itmCommonPropertyList: PropertyListProps[]
    productCommonPropertyList: PropertyListProps[]
}

export interface DesignProps {
    insolePrintingLogo?: string
    inquiryDesignedId?: number
    productId?: number
    categoryId?: number
    upperPrintingLogo?: string
    dsiArtNumber?: string
    price?: string

    id?: number

    buyersDesignRef?: string
    last?: string
    color?: number
    sizeRange?: number
    miniumPrice?: number
    maximumPrice?: number
    sampleSize?: number
    sampleQty?: number
    sampleDimensions?: string
    refImageProduct?: string
    refImageArtwork?: string
    refUpperPrintingLogo?: string
    refInsolePrintingLogo?: string
    otherAccessories?: string
    description?: string
    remarks?: string
    sizeDesc?: string
    colourDesc?: string

    commonPropertyMapCode?: any
    itmCommonPropertyList?: any
    productCommonPropertyList?: any
}

export interface DesignItemProps {
    id?: number
    itemId?: number
    lining?: string
    inputType?: string
    inquiryDesignId?: number
    propertyId?: number
    value?: string
    material?: string
    design?: string
    hardness?: string
    thickness?: string
    colour?: string
    itmCommonPropertyList?: any[];
}


export interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    deleteId: number | null;
} 
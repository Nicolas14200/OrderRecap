import { VegetableInfo } from "core/domains/valuesObjects/VegetableInfo";
import { WorkBook, WorkSheet } from "xlsx";
import { RawData } from "../type/RawData";

export interface XLSGateway {
    createWorkBook(links:string[]): WorkBook[];
    createWorkSheet(workBooks: WorkBook[]): WorkSheet[];
    convertWorkSheetToRawData(workSheets: WorkSheet[]): RawData[]
    createXLSFile( vegetableInfoArrays:(string | number)[][] ): void;
}
import { WorkSheet } from "xlsx";
import { Usecases } from "../Usecases";
import { RawData } from "../../../core/domains/type/RawData";
import { inject, injectable } from "inversify";
import { OrderIdentifier } from "../../../core/domains/OrderIdentifier";
import { XLSXGateway } from "../../../adapters/XLSX/XLSXGateway";

@injectable()
export class InitRawDataByWorkSheet implements Usecases<WorkSheet[], RawData[]> {
    constructor(
        @inject(OrderIdentifier.XLSXGateway)
        private readonly xLSXGateway: XLSXGateway)
        {}
    execute(workSheet: WorkSheet[]): RawData[] {
        return this.xLSXGateway.convertWorkSheetToRawData(workSheet)
    }
}
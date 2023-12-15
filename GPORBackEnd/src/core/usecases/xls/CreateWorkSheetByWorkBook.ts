import { WorkBook, WorkSheet } from "xlsx";
import { Usecases } from "../Usecases";
import { inject, injectable } from "inversify";
import { OrderIdentifier } from "../../../core/domains/OrderIdentifier";
import { XLSXGateway } from "../../../adapters/XLSX/XLSXGateway";

@injectable()
export class CreateWorkSheetByWorkBook implements Usecases< WorkBook[], WorkSheet[]>{
    constructor(
        @inject(OrderIdentifier.XLSXGateway)
        private readonly xLSXGateway: XLSXGateway)
        {}
    execute(workBook: WorkBook[]) {
       return this.xLSXGateway.createWorkSheet(workBook)
    }
}
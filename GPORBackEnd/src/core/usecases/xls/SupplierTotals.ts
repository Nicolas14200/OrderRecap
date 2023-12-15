import { VegetableInfo } from "../../../core/domains/valuesObjects/VegetableInfo"
import { inject, injectable } from "inversify"
import { Usecases } from "../Usecases"
import { XLSXGateway } from "../../../adapters/XLSX/XLSXGateway"
import { OrderIdentifier } from "../../../core/domains/OrderIdentifier"

@injectable()
export class SupplierTotals implements Usecases<((VegetableInfo|string)[]|string)[],  (string | number)[][] > {
    constructor(
        @inject(OrderIdentifier.XLSXGateway)
        private readonly xLSXGateway: XLSXGateway)
        {}
    execute(vegetableInfo: ((VegetableInfo|string)[]|string)[]){
        return this.xLSXGateway.supplierTotals(vegetableInfo)
    }
}
import { inject, injectable } from "inversify";
import { Usecases } from "../Usecases";
import { OrderIdentifier } from "../../../core/domains/OrderIdentifier";
import { XLSXGateway } from "../../../adapters/XLSX/XLSXGateway";

@injectable()
export class CreateXlsFile implements Usecases< (string | number)[][], void> {
    constructor(
        @inject(OrderIdentifier.XLSXGateway)
        private readonly xLSXGateway: XLSXGateway)
        {}
    async execute(vegetableInfo: (string | number)[][]): Promise<void> {
        await this.xLSXGateway.createXLSFile(vegetableInfo)
    }
}
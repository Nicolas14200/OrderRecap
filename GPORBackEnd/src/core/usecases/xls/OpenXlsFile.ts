import { inject, injectable } from "inversify";
import { Usecases } from "../Usecases";
import { OrderIdentifier } from "../../../core/domains/OrderIdentifier";
import { XLSXGateway } from "../../../adapters/XLSX/XLSXGateway";

export interface OpenXlsFileProps {
    filePath: string, 
    libreOfficePath: string
}
@injectable()
export class OpenXlsFile implements Usecases <OpenXlsFileProps, void> {
    constructor(
        @inject(OrderIdentifier.XLSXGateway)
        private readonly xLSXGateway: XLSXGateway)
        {}
    execute(payload: OpenXlsFileProps): void {
        this.xLSXGateway.openXlsFile(payload.filePath, payload.libreOfficePath)
    }

}
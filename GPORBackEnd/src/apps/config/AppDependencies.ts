import { CreateRecap } from "../../core/usecases/recap/create";
import { RecapController } from "../../apps/modules/RecapController";
import { Container } from "inversify";
import { AddRawDatas } from "../../core/usecases/recap/AddRawDatas";
import { AddConditionmentMode } from "../../core/usecases/recap/AddConditionmentMode";
import { GetAllModeInclued } from "../../core/usecases/recap/GetAllModeInclued";
import { ProcessVegetableInfo } from "../../core/usecases/recap/ProcessVegetableInfo";
import { SortByPlace } from "../../core/usecases/recap/SortByPlace";
import { MergeRecap } from "../../core/usecases/recap/MergeRecap";
import { SetAllRecap } from "../../core/usecases/recap/SetAllRecap";
import { FormateRecap } from "../../core/usecases/recap/FormateRecap";
import { InitRecap } from "../../core/usecases/recap/InitRecap";
import { AddPlankInPlace } from "../../core/usecases/recap/AddBlankInPlace";
import { OrderIdentifier } from "../../core/domains/OrderIdentifier";
import { XLSXGateway } from "../../adapters/XLSX/XLSXGateway";
import { CreateXlsFile } from "../../core/usecases/xls/CreateXlsFile";
import { CreateWorkSheetByWorkBook } from "../../core/usecases/xls/CreateWorkSheetByWorkBook";
import { InitRawDataByWorkSheet } from "../../core/usecases/xls/InitRawDataByWorkSheet";
import { SupplierTotals } from "../../core/usecases/xls/SupplierTotals";
import { OpenXlsFile } from "../../core/usecases/xls/OpenXlsFile";
import {GetVegetableInfoByCustomer} from "../../core/usecases/recap/GetVegetableInfoByCustomer";

export class AppDependencies extends Container {
    
    init(){
        this.bind(RecapController).toSelf()
        this.bind(CreateRecap).toSelf()
        this.bind(AddConditionmentMode).toSelf()
        this.bind(AddRawDatas).toSelf()
        this.bind(GetAllModeInclued).toSelf()
        this.bind(ProcessVegetableInfo).toSelf()
        this.bind(SortByPlace).toSelf()
        this.bind(MergeRecap).toSelf()
        this.bind(SetAllRecap).toSelf()
        this.bind(FormateRecap).toSelf()
        this.bind(AddPlankInPlace).toSelf()
        this.bind(InitRecap).toSelf()
        this.bind(OrderIdentifier.XLSXGateway).toConstantValue(new XLSXGateway())
        this.bind(CreateXlsFile).toSelf()
        this.bind(CreateWorkSheetByWorkBook).toSelf()
        this.bind(InitRawDataByWorkSheet).toSelf()
        this.bind(SupplierTotals).toSelf()
        this.bind(OpenXlsFile).toSelf()
        this.bind(GetVegetableInfoByCustomer).toSelf()
        return this
    }
}
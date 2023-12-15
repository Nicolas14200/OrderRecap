import { injectable } from "inversify";
import { Get, JsonController, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import { InitRecap } from "../../core/usecases/recap/InitRecap";
import { CreateXlsFile } from "../../core/usecases/xls/CreateXlsFile";
import { InitRawDataByWorkSheet } from "../../core/usecases/xls/InitRawDataByWorkSheet";
import { CreateWorkSheetByWorkBook } from "../../core/usecases/xls/CreateWorkSheetByWorkBook";
import { CreateRecap } from "../../core/usecases/recap/create";
import { SupplierTotals } from "../../core/usecases/xls/SupplierTotals";
import { OpenXlsFile } from "../../core/usecases/xls/OpenXlsFile";
import { GetVegetableInfoByCustomer } from "../../core/usecases/recap/GetVegetableInfoByCustomer";

@JsonController("/recap")
@injectable()
export class RecapController {
  constructor(
    private readonly _createWorkSheetByWorkBook: CreateWorkSheetByWorkBook,
    private readonly _initRawDataByWorkSheet: InitRawDataByWorkSheet,
    private readonly _createRecap: CreateRecap,
    private readonly _initRecap: InitRecap,
    private readonly _createXlsFile: CreateXlsFile,
    private readonly _supplierTotals: SupplierTotals,
    private readonly _openXlsFile: OpenXlsFile,
    private readonly _getVegetableInfoByCustomer: GetVegetableInfoByCustomer
  ) {}

  @Get("/")
  async basicRoute(@Res() response: Response) {
    try {
      return (response.statusCode = 200);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/init")
  async initRecap(@Req() request: Request, @Res() response: Response) {
    try {
      console.log("reçu", request.body.file.length, "file");
      console.log("fileName", request.body.fileName);
      const workSheets = this._createWorkSheetByWorkBook.execute(
        request.body.file
      );
      const rawDatas = this._initRawDataByWorkSheet.execute(workSheets);
      const recap = this._initRecap.execute({
        modes: ["kg", "b", "p"],
        newRawDatas: rawDatas,
        customerNames: request.body.fileName,
      });
      const formateRecap = this._supplierTotals.execute(
        recap.props.formateRecap
      );
      this._createXlsFile.execute(formateRecap);
      return response.status(200).send(recap.props.recap);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/openXlsFile")
  async openXlsFile(@Req() request: Request, @Res() response: Response) {
    try {
      this._openXlsFile.execute({
        filePath: "E:\\Gardin-Partageo\\Order_Recap\\GPORElectronAppV2\\GPORBackEnd\\recap.xls",
        libreOfficePath: request.body.libreOfficePath,
      });
      return response.status(200).send("OPEN");
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/getByCustomer")
  async getByCustomer(@Req() request: Request, @Res() response: Response) {
    try {

      this._getVegetableInfoByCustomer.execute({
        recap:request.body.recap,
        customer:request.body.customer,
      });
      return response.status(200).send("OPEN");
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}

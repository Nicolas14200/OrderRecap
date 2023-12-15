import "reflect-metadata";
import { XLSXGateway } from "../../XLSX/XLSXGateway";
import { WorkBook, WorkSheet } from "xlsx";
import { RawData } from "../../../core/domains/type/RawData";
import { formateRecap } from "../fixtures/recapFinal/formateRecap";

require("dotenv").config();

describe("Integration - XLSXGateway", () => {
  let xlsxGateway: XLSXGateway;

  beforeAll(() => {
    xlsxGateway = new XLSXGateway();
  });
  it("should create a workBook ", async () => {
    const workBooks: WorkBook[] = xlsxGateway.createWorkBook([
      "./src/adapters/__test__/recapClient/Biaucoop_S30_biocoop_2023(1).xls",
    ]);
    expect(workBooks[0]).toBeDefined();
    expect(workBooks[0].SheetNames).toContain(process.env.SHEET_NAME);
  });
  it("Should create a WorkSheet", async () => {
    const workBooks: WorkBook[] = xlsxGateway.createWorkBook([
      "./src/adapters/__test__/recapClient/Biaucoop_S30_biocoop_2023(1).xls",
    ]);
    const workSheets: WorkSheet[] = xlsxGateway.createWorkSheet(workBooks);
    expect(workSheets[0]).toBeDefined();
    expect(workSheets[0]["A93"]).toBeDefined();
    expect(workSheets[0]["D62"]).toBeDefined();
  });
  it("Should convert a workSheet to a json", async () => {
    const workBooks: WorkBook[] = xlsxGateway.createWorkBook([
      "./src/adapters/__test__/recapClient/Biaucoop_S30_biocoop_2023(1).xls",
    ]);
    const workSheets: WorkSheet[] = xlsxGateway.createWorkSheet(workBooks);
    const jsonData: RawData[] =
      xlsxGateway.convertWorkSheetToRawData(workSheets);
    expect(jsonData[0]).toBeDefined();
  });
  it("Should supplierTotals", async () => {
    const newRecap = xlsxGateway.supplierTotals(formateRecap);
    await xlsxGateway.createXLSFile(newRecap);

  });
  it("Should open xls file", async () => {
    const libreOfficePath = "D:\\program\\scalc.exe";
    console.log("__dirname", __dirname);
    xlsxGateway.openXlsFile(__dirname + "../../../../../recap.xls", libreOfficePath);
  });
});

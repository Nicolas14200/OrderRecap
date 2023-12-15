require("dotenv").config();
import { XLSGateway } from "../../core/domains/gateways/XLSGateway";
import { RawData } from "../../core/domains/type/RawData";
import { VegetableInfo } from "../../core/domains/valuesObjects/VegetableInfo";
import { injectable } from "inversify";
import XLSX from "xlsx";
import ExcelJS from "exceljs";
import fs from "fs";
import { exec } from "child_process";
import path from "path";

@injectable()
export class XLSXGateway implements XLSGateway {
  createWorkBook(links: string[]): XLSX.WorkBook[] {
    let workBooks: XLSX.WorkBook[] = [];
    links.forEach((link: string) => {
      workBooks.push(XLSX.readFile(link, { sheetRows: 200 }));
    });
    return workBooks;
  }

  createWorkSheet(workBooks: XLSX.WorkBook[]): XLSX.WorkSheet[] {
    let workSheets: XLSX.WorkSheet[] = [];
    workBooks.forEach((workBook: XLSX.WorkBook) => {
      workSheets.push(workBook.Sheets[process.env.SHEET_NAME]);
    });
    return workSheets;
  }

  convertWorkSheetToRawData(workSheets: XLSX.WorkSheet[]): RawData[] {
    let datas: RawData[] = [];
    workSheets.forEach((workSheet: XLSX.WorkSheet) => {
      datas.push(XLSX.utils.sheet_to_json(workSheet, { header: 1 }));
    });
    return datas;
  }

  applyBorder(worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    return worksheet;
  }

  applyWidth(worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
    let columns = [
      { header: "LEGUME", key: "vegetableName", width: 20 },
      { header: "QUANTITE", key: "quatity", width: 10 },
      { header: "UNITE", key: "unit", width: 8 },
      { header: "LIEU", key: "place", width: 5 },
    ];

    worksheet.columns.forEach((col, index) => {
      if (index % 2 === 0) {
        columns.push({ header: "CLIENT", key: "customer", width: 20 });
      } else {
        columns.push({ header: "QUANTITE", key: "quatity", width: 10 });
      }
    });

    worksheet.columns = columns;
    return worksheet;
  }

  supplierTotals(
    formateRecap: ((VegetableInfo | string)[] | string)[]
  ): (string | number)[][] {
    let newRecap: (string | number)[][] = [];
    const lastRecap: VegetableInfo[] = formateRecap[
      formateRecap.length - 1
    ] as VegetableInfo[];
    let currentPlace = "";
    let emptyRowIndexes = [];
    lastRecap.forEach((vegetableInfo: VegetableInfo, index: number) => {
      if (vegetableInfo.place !== currentPlace) {
        emptyRowIndexes.push(index + 1);
        currentPlace = vegetableInfo.place;
      }
      newRecap[index] = [
        vegetableInfo.vegetableName,
        vegetableInfo.quatity,
        vegetableInfo.unit,
        vegetableInfo.place,
      ];
      formateRecap.forEach((info) => {
        if (typeof info != "string") {
          info.forEach((vegeInfo: VegetableInfo) => {
            if (
              vegeInfo.vegetableName === vegetableInfo.vegetableName &&
              vegeInfo.customer != "TOTAL"
            ) {
              newRecap[index].push(vegeInfo.customer, vegeInfo.quatity);
            }
          });
        }
      });
    });

    return newRecap;
  }

  async createXLSFile(
    vegetableInfoArrays: (string | number)[][]
  ): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Recapitulatif", {
      views: [{ showGridLines: false }],
    });
    worksheet.addRow({});
    worksheet.addRows(vegetableInfoArrays);

    worksheet = this.applyWidth(worksheet);
    worksheet = this.applyBorder(worksheet);

    worksheet.headerFooter = {
      oddHeader: "Recap des commandes",
      oddFooter: "Gardin Partageo",
      evenHeader: "Recap des commandes",
      evenFooter: "Gardin Partageo",
    };
    await workbook.xlsx.writeFile("recap.xls");

    return worksheet;
  }

  async openXlsFile(filePath: string, libreOfficePath: string) {
    if (fs.existsSync(filePath)) {
      const absoluteFilePath = path.resolve(filePath);
      const command =
        process.platform === "win32"
          ? `"${libreOfficePath}" --calc ${absoluteFilePath}`
          : `libreoffice --calc ${absoluteFilePath}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(
            `Erreur lors de l'ouverture du fichier avec LibreOffice: ${error.message}`
          );
        } else {
          console.log("Fichier ouvert avec succès.");
        }
      });
    } else {
      console.error("Le fichier spécifié n'existe pas.");
    }
  }
}

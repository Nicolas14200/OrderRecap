import "reflect-metadata";
import { Recap } from "../domains/entities/Recap";
import { CreateRecap } from "../usecases/recap/create";
import { AddConditionmentMode } from "../usecases/recap/AddConditionmentMode";
import { GetAllModeInclued } from "../usecases/recap/GetAllModeInclued";
import { rawDataFixture_1 } from "./rawData/rawDataFixture_1";
import { rawDataFixture_2 } from "./rawData/rawDataFixture_2";
import { rawDataFixture_3 } from "./rawData/rawDataFixture_3";
import { AddRawDatas } from "../usecases/recap/AddRawDatas";
import { ProcessVegetableInfo } from "../usecases/recap/ProcessVegetableInfo";
import { MergeRecap } from "../usecases/recap/MergeRecap";
import { SortByPlace } from "../usecases/recap/SortByPlace";
import { SetAllRecap } from "../usecases/recap/SetAllRecap";
import { FormateRecap } from "../usecases/recap/FormateRecap";
import { GetQuantity } from "../usecases/recap/GetQuantity";
import { SetAllVegetableName } from "../usecases/recap/SetAllVegetableName";
import { VegetableInfo } from "../domains/valuesObjects/VegetableInfo";
import { GetVegetableInfoByCustomer } from "../usecases/recap/GetVegetableInfoByCustomer";
import fs from "fs";

describe("Unit - Recap", () => {
  let recap: Recap;
  let createRecap: CreateRecap;
  let addConditionmentMode: AddConditionmentMode;
  let addRawDatas: AddRawDatas;
  let getAllModeInclued: GetAllModeInclued;
  let processVegetableInfo: ProcessVegetableInfo;
  let sortByPlace: SortByPlace;
  let mergeRecap: MergeRecap;
  let getVegetableInfoByCustomer: GetVegetableInfoByCustomer;
  let setAllRecap: SetAllRecap;
  let setAllVegetableName: SetAllVegetableName;
  let formateRecap: FormateRecap;
  let getQuantity: GetQuantity;
  let quantityControl01: number;
  let quantityControl02: number;
  let quantityControl03: number;
  let quantityControl04: number;
  beforeAll(() => {
    createRecap = new CreateRecap();
    addConditionmentMode = new AddConditionmentMode();
    addRawDatas = new AddRawDatas();
    getAllModeInclued = new GetAllModeInclued();
    processVegetableInfo = new ProcessVegetableInfo();
    mergeRecap = new MergeRecap();
    sortByPlace = new SortByPlace();
    getVegetableInfoByCustomer = new GetVegetableInfoByCustomer();
    setAllRecap = new SetAllRecap();
    setAllVegetableName = new SetAllVegetableName();
    formateRecap = new FormateRecap();
    getQuantity = new GetQuantity();
  });
  it("Should create a recap", async () => {
    recap = createRecap.execute();
    expect(recap.props.id).toBeDefined();
  });
  it("Should add conditionement mode to a recap", async () => {
    recap = addConditionmentMode.execute({
      modes: ["kg", "b", "p"],
      recap: recap,
    });
    expect(recap.props.conditionmentMode[0]).toEqual("kg");
  });
  it("Should add rawDataFixture_1 to a recap", async () => {
    addRawDatas.execute({
      recap: recap,
      newRawDatas: [rawDataFixture_1],
      customerNames: ["rawDataFixture_1"],
    });
    expect(recap.props.rawDatas.get("rawDataFixture_1")).toEqual(
      rawDataFixture_1
    );
  });
  it("Should add rawDataFixture_2 to a recap", async () => {
    addRawDatas.execute({
      recap: recap,
      newRawDatas: [rawDataFixture_2, rawDataFixture_3],
      customerNames: ["rawDataFixture_2", "rawDataFixture_3"],
    });
    expect(recap.props.rawDatas.get("rawDataFixture_2")).toEqual(
      rawDataFixture_2
    );
    expect(recap.props.rawDatas.get("rawDataFixture_3")).toEqual(
      rawDataFixture_3
    );
    expect(recap.props.rawDatas.size).toEqual(3);
  });
  it("Should sort raw Data", async () => {
    recap = getAllModeInclued.execute(recap);
    const ArrayOfrawDataFixture_1 =
      recap.props.rawDatas.get("rawDataFixture_1");
    const ArrayOfrawDataFixture_2 =
      recap.props.rawDatas.get("rawDataFixture_2");
    const ArrayOfrawDataFixture_3 =
      recap.props.rawDatas.get("rawDataFixture_3");
    if (ArrayOfrawDataFixture_1) {
      expect(ArrayOfrawDataFixture_1[0][0]).toEqual("carotte nouvelle botte");
    }
    if (ArrayOfrawDataFixture_2) {
      expect(ArrayOfrawDataFixture_2[0][0]).toEqual("pomme de terre primeur");
    }
    if (ArrayOfrawDataFixture_3) {
      expect(ArrayOfrawDataFixture_3[1][0]).toEqual("carotte nouvelle botte");
    }
  });
  it("Should process vegetable info in the recap by customer", async () => {
    recap = processVegetableInfo.execute(recap);
    const control01 = recap.props.recapByCustomer.get("rawDataFixture_1");
    if (control01) {
      expect(control01[0].vegetableName).toEqual("carotte nouvelle botte");
    } else {
      console.log("control01 ne pas pas !!!!");
    }
  });
  it("Should merge Recap of customer in the global recap", async () => {
    recap = mergeRecap.execute(recap);

    let arrVegeInfo01 = recap.props.recapByCustomer.get("rawDataFixture_1");
    if (arrVegeInfo01) {
      arrVegeInfo01.forEach((vegeInfo: VegetableInfo) => {
        if (vegeInfo.vegetableName === "aubergine") {
          quantityControl01 = vegeInfo.quatity;
        }
      });
    }

    let arrVegeInfo02 = recap.props.recapByCustomer.get("rawDataFixture_2");
    if (arrVegeInfo02) {
      arrVegeInfo02.forEach((vegeInfo: VegetableInfo) => {
        if (vegeInfo.vegetableName === "aubergine") {
          quantityControl02 = vegeInfo.quatity;
        }
      });
    }
    let arrVegeInfo03 = recap.props.recapByCustomer.get("rawDataFixture_3");
    if (arrVegeInfo03) {
      arrVegeInfo03.forEach((vegeInfo: VegetableInfo) => {
        if (vegeInfo.vegetableName === "aubergine") {
          quantityControl03 = vegeInfo.quatity;
        }
      });
    }
    recap.props.recap.forEach((vegeInfo: VegetableInfo) => {
      if (vegeInfo.vegetableName === "aubergine") {
        quantityControl04 = vegeInfo.quatity;
      }
    });
    if (quantityControl01 && quantityControl02 && quantityControl03) {
      expect(quantityControl01 + quantityControl02 + quantityControl03).toEqual(
        quantityControl04
      );
    }
  });
  it("Should Sort recap By Place", async () => {
    recap = sortByPlace.execute(recap);
    // fs.writeFile("recap.ts", JSON.stringify(recap.props.recap), (err) => {
    //   if (err) throw err;
    // })
  });
  it("Should return vegetable info by costomer", async () => {
    const vegeInfo: VegetableInfo[] = getVegetableInfoByCustomer.execute({
      recap,
      customer: "rawDataFixture_1",
    });
    expect(vegeInfo[0].vegetableName).toEqual("carotte nouvelle botte");
  });
  it("Should setup allRecap", async () => {
    recap = setAllRecap.execute(recap);
    // fs.writeFile("allRecap.ts", JSON.stringify(recap.props.allRecap.get("rawDataFixture_1")), (err) => {
    //   if (err) throw err;
    // })
  });
  it("Should set all VegetableName ", async () => {
    recap = setAllVegetableName.execute(recap);
  });
  it("Should formate the recap destiny xls file", async () => {
    recap = formateRecap.execute(recap);
    // fs.writeFile(
    //   "formateRecap.ts",
    //   JSON.stringify(recap.props.formateRecap),
    //   (err) => {
    //     if (err) throw err;
    //   }
    // );
  });
  it("Should add Blank In Place ", async () => {
    const formateRecap = recap.addBlankInPlace(recap.props.formateRecap);
    fs.writeFile(
      "formateRecap.ts",
      JSON.stringify(formateRecap   ),
      (err) => {
        if (err) throw err;
      }
    );
  });
});

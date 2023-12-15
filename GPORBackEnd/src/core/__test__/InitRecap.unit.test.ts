import "reflect-metadata";
import { AddConditionmentMode } from "../usecases/recap/AddConditionmentMode";
import { AddRawDatas } from "../usecases/recap/AddRawDatas";
import { FormateRecap } from "../usecases/recap/FormateRecap";
import { GetAllModeInclued } from "../usecases/recap/GetAllModeInclued";
import { InitRecap } from "../usecases/recap/InitRecap";
import { MergeRecap } from "../usecases/recap/MergeRecap";
import { ProcessVegetableInfo } from "../usecases/recap/ProcessVegetableInfo";
import { SetAllRecap } from "../usecases/recap/SetAllRecap";
import { SortByPlace } from "../usecases/recap/SortByPlace";
import { CreateRecap } from "../usecases/recap/create";
import { rawDataFixture_1 } from "./rawData/rawDataFixture_1";
import { rawDataFixture_2 } from "./rawData/rawDataFixture_2";
import { rawDataFixture_3 } from "./rawData/rawDataFixture_3";
describe("Unit - InitRecap", () => {
  let initRecap: InitRecap;
  let createRecap: CreateRecap;
  let addConditionmentMode: AddConditionmentMode;
  let addRawDatas: AddRawDatas;
  let getAllModeInclued: GetAllModeInclued;
  let processVegetableInfo: ProcessVegetableInfo;
  let sortByPlace: SortByPlace;
  let mergeRecap: MergeRecap;
  let setAllRecap: SetAllRecap;
  let formateRecap: FormateRecap;
  beforeAll(() => {
    createRecap = new CreateRecap();
    addConditionmentMode = new AddConditionmentMode();
    addRawDatas = new AddRawDatas();
    getAllModeInclued = new GetAllModeInclued();
    processVegetableInfo = new ProcessVegetableInfo();
    mergeRecap = new MergeRecap();
    sortByPlace = new SortByPlace();
    setAllRecap = new SetAllRecap();
    formateRecap = new FormateRecap();
    initRecap = new InitRecap(
      createRecap,
      addConditionmentMode,
      addRawDatas,
      getAllModeInclued,
      processVegetableInfo,
      sortByPlace,
      mergeRecap,
      setAllRecap,
      formateRecap
    );
  });
  it("Should init a recap", async () => {
    const recap  = initRecap.execute({
        modes:["kg", "b", "p"],
        newRawDatas:[rawDataFixture_1, rawDataFixture_2, rawDataFixture_3],
        customerNames:["rawDataFixture_1", "rawDataFixture_2", "rawDataFixture_3"],
    })
    console.log(recap)
  });
});

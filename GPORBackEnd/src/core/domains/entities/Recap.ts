import { RawData } from "../type/RawData";
import { VegetableInfo } from "../valuesObjects/VegetableInfo";
import { v4 } from "uuid";
require("dotenv").config();

interface RecapProps {
  id: string;
  conditionmentMode: string[];
  rawDatas: Map<string, RawData>;
  recapByCustomer: Map<string, VegetableInfo[]>;
  recap: VegetableInfo[];
  allRecap: Map<string, VegetableInfo[]>;
  allVegetableName: string[];
  formateRecap: (VegetableInfo[] | string)[];
}

export class Recap {
  props: RecapProps;
  constructor(props: RecapProps) {
    this.props = props;
  }

  static create() {
    return new Recap({
      id: v4(),
      conditionmentMode: [],
      rawDatas: new Map(),
      recapByCustomer: new Map(),
      recap: [],
      allRecap: new Map(),
      allVegetableName: [],
      formateRecap: [],
    });
  }

  addConditionmentMode(mode: string[]) {
    mode.forEach((mode: string) => {
      this.props.conditionmentMode.push(mode);
    });
  }

  addRawDatas(newRawDatas: RawData[], customerNames: string[]) {
    customerNames.forEach((customerName: string, index: number) => {
      this.props.rawDatas.set(customerName, newRawDatas[index]);
    });
  }

  getAllModeIncluded() {
    this.props.rawDatas.forEach((rawData, key) => {
      const newRawData = rawData.filter((raw) => this.isModeIncluded(raw));
      this.props.rawDatas.set(key, newRawData);
    });
  }

  isModeIncluded(rawData: (string | number)[]): boolean {
    return this.props.conditionmentMode.some((mode) => rawData.includes(mode));
  }

  processVegetableInfo() {
    this.props.rawDatas.forEach((rawData, key) => {
      const newData = rawData
        .map((data) => {
          const vegetableInfo = this.createVegetableInfo(data, key);
          return vegetableInfo.quatity > 0 ? vegetableInfo : null;
        })
        .filter((vegetableInfo) => vegetableInfo !== null);
      this.props.recapByCustomer.set(key, newData);
    });
  }

  createVegetableInfo(raw: (string | number)[], key: string): VegetableInfo {
    let vegetableInfo: VegetableInfo;
    vegetableInfo = {
      vegetableName: raw[process.env.ROW_vegetableName],
      quatity: raw[process.env.ROW_quatity] * raw[process.env.ROW_conditioning],
      unit: raw[process.env.ROW_unit],
      place: raw[process.env.ROW_place],
      customer: key,
    };
    return vegetableInfo;
  }

  initMerge() {
    const arrToMerge: VegetableInfo[][] = [];
    this.props.recapByCustomer.forEach((recap) => {
      arrToMerge.push(recap);
    });
    this.mergeAllVegetableInfoToRecap(arrToMerge);
  }

  mergeAllVegetableInfoToRecap(
    vegetableInfo: VegetableInfo[][]
  ): VegetableInfo[] {
    return (this.props.recap = Object.values(
      vegetableInfo
        .flatMap((subArray) => subArray)
        .reduce((acc, item) => {
          const key = item.vegetableName;

          if (!acc[key]) {
            acc[key] = { ...item };
            acc[key].customer = "TOTAL";
          } else {
            acc[key].quatity += item.quatity;
            acc[key].customer = "TOTAL";
          }
          return acc;
        }, {})
    ));
  }
  sortRecapByPlace(vegetableInfos: VegetableInfo[]) {
    const vegetableSort: VegetableInfo[] = vegetableInfos.sort((a, b) => {
      return a.place.localeCompare(b.place);
    });
    return vegetableSort;
  }
  getVegetableInfoByCustomer(customer: string): VegetableInfo[] {
    return this.props.recapByCustomer.get(customer);
  }
  setAllRecap() {
    this.props.recapByCustomer.forEach((value, key, map) => {
      value = this.sortRecapByPlace(value);
    });
    this.props.allRecap = this.props.recapByCustomer;
    this.props.allRecap.set("TOTAL", this.props.recap);
  }

  getAllRecap() {
    return this.props.allRecap;
  }

  setAllVegetableName(allRecap: Map<string, VegetableInfo[]>): string[] {
    const allVegetableName = [];
    allRecap.forEach((value, key, map) => {
      value.forEach((vegetableInfo) => {
        if (!allVegetableName.includes(vegetableInfo.vegetableName)) {
          allVegetableName.push(vegetableInfo.vegetableName);
        }
      });
    });
    this.props.allVegetableName = allVegetableName;
    return allVegetableName;
  }

  formateRecap(
    allRecap: Map<string, VegetableInfo[]>
  ): (VegetableInfo[] | string)[] {
    const formateRecap: (VegetableInfo[] | string)[] = [];
    allRecap.forEach((value, key, map) => {
      formateRecap.push(key);
      formateRecap.push(value);
    });
    this.props.formateRecap = formateRecap;
    return formateRecap;
  }

  getQuantity(customerName: string, vegeName: string) {
    let quantity: number;
    const vegeInfo = this.props.allRecap.get(customerName);
    vegeInfo.forEach((vegeInfo) => {
      if (vegeInfo.vegetableName === vegeName) {
        quantity = vegeInfo.quatity;
      }
    });
    return quantity;
  }

  addBlankInPlace(formateRecap: (VegetableInfo[] | string)[]) {
    let result: (VegetableInfo[] | string)[] = [];
    let lastPlace = "";
    formateRecap.forEach((item, index) => {
        if (typeof item === "string") {
          result.push(item);
        } else {
          let infos = [];
          item.forEach((vegeInfo: VegetableInfo) => {
            if (vegeInfo.place !== lastPlace) {
              infos.push("");
              lastPlace = vegeInfo.place;
            }
            infos.push(vegeInfo);
          });
          result.push(infos);
        }
      
    });
    return result;
  }

}

import { Recap } from "core/domains/entities/Recap";
import { Usecases } from "../Usecases";
import { RawData } from "core/domains/type/RawData";
import { CreateRecap } from "./create";
import { AddConditionmentMode } from "./AddConditionmentMode";
import { AddRawDatas } from "./AddRawDatas";
import { GetAllModeInclued } from "./GetAllModeInclued";
import { ProcessVegetableInfo } from "./ProcessVegetableInfo";
import { SortByPlace } from "./SortByPlace";
import { MergeRecap } from "./MergeRecap";
import { SetAllRecap } from "./SetAllRecap";
import { FormateRecap } from "./FormateRecap";
import { injectable } from "inversify";
import { AddPlankInPlace } from "./AddBlankInPlace";

export interface InitRecapProps {
  modes: string[];
  newRawDatas: RawData[];
  customerNames: string[];
}

@injectable()
export class InitRecap implements Usecases<InitRecapProps, Recap> {
  constructor(
    private readonly createRecap: CreateRecap,
    private readonly addConditionmentMode: AddConditionmentMode,
    private readonly addRawDatas: AddRawDatas,
    private readonly getAllModeInclued: GetAllModeInclued,
    private readonly processVegetableInfo: ProcessVegetableInfo,
    private readonly sortByPlace: SortByPlace,
    private readonly mergeRecap: MergeRecap,
    private readonly setAllRecap: SetAllRecap,
    private readonly formateRecap: FormateRecap,
    private readonly addPlankInPlace: AddPlankInPlace,
  ) {}
  execute(payload: InitRecapProps): Recap {
    let recap = this.createRecap.execute();
    recap = this.addConditionmentMode.execute({
      modes: payload.modes,
      recap: recap,
    });
    recap = this.addRawDatas.execute({
      recap,
      newRawDatas: payload.newRawDatas,
      customerNames: payload.customerNames,
    });
    recap = this.getAllModeInclued.execute(recap);
    recap = this.processVegetableInfo.execute(recap);
    recap = this.mergeRecap.execute(recap);
    recap = this.sortByPlace.execute(recap);
    recap = this.setAllRecap.execute(recap);
    recap = this.formateRecap.execute(recap);
    recap = this.addPlankInPlace.execute(recap);
    return recap;
  }
}

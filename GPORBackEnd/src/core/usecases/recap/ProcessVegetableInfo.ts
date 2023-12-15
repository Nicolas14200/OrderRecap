import { injectable } from "inversify";
import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";

@injectable()
export class ProcessVegetableInfo implements Usecases<Recap, Recap> {
  execute(recap: Recap): Recap {
    recap.processVegetableInfo();
    return recap;
  }
}

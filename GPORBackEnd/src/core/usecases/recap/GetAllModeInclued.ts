import { injectable } from "inversify";
import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";

@injectable()
export class GetAllModeInclued implements Usecases<Recap, Recap> {
  execute(recap: Recap): Recap {
    recap.getAllModeIncluded();
    return recap;
  }
}

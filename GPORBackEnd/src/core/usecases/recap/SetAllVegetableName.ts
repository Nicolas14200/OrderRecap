import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";
import { injectable } from "inversify";

@injectable()
export class SetAllVegetableName implements Usecases<Recap, Recap> {
    execute(recap: Recap): Recap {
        recap.setAllVegetableName(recap.props.allRecap)
        return recap;
    }

}
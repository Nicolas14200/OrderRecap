import { injectable } from "inversify";
import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";

@injectable()
export class AddPlankInPlace implements Usecases<Recap, Recap> {
    execute(recap: Recap): Recap{
        recap.props.formateRecap = recap.addBlankInPlace(recap.props.formateRecap);
        return recap;
    }

}
import { injectable } from "inversify";
import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";

@injectable()
export class FormateRecap implements Usecases<Recap, Recap> {
    execute(recap: Recap): Recap  {
        recap.formateRecap(recap.props.allRecap);
        return recap;
    }
    
}
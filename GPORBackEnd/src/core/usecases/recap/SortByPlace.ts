import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";
import { injectable } from "inversify";
@injectable()
export class SortByPlace implements Usecases<Recap, Recap>{
    execute(recap: Recap): Recap  {
        recap.props.recap = recap.sortRecapByPlace(recap.props.recap);
        return recap;
    }

}
import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";
import { injectable } from "inversify";
export interface AddConditionmentModeProps {
  recap: Recap;
  modes: string[];
}
@injectable()
export class AddConditionmentMode
  implements Usecases<AddConditionmentModeProps, Recap>
{
  execute(props: AddConditionmentModeProps) {
    props.recap.addConditionmentMode(props.modes);
    return props.recap;
  }
}

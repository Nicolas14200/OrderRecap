import { Usecases } from "../Usecases";
import { RawData } from "../../../core/domains/type/RawData";
import { injectable } from "inversify";
import { Recap } from "core/domains/entities/Recap";

export interface AddRawDataProps {
    recap: Recap,
    newRawDatas: RawData[], 
    customerNames: string[]
}

@injectable()
export class AddRawDatas implements Usecases<AddRawDataProps, Recap> {
  execute(props: AddRawDataProps) {
    props.recap.addRawDatas(props.newRawDatas, props.customerNames);
    return props.recap;
  }
}

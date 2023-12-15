import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";
import { VegetableInfo } from "../../../core/domains/valuesObjects/VegetableInfo";
import { injectable } from "inversify";
export interface GetVegetableInfoByCustomerProps {
  recap: Recap;
  customer: string;
}

@injectable()
export class GetVegetableInfoByCustomer
  implements Usecases<GetVegetableInfoByCustomerProps, VegetableInfo[]>
{
  execute(payload: GetVegetableInfoByCustomerProps) {
    return payload.recap.getVegetableInfoByCustomer(payload.customer);
  }
}

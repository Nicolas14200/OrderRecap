import { injectable } from "inversify";
import { Recap } from "../../../core/domains/entities/Recap";
import { Usecases } from "../Usecases";
export interface GetQuantityProps{
    recap: Recap,
    customerName:string,
    vegeName: string
}
@injectable()
export class GetQuantity implements Usecases<GetQuantityProps, number>{
    execute(payload: GetQuantityProps): number  {
        return payload.recap.getQuantity(payload.customerName, payload.vegeName);
    }

}
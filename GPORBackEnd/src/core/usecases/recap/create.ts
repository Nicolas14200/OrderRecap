import { injectable } from "inversify";
import { Recap } from "../../domains/entities/Recap";
import { Usecases } from "../Usecases";

@injectable()
export class CreateRecap implements Usecases<void, Recap> {
    execute(): Recap {
        return Recap.create()
    }
}
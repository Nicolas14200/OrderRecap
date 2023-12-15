export interface Usecases<I,O>{
    execute(payload?:I): Promise<O> | O
} 
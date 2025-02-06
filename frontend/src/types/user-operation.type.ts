import { OperationType } from "./operation.type"

export type UserOperationType = {
    id: number,
    type: OperationType,
    amount: number,
    date: Date,
    comment: string,
    category: string,
    category_id?: number
}
import { CategoryExpenseServices } from "../services/category-expenses-services";
import { CategoryIncomeServices } from "../services/category-income-services";
import { CategoryType } from "../types/category.type";
import { OperationType } from "../types/operation.type";
import { PatternResponseType } from "../types/pattern-response.type";

export class ListCategoriesUtils {
    public static async getCategories(operationType: OperationType): Promise<CategoryType[]> {
        let response: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        if (operationType === OperationType.income) {
            response = await CategoryIncomeServices.getCategories();
        } else if (operationType === OperationType.expense) {
            response = await CategoryExpenseServices.getCategories();
        }

        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при получении списка категорий.');
        }

        return response.content;
    }
}
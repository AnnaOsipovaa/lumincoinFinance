import { CategoryExpenseServices } from "../services/category-expenses-services";
import { CategoryIncomeServices } from "../services/category-income-services";

export class ListCategoriesUtils {
    static async getCategories(operationType) {
        let response = null;
        if (operationType === 'income') { 
            response = await CategoryIncomeServices.getCategories();
        } else if (operationType === 'expense') {
            response = await CategoryExpenseServices.getCategories();
        }

        if (response.error || response.redirect) {
            alert('Ошибка при получении списка категорий.');
            return response.redirect ? this.openRoute(response.redirect) : null;
        }

        return response.content;
    }
}
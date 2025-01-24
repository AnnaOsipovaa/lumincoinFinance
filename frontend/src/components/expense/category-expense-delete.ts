import { CategoryExpenseServices } from "../../services/category-expenses-services.js";
import { URLUtils } from "../../utils/url-utils.js";

export class CategoryExpensesDelete {
    constructor(openRoute) {
        this.openRoute = openRoute;

        const categoryId = URLUtils.getUrlParam('id');
        if (!categoryId) {
            this.openRoute('/login');
            return;
        }

        this.delete(categoryId);
    }

    async delete(id) {
        const response = await CategoryExpenseServices.deleteCategory(id);
        if (response.error || response.redirect) {
            alert('Ошибка при удалении категории.')
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.openRoute('/expenses-category-list');
    }
}
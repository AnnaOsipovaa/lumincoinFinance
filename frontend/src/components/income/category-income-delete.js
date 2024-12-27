import { CategoryIncomeServices } from "../../services/category-income-services.js";
import { URLUtils } from "../../utils/url-utils.js";

export class CategoryIncomeDelete {
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
        const response = await CategoryIncomeServices.deleteCategory(id);
        if (response.error || response.redirect) {
            alert('Ошибка при редактированиии категории.')
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.openRoute('/income-category-list');
    }
}
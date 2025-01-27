import { CategoryExpenseServices } from "../../services/category-expenses-services";
import { PatternResponseType } from "../../types/pattern-response.type";
import { URLUtils } from "../../utils/url-utils";

export class CategoryExpensesDelete {
    readonly openRoute: any;

    constructor(openRoute: any) {
        this.openRoute = openRoute;

        const categoryId: number = Number(URLUtils.getUrlParam('id'));
        if (!categoryId) {
            this.openRoute('/login');
            return;
        }

        this.delete(categoryId);
    }

    private async delete(id: number): Promise<any> {
        const response: PatternResponseType = await CategoryExpenseServices.deleteCategory(id);
        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при удалении категории.')
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        return this.openRoute('/expenses-category-list');
    }
}
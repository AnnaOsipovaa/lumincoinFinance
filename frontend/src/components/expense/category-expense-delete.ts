import { CategoryExpenseServices } from "../../services/category-expenses-services";
import { OpenRouteType } from "../../types/open-route.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { URLUtils } from "../../utils/url-utils";

export class CategoryExpensesDelete {
    readonly openRoute: OpenRouteType;

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;

        const categoryId: number = Number(URLUtils.getUrlParam('id'));
        if (!categoryId) {
            this.openRoute('/login');
            return;
        }
        this.delete(categoryId);
    }

    private async delete(id: number): Promise<void> {
        const response: PatternResponseType = await CategoryExpenseServices.deleteCategory(id);
        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при удалении категории.')
            if(response.redirect){
                this.openRoute(response.redirect);
            }
            return;
        }
        this.openRoute('/expenses-category-list');
    }
}
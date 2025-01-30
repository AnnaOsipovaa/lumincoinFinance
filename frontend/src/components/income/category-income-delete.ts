import { CategoryIncomeServices } from "../../services/category-income-services";
import { OpenRouteType } from "../../types/open-route.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { URLUtils } from "../../utils/url-utils";

export class CategoryIncomeDelete {
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

    async delete(id: number): Promise<void> {
        const response: PatternResponseType = await CategoryIncomeServices.deleteCategory(id);
        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при удалении категории.')
            if(response.redirect){
                this.openRoute(response.redirect);
            }
            return;
        }
        this.openRoute('/income-category-list');
    }
}
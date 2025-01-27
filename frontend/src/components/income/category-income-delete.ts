import { CategoryIncomeServices } from "../../services/category-income-services";
import { PatternResponseType } from "../../types/pattern-response.type";
import { URLUtils } from "../../utils/url-utils";

export class CategoryIncomeDelete {
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
        return;
    }
}
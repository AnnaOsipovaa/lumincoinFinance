import { OperationsServices } from "../../services/operations-services";
import { PatternResponseType } from "../../types/pattern-response.type";
import { URLUtils } from "../../utils/url-utils";

export class OperationsDelete {
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

    private async delete(id: number): Promise<void> {
        const response: PatternResponseType = await OperationsServices.deleteOperation(id);
        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при удалении операции.')
            if(response.redirect){
                this.openRoute(response.redirect);
            }
            return;
        }
        this.openRoute('/operations-list');
    }
}
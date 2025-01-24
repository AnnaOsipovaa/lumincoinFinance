import { OperationsServices } from "../../services/operations-services.js";
import { URLUtils } from "../../utils/url-utils.js";

export class OperationsDelete {
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
        const response = await OperationsServices.deleteOperation(id);
        if (response.error || response.redirect) {
            alert('Ошибка при удалении операции.')
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.openRoute('/operations-list');
    }
}
import { CategoryExpenseServices } from "../../services/category-expenses-services";
import { OpenRouteType } from "../../types/open-route.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { ValidationType } from "../../types/validation.type";
import { ValidationUtils } from "../../utils/validation-utils";

export class CategoryExpenseCreate {
    readonly openRoute: OpenRouteType;
    readonly inputNameCategoryElement: HTMLInputElement | null;
    readonly validations: ValidationType[];

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;
        this.inputNameCategoryElement = document.getElementById('name-category') as HTMLInputElement;

        const createCategoryBtnElement: HTMLElement | null = document.getElementById('create-category');
        if (createCategoryBtnElement) {
            createCategoryBtnElement.addEventListener('click', this.create.bind(this));
        }

        this.validations = [
            { element: this.inputNameCategoryElement }
        ];
    }

    private async create(): Promise<void> {
        if (ValidationUtils.validateForm(this.validations)) {
            const response: PatternResponseType = await CategoryExpenseServices.createCategory({
                title: this.inputNameCategoryElement!.value
            });

            if (response.error || response.redirect || !response.content) {
                alert('Ошибка при создании категории.');
                if(response.redirect){
                    this.openRoute(response.redirect);
                }
                return;
            }
            this.openRoute('/expenses-category-list');
        }
    }
}
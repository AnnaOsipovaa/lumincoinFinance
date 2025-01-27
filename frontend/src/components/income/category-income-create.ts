import { CategoryIncomeServices } from "../../services/category-income-services";
import { PatternResponseType } from "../../types/pattern-response.type";
import { ValidationType } from "../../types/validation.type";
import { ValidationUtils } from "../../utils/validation-utils";

export class CategoryIncomeCreate {
    readonly openRoute: any;
    readonly inputNameCategoryElement: HTMLInputElement | null;
    readonly validations: ValidationType[];

    constructor(openRoute: any) {
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
            const response: PatternResponseType = await CategoryIncomeServices.createCategory({
                title: this.inputNameCategoryElement!.value
            });

            if (response.error || response.redirect || !response.content) {
                alert('Ошибка при создании категории.');
                if(response.redirect){
                    this.openRoute(response.redirect);
                }
                return;
            }
            this.openRoute('/income-category-list');
            return;
        }
    }
}
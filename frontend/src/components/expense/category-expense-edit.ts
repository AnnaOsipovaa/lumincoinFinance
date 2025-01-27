import { CategoryExpenseServices } from "../../services/category-expenses-services";
import { CategoryType } from "../../types/category.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { ValidationType } from "../../types/validation.type";
import { URLUtils } from "../../utils/url-utils";
import { ValidationUtils } from "../../utils/validation-utils";

export class CategoryExpensesEdit {
    readonly openRoute: any; 
    readonly nameCategoryElement: HTMLInputElement | null;
    private category: CategoryType | null;

    constructor(openRoute: any) {
        this.openRoute = openRoute;
        this.nameCategoryElement = document.getElementById('name-category') as HTMLInputElement;
        this.category = null;

        const categoryId: number = Number(URLUtils.getUrlParam('id'));
        if (!categoryId) {
            this.openRoute('/login');
            return;
        }

        this.getCategory(categoryId);

        const saveCategoryBtnElement: HTMLElement | null = document.getElementById('save-category');
        if(saveCategoryBtnElement){
            saveCategoryBtnElement.addEventListener('click', this.save.bind(this));
        }
    }

    private async getCategory(id: number): Promise<void> {
        const response: PatternResponseType = await CategoryExpenseServices.getCategory(id);
        if (response.error || response.redirect || !response.content) {
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.category = response.content;
        this.nameCategoryElement!.value = response.content.title;
    }

    private async save(): Promise<void> {
        if(!this.category) return;

        const validations: ValidationType[] = [
            { element: <HTMLInputElement>this.nameCategoryElement, options: { notEqualTo: this.category.title } }
        ];

        if (ValidationUtils.validateForm(validations)) {
            const response = await CategoryExpenseServices.editCategory(this.category.id, {
                title: this.nameCategoryElement!.value
            });

            if (response.error || response.redirect) {
                alert('Ошибка при редактированиии категории.')
                if (response.redirect) {
                    this.openRoute(response.redirect);
                }
                return;
            }
            this.openRoute('/expenses-category-list');
            return;
        }
    }
}
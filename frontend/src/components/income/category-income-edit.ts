import { CategoryIncomeServices } from "../../services/category-income-services";
import { CategoryType } from "../../types/category.type";
import { OpenRouteType } from "../../types/open-route.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { ValidationType } from "../../types/validation.type";
import { URLUtils } from "../../utils/url-utils";
import { ValidationUtils } from "../../utils/validation-utils";

export class CategoryIncomeEdit {
    readonly openRoute: OpenRouteType;
    readonly nameCategoryElement: HTMLInputElement | null;
    private category: CategoryType | null;

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;
        this.category = null;
        this.nameCategoryElement = document.getElementById('name-category') as HTMLInputElement;

        const categoryId: number = Number(URLUtils.getUrlParam('id'));
        if (!categoryId) {
            this.openRoute('/login');
            return;
        }

        this.getCategory(categoryId);

        const saveCategoryBtnElement: HTMLElement | null = document.getElementById('save-category');
        if (saveCategoryBtnElement) {
            saveCategoryBtnElement.addEventListener('click', this.save.bind(this));
        }
    }

    async getCategory(id: number) {
        const response: PatternResponseType = await CategoryIncomeServices.getCategory(id);
        if (response.error || response.redirect || !response.content) {
            if (response.redirect) {
                this.openRoute(response.redirect);
            }
            return;
        }
        this.category = response.content;
        this.nameCategoryElement!.value = response.content.title;
    }

    async save() {
        if(!this.category) return;
 
        const validations: ValidationType[] = [
            { element: <HTMLInputElement>this.nameCategoryElement, options: { notEqualTo: this.category!.title } }
        ];

        if (ValidationUtils.validateForm(validations)) {
            const response = await CategoryIncomeServices.editCategory(this.category.id, {
                title: this.nameCategoryElement!.value
            });

            if (response.error || response.redirect) {
                alert('Ошибка при редактированиии категории.')
                if (response.redirect) {
                    this.openRoute(response.redirect);
                }
                return;
            }
            this.openRoute('/income-category-list');
        }
    }
}
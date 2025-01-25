import config from '../config/config';
import { PatternResponseType } from '../types/pattern-response.type';
import { HttpUtils } from '../utils/http-utils';

export class CategoryExpenseServices {
    public static async getCategories(): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/expense', true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = categoryResponse.redirect;
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    public static async getCategory(id: number): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/expense/' + id, true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/expenses-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    public static async editCategory(id: number, data: object): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/expense/' + id, true, 'PUT', data);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/expenses-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    public static async createCategory(data: object): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/expense', true, 'POST', data);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/expenses-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    public static async deleteCategory(id: number): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/expense/' + id, true, 'DELETE');

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/expenses-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }
}
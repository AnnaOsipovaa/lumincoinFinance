import config from '../config/config';
import { PatternResponseType } from '../types/pattern-response.type';
import { HttpUtils } from '../utils/http-utils';

export class CategoryIncomeServices {
    public static async getCategories(): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/income', true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/login';
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

        const categoryResponse: PatternResponseType = await HttpUtils.responce(config.api + '/categories/income/' + id, true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/income-category-list';
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

        const categoryResponse: PatternResponseType  = await HttpUtils.responce(config.api + '/categories/income/' + id, true, 'PUT', data);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/income-category-list';
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

        const categoryResponse: PatternResponseType  = await HttpUtils.responce(config.api + '/categories/income', true, 'POST', data);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/income-category-list';
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

        const categoryResponse: PatternResponseType  = await HttpUtils.responce(config.api + '/categories/income/' + id, true, 'DELETE');

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if (categoryResponse.redirect) {
                returnObject.redirect = '/income-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }
}
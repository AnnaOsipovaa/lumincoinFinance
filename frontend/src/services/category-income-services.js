import config from '../config/config.js';
import { HttpUtils } from '../utils/http-utils.js';

export class CategoryIncomeServices{
    static async getCategories(){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse = await HttpUtils.responce(config.api + '/categories/income', true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if(categoryResponse.redirect){
                returnObject.redirect = '/login';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    static async getCategory(id){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse = await HttpUtils.responce(config.api + '/categories/income/' + id, true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if(categoryResponse.redirect){
                returnObject.redirect = '/income-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }
 
    static async editCategory(id, data){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse = await HttpUtils.responce(config.api + '/categories/income/' + id, true, 'PUT', data);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if(categoryResponse.redirect){
                returnObject.redirect = '/income-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    static async createCategory(data){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse = await HttpUtils.responce(config.api + '/categories/income', true, 'POST', data);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if(categoryResponse.redirect){
                returnObject.redirect = '/income-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }

    static async deleteCategory(id){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse = await HttpUtils.responce(config.api + '/categories/income/' + id, true, 'DELETE');

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if(categoryResponse.redirect){
                returnObject.redirect = '/income-category-list';
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }
}
import config from '../config/config.js';
import { HttpUtils } from '../utils/http-utils.js';

export class CategoryExpenseServices{
    static async getCategories(){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const categoryResponse = await HttpUtils.responce(config.api + '/categories/expense', true);

        if (categoryResponse.error || categoryResponse.redirect || !categoryResponse.content) {
            returnObject.error = true;
            if(categoryResponse.redirect){
                returnObject.redirect = true;
            }
        }
        returnObject.content = categoryResponse.content;
        return returnObject;
    }
}
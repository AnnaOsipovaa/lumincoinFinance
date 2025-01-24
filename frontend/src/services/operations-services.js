import config from '../config/config.js';
import { HttpUtils } from '../utils/http-utils.js';

export class OperationsServices {
    static async getOperations(data) {  
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse = await HttpUtils.responce(config.api + '/operations' + data, true);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/login';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }

   
    static async getOperation(id){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse = await HttpUtils.responce(config.api + '/operations/' + id, true);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if(operationsResponse.redirect){
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }
  
    static async editOperation(id, data){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse = await HttpUtils.responce(config.api + '/operations/' + id, true, 'PUT', data);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if(operationsResponse.redirect){
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }
    
    static async createOperation(data) {
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse = await HttpUtils.responce(config.api + '/operations', true, 'POST', data);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content || !operationsResponse.content.id) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }
    
    static async deleteOperation(id){
        const returnObject = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse = await HttpUtils.responce(config.api + '/operations/' + id, true, 'DELETE');

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if(operationsResponse.redirect){
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }
}
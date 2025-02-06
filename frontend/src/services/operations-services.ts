import config from '../config/config';
import { PatternResponseType } from '../types/pattern-response.type';
import { HttpUtils } from '../utils/http-utils';

export class OperationsServices {
    static async getOperations(data: string): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse: PatternResponseType = await HttpUtils.responce(config.api + '/operations' + data, true);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/login';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }


    static async getOperation(id: number): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse: PatternResponseType = await HttpUtils.responce(config.api + '/operations/' + id, true);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }

    static async editOperation(id: number, data: object): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse: PatternResponseType = await HttpUtils.responce(config.api + '/operations/' + id, true, 'PUT', data);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }

    static async createOperation(data: object): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse: PatternResponseType = await HttpUtils.responce(config.api + '/operations', true, 'POST', data);

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content || !operationsResponse.content.id) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }

    static async deleteOperation(id: number): Promise<PatternResponseType> {
        const returnObject: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        };

        const operationsResponse: PatternResponseType = await HttpUtils.responce(config.api + '/operations/' + id, true, 'DELETE');

        if (operationsResponse.error || operationsResponse.redirect || !operationsResponse.content) {
            returnObject.error = true;
            if (operationsResponse.redirect) {
                returnObject.redirect = '/operations-list';
            }
        }
        returnObject.content = operationsResponse.content;
        return returnObject;
    }
}
export class HttpUtils {
    static async responce(url, method = 'GET', body = null, authorization = false) {
        const result = {
            error: false,
            redirect: false,
            response: null
        }

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        if (authorization) {
            // тут прикрепляем токен, если запрос авторизованный 
        }

        let response = null;
        try {
            response = await fetch(url, params);
            result.response = await response.json();
        } catch (error) {
            result.error = true;
        }

        if (response.status < 200 || response.status > 299) {
            if (authorization && result.status === 401) {
                // место для рефреша и повторного вызова
            }
            result.error = true;
            result.redirect = '/login';
        }

        return result;
    }
}
export class URLUtils{
    static getUrlParam(name){
        let result = null;
        if(name){
            const params = new URLSearchParams(window.location.search);
            const param = params.get(name)
            if(param){
                result = param;
            }
        }
        return result;
    }
}
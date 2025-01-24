export class URLUtils {
    public static getUrlParam(name: string): string {
        let result: string = '';
        if (name) {
            const params: URLSearchParams = new URLSearchParams(window.location.search);
            const param: string | null = params.get(name);
            if (param) {
                result = param;
            }
        }
        return result;
    }
}
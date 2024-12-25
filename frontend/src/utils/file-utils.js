export class FileUtils {
    static loadPageScript(src) {
        return new Promise((res, rej) => {
            const script = document.createElement('script');
            script.src = 'js/' + src;
            script.onload = () => res();
            script.onerror = () => rej();
            document.body.appendChild(script);
        })
    }

    static loadPageStyle(href){
        const link = document.createElement('link');
        link.href = '/styles/' + href;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
}
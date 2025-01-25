export class FileUtils {
    public static loadPageScript(src: string): Promise<void>{
        return new Promise<void>((res, rej) => {
            const script: HTMLScriptElement = document.createElement('script');
            script.src = 'js/' + src;
            script.onload = () => res();
            script.onerror = () => rej();
            document.body.appendChild(script);
        })
    }

    public static loadPageStyle(href: string): void{
        const link: HTMLLinkElement = document.createElement('link');
        link.href = '/styles/' + href;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
}
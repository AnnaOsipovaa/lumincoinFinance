export class LayoutMenuUtils{
    public static markMenu(path: string) {
        const menuItemsElement: HTMLCollectionOf<Element> = document.getElementsByClassName('layout__menu-link');
        const accordionBtnElement: HTMLElement | null = document.getElementById('accordion-btn');
        const categoryListElement: HTMLElement | null = document.getElementById('category-list')

        for (let i = 0; i < menuItemsElement.length; i++) {
            const element: Element = menuItemsElement[i];
            const url: URL = new URL((element as HTMLAnchorElement).href);

            if (path === url.pathname) {
                element.classList.add('active');
                if (element.classList.contains('accordion__menu-link')) {
                    categoryListElement?.classList.add('show');
                    accordionBtnElement?.classList.remove('collapsed');
                    accordionBtnElement?.setAttribute('aria-expanded', 'aria-expanded');
                }
            } else {
                element.classList.remove('active');
            }
        }
    }
}
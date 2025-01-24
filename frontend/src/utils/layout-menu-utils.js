export class LayoutMenuUtils{
    static markMenu(path) {
        this.menuItemsElement = document.getElementsByClassName('layout__menu-link');
        const accordionBtnElement = document.getElementById('accordion-btn');
        const categoryListElement = document.getElementById('category-list')

        for (let i = 0; i < this.menuItemsElement.length; i++) {
            const element = this.menuItemsElement[i];
            const url = new URL(element.href);

            if (path === url.pathname) {
                element.classList.add('active');
                if (element.classList.contains('accordion__menu-link')) {
                    categoryListElement.classList.add('show');
                    accordionBtnElement.classList.remove('collapsed');
                    accordionBtnElement.setAttribute('aria-expanded', true);
                }
            } else {
                element.classList.remove('active');
            }
        }
    }
}
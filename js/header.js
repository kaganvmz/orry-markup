const pageBody = document.querySelector('body');
const langToggle = document.getElementById('lang__toggle');
const langToggleIcon = document.querySelector('.lang__toggle__icon');
const langToggleIconUp = document.querySelector('.lang__toggle__icon--up');
const langDropdown = document.getElementById('lang__dropdown');
const burgerMenu = document.getElementById('burger-menu__icon');

//css class
const langDropdownOpenClass = 'lang__dropdown--opened';

const closeLanguageDropdown = () => {
    langToggleIcon.classList.remove('lang__toggle__icon--closed');
    langToggleIconUp.classList.remove('lang__toggle__icon--opened');
    langDropdown.classList.remove(langDropdownOpenClass);
};

const toggleLanguage = () => {
    langToggleIcon.classList.toggle('lang__toggle__icon--closed');
    langToggleIconUp.classList.toggle('lang__toggle__icon--opened');
    langDropdown.classList.toggle(langDropdownOpenClass);

    if (langDropdown.classList.contains(langDropdownOpenClass)) {
        const langDropdownItems = document.querySelectorAll('.lang__dropdown__item span');
        const langToggle = document.querySelector('#lang__toggle .lang__toggle__name');
        langDropdownItems.forEach((langOption) => {
            langOption.addEventListener('click', (e) => {
                langToggle.textContent = e.target.dataset.lang;

                langDropdown.classList.remove(langDropdownOpenClass);
                closeLanguageDropdown();
            });
        });
    }
};

const openMenu = () => {
    const menu = document.getElementById('menu');
    const menuOpenedClass = 'menu--opened';
    menu.classList.add(menuOpenedClass);
    pageBody.style.overflow = 'hidden';
    const closeMenuBtn = document.getElementById('menu__btn-close');
    const menuItemList = document.querySelectorAll('.menu__item_link');

    closeMenuBtn.addEventListener('click', () => {
        menu.classList.remove(menuOpenedClass);
        pageBody.style.overflow = 'auto';
    });

    menuItemList.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
            menu.classList.remove(menuOpenedClass);
        });
    });
};

langToggle.addEventListener('click', toggleLanguage);
burgerMenu.addEventListener('click', openMenu);

document.addEventListener('click', (event) => {
    const isDropdownOpened = !langToggle.contains(event.target) && !langDropdown.contains(event.target);

    if (isDropdownOpened && langDropdown.classList.contains(langDropdownOpenClass)) {
        closeLanguageDropdown();
    }
});

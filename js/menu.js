const langToggle = document.getElementById('lang__toggle');
const langToggleIcon = document.querySelector('.lang__toggle__icon');
const langToggleIconUp = document.querySelector('.lang__toggle__icon--up');
const langDropdown = document.getElementById('lang__dropdown');
const burgerMenu = document.getElementById('burger-menu__icon');
const closeModalBtn = document.getElementById('modal-close');
const modal = document.getElementById('modal');
const serviceIconList = document.querySelectorAll('.service-info__icon');

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

    const closeMenuBtn = document.getElementById('menu__btn-close');
    const menuItemList = document.querySelectorAll('.menu__item_link');

    closeMenuBtn.addEventListener('click', () => {
        menu.classList.remove(menuOpenedClass);
    });

    menuItemList.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
            menu.classList.remove(menuOpenedClass);
        });
    });
};

//Modal
const openModal = (e) => {
    const contentKey = e.target.getAttribute('data-service');
    const modalSpecificClass = `modal--${contentKey}`;
    const currentModal = document.getElementById(`modal-${contentKey}`);
    modal.contentKey = contentKey;

    currentModal.classList.remove(modalSpecificClass);

    if (contentKey === 'map-pin') {
        setLocationModalContent();
    }

    modal.showModal();
};

const setLocationModalContent = () => {
    const copyBtn = document.getElementById('btn-copy');
    const btnCopied = document.getElementById('btn-copied');

    copyBtn.addEventListener('click', () => {
        const locationInfo = 'вулиця Григорія Сковороди, 7 Київ, Україна';
        copyBtn.classList.add('btn-copy--hidden');
        btnCopied.classList.remove('btn-copied--hidden');

        navigator.clipboard.writeText(locationInfo);
    });
};

const resetModalContent = () => {
    const modalContentWrapper = document.getElementById(`modal-${modal.contentKey}`);
    const modalContentClass = `modal--${modal.contentKey}`;
    const copyBtn = document.getElementById('btn-copy');
    const btnCopied = document.getElementById('btn-copied');

    modalContentWrapper.classList.add(modalContentClass);

    if (modal.contentKey === 'map-pin') {
        copyBtn.classList.remove('btn-copy--hidden');
        btnCopied.classList.add('btn-copied--hidden');
    }
};

const closeModal = () => {
    resetModalContent();
    modal.setAttribute('close', '');
    modal.removeAttribute('close');

    modal.close();
};

const closeOutsideDialog = (e) => {
    if (e.target.tagName !== 'DIALOG') return;

    const rect = e.target.getBoundingClientRect();
    const clickOnDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

    if (!clickOnDialog) {
        closeModal();
    }
};

langToggle.addEventListener('click', toggleLanguage);
burgerMenu.addEventListener('click', openMenu);
serviceIconList.forEach((serviceIcon) => {
    serviceIcon.addEventListener('click', openModal);
});
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', closeOutsideDialog);

document.addEventListener('click', (event) => {
    const isDropdownOpened = !langToggle.contains(event.target) && !langDropdown.contains(event.target);

    if (isDropdownOpened && langDropdown.classList.contains(langDropdownOpenClass)) {
        closeLanguageDropdown();
    }
});


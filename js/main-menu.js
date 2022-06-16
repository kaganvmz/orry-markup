const categoriesSticky = document.querySelector('.categories__wrap');
const specialMenuSlides = document.querySelectorAll('.landing .swiper--menu__slide');

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination'
    }
});

const specialMenu = () => {
    const menu = document.getElementById('special-menu');
    const menuOpenedClass = 'special-menu--opened';
    menu.classList.add(menuOpenedClass);

    const closeMenuBtn = document.getElementById('special-menu__btn-close');

    closeMenuBtn.addEventListener('click', () => {
        menu.classList.remove(menuOpenedClass);
    });
};

const menuSliderPaginationWidth = () => {
    const menuSlider = document.querySelector('.swiper--menu');
    const specialMenuSliderBullets = document.querySelectorAll('.swiper-pagination-bullet');
    const bulletsAmounts = specialMenuSliderBullets.length;
    const sidesPadding = 32;
    const bulletWidth = (menuSlider.offsetWidth - sidesPadding) / bulletsAmounts;

    specialMenuSliderBullets.forEach((sliderBullet) => {
        sliderBullet.style.width = bulletWidth + 'px';
    });
};

const openSpecialMenu = () => {
    specialMenuSlides.forEach((slide) => {
        slide.addEventListener('click', () => {
            specialMenu();
        });
    });
};

const dishNameRemoveEllipsis = () => {
    const dishNameList = document.querySelectorAll('.dish__name');

    dishNameList.forEach((dishName) => {
        const elementContent = dishName.textContent;
        const maxCharInContent = 60;

        if (elementContent.length >= maxCharInContent) {
            dishName.textContent = `${elementContent.substring(0, maxCharInContent)}...`;
        }
    });
};

const dishExpandInfo = () => {
    const dishList = document.querySelectorAll('.dish');

    dishList.forEach((dish) => {
        const dishId = dish.id;
        // const dishImageEl = dish.firstChild.nextSibling;

        dish.addEventListener('click', (e) => {
            const expandedDish = document.querySelector('.dish--expandable--open');
            const dishExpandable = document.getElementById(`${dishId}-expandable`);

            if (expandedDish && expandedDish.id !== `${dishId}-expandable`) {
                expandedDish.classList.remove('dish--expandable--open');
                expandedDish.style.height = '0';
            }

            animateDishInfoExpandable(dishExpandable);
        });
    });
};

const animateDishInfoExpandable = (dishExpandable) => {
    dishExpandable.style.height = dishExpandable.scrollHeight + 'px';
    dishExpandable.classList.toggle('dish--expandable--open');
    dishExpandable.style.height = dishExpandable.classList.contains('dish--expandable--open')
        ? dishExpandable.scrollHeight + 'px'
        : '0';
};

const selectCategory = () => {
    const categoryList = document.querySelectorAll('.category');
    const categoryActiveClass = 'category--active';

    categoryList.forEach((category, categoryOrder) => {
        category.addEventListener('click', (e) => {
            const { target } = e;
            moveCategoryItemIntoView(target);

            if (!target.classList.contains(categoryActiveClass)) {
                const previousSelectedCategory = document.querySelector(`.${categoryActiveClass}`);
                const categoryId = target.dataset.category;
                const categoryMenu = document.getElementById(categoryId);
                // console.log(categoryId);
                previousSelectedCategory.classList.remove(categoryActiveClass);
                target.classList.add(categoryActiveClass);
                categoryMenu.scrollIntoView({ behavior: 'smooth', block: 'end' });
                // target.scrollLeft(-420);
                // target.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
        });
    });
};

const moveCategoryItemIntoView = (currentCategoryItem) => {
    const categoriesParent = document.querySelector('.categories');
    const { left: categoryLeft, right: categoryRight } = currentCategoryItem.getBoundingClientRect();
    const { right: wrapperRight, left: wrapperLeft } = categoriesSticky.getBoundingClientRect();
    const sidePadding = 16;
    const gapBetween = 12;
    const nextCategoryItemPart = 20;
    const rightSideEnd = categoryRight + sidePadding;
    const leftSideEnd = categoryLeft - sidePadding;

    if (rightSideEnd >= wrapperRight) {
        const positionToScroll = rightSideEnd - wrapperRight + gapBetween + nextCategoryItemPart;
        categoriesParent.scrollLeft += positionToScroll;
    }

    if (leftSideEnd < wrapperLeft) {
        const sizeBehindScreen = !!wrapperLeft ? wrapperLeft - Math.abs(leftSideEnd) : Math.abs(leftSideEnd);
        const positionToScroll = Math.abs(sizeBehindScreen) + gapBetween + nextCategoryItemPart;
        categoriesParent.scrollLeft -= Math.abs(positionToScroll);
    }
};

const stickyCategoriesBoxShadow = () => {
    const { top } = categoriesSticky.getBoundingClientRect();
    const customBoxShadow = '0px 15px 10px -15px rgba(0, 0, 0, 0.25)';
    categoriesSticky.style.boxShadow = top === 0 ? customBoxShadow : 'none';
};

dishNameRemoveEllipsis();
menuSliderPaginationWidth();
dishExpandInfo();
selectCategory();
openSpecialMenu();

document.querySelector('.categories').addEventListener('scroll', () => {
    // console.log(categoriesSticky.getBoundingClientRect());
});

window.addEventListener('scroll', () => {
    stickyCategoriesBoxShadow();
});

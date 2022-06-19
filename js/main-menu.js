const categoriesSticky = document.querySelector('.categories__wrap');

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 16,
    pagination: {
        el: '.swiper-pagination'
    }
});

const specialProposalSlider = new Swiper('.slider', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 16,
    pagination: {
        el: '.slider-pagination'
    }
});

const specialMenu = () => {
    const menu = document.getElementById('special-menu');
    const menuOpenedClass = 'special-menu--opened';
    const closeMenuBtn = document.getElementById('special-menu__btn-close');
    menu.classList.add(menuOpenedClass);
    pageBody.style.overflow = 'hidden';

    closeMenuBtn.addEventListener('click', () => {
        menu.classList.remove(menuOpenedClass);
        pageBody.style.overflow = 'auto';
    });
};

const menuSliderPaginationWidth = (parentEl) => {
    const menuSlider = document.querySelector('.swiper--menu');
    const specialMenuSliderBullets = document.querySelectorAll(`.${parentEl} .swiper-pagination-bullet`);
    const bulletsAmount = specialMenuSliderBullets.length;
    const sidesPadding = 32;
    const bulletWidth = (menuSlider.offsetWidth - sidesPadding) / bulletsAmount;

    specialMenuSliderBullets.forEach((sliderBullet) => {
        sliderBullet.style.width = bulletWidth + 'px';
    });
};

const specialProposalPaginationPosition = () => {
    const sliderImg = document.querySelector('.slider .dish__img');
    const sliderPagination = document.querySelector('.slider-pagination');
    const { height } = sliderImg.getBoundingClientRect();

    sliderPagination.style.top = height + 16 + 'px';
};

const openSpecialMenu = () => {
    swiper.on('click', (event) => {
        specialProposalSlider.on('paginationRender', () => {
            menuSliderPaginationWidth('slider');
        });
        specialProposalSlider.slideTo(event.activeIndex);
        specialMenu();
        specialProposalPaginationPosition();
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
        dish.addEventListener('click', () => {
            const dishExpandedList = document.querySelectorAll('.dish__list .dish--expand');

            dish.classList.toggle('dish--expand');

            if (dishExpandedList.length) {
                dishExpandedList[0].classList.remove('dish--expand');
            }
        });
    });
};

const selectCategory = () => {
    const categoryList = document.querySelectorAll('.category');
    const categoryActiveClass = 'category--active';

    categoryList.forEach((category) => {
        category.addEventListener('click', (e) => {
            const { target } = e;
            moveCategoryItemIntoView(target);

            if (!target.classList.contains(categoryActiveClass)) {
                const previousSelectedCategory = document.querySelector(`.${categoryActiveClass}`);
                const categoryId = target.dataset.category;
                const categoryMenu = document.getElementById(categoryId);

                previousSelectedCategory.classList.remove(categoryActiveClass);
                target.classList.add(categoryActiveClass);
                categoryMenu.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
menuSliderPaginationWidth('swiper__wrap');
dishExpandInfo();
selectCategory();
openSpecialMenu();

window.addEventListener('scroll', () => {
    stickyCategoriesBoxShadow();
});

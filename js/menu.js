const closeModalBtn = document.getElementById('modal-close');
const modal = document.getElementById('modal');
const serviceIconList = document.querySelectorAll('.service-info__icon');

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
        btnCopied.classList.remove('btn-copied--hidden');

        setTimeout(() => {
            btnCopied.classList.add('btn-copied--hidden');
        }, 3000)
        navigator.clipboard.writeText(locationInfo);
    });
};

const resetModalContent = () => {
    const modalContentWrapper = document.getElementById(`modal-${modal.contentKey}`);
    const modalContentClass = `modal--${modal.contentKey}`;
    const btnCopied = document.getElementById('btn-copied');

    modalContentWrapper.classList.add(modalContentClass);

    if (modal.contentKey === 'map-pin') {
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

serviceIconList.forEach((serviceIcon) => {
    serviceIcon.addEventListener('click', openModal);
});
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', closeOutsideDialog);

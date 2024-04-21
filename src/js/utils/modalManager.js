import { Modal } from 'bootstrap';

const modalManager = {
    initializeModal: function (modalId, modalContent) {
        const modalElement = document.getElementById(modalId);
        const modal = new Modal(modalElement);
        const modalBody = modalElement.querySelector('.modal-body');
        modalBody.innerHTML = modalContent;
        modal.show();
    }
};

module.exports = modalManager;

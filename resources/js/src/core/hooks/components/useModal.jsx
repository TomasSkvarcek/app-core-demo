import {useState} from "react";

export function useModal() {
    const [modalStates, setModalStates] = useState({})

    function setModalState(modal_id, isOpen) {
        setModalStates({
            ...modalStates,
            [modal_id]: isOpen
        })
    }

    function openModal(modal_id) {
        setModalState(modal_id, true)
    }

    function closeModal(modal_id) {
        setModalState(modal_id, false)
    }

    function getModalState(modal_id) {
        return modalStates[modal_id] ?? false
    }

    return {openModal, closeModal, getModalState}
}

import {Modal} from "react-bootstrap";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import {useTranslation} from "react-i18next";
import PreWrap from "@/src/core/components/text/PreWrap.jsx";

function ActionModal({
    show,
    title,
    text,
    onCloseHandler,
    onActionHandler,
    loading,
    closeButtonText,
    actionButtonText,
    actionButtonVariant = 'primary',
}) {
    const {t} = useTranslation()

    return (
        <Modal show={show} onHide={onCloseHandler} dialogClassName="modal-mt">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {text && (
                <Modal.Body>
                    <PreWrap>
                        {text}
                    </PreWrap>
                </Modal.Body>
            )}
            <Modal.Footer>
                <ButtonAction
                    variant="secondary"
                    action={ onCloseHandler }
                    disabled={ loading }
                >
                    { closeButtonText ?? t('general.close') }
                </ButtonAction>
                <ButtonAction
                    variant={ actionButtonVariant }
                    action={ onActionHandler }
                    loading={ loading }
                >
                    { actionButtonText ?? t('general.ok') }
                </ButtonAction>
            </Modal.Footer>
        </Modal>
    )

}

export default ActionModal

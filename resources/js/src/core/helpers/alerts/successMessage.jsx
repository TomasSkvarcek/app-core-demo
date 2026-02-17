import Swal from "sweetalert2";
import {
    backgroundColor,
    closeButtonClass,
    messageDisplayTime,
    position,
    showCloseButton,
    textColor
} from "@/src/config/constants/successMessageStyle";

function showSuccessMessage(text, time = messageDisplayTime) {
    Swal.fire({
        toast: true,
        position: position,
        timer: time,
        showConfirmButton: false,
        showCloseButton: showCloseButton,
        customClass: {
            closeButton: closeButtonClass
        },
        background: backgroundColor,
        color: textColor,
        text: text,
    })
}

export {showSuccessMessage}

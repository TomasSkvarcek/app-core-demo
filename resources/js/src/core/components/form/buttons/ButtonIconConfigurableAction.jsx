import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import {getButtonIcon} from "@/src/core/components/form/buttons/helpers/iconHelper";

function ButtonIconConfigurableAction({
    type, // edit, detail, delete
    action,
    title,
    disabled = false,
    loading = false,
    cssClass,
    addCssClass,
    size = 'normal'
}) {
    const {variant, icon} = getButtonIcon(type);

    return (
        <ButtonAction
            variant={variant}
            action={action}
            size={size}
            title={title}
            disabled={disabled}
            loading={loading}
            cssClass={cssClass}
            addCssClass={addCssClass}
        >
            {icon}
        </ButtonAction>
    )
}

export default ButtonIconConfigurableAction

import ButtonLink from "@/src/core/components/form/buttons/ButtonLink";
import {getButtonIcon} from "@/src/core/components/form/buttons/helpers/iconHelper";

function ButtonIconConfigurableLink({
    type, // edit, detail, delete
    link,
    title,
    cssClass,
    addCssClass,
    size = 'normal'
}) {
    const {variant, icon} = getButtonIcon(type);

    return (
        <ButtonLink
            variant={variant}
            link={link}
            size={size}
            title={title}
            cssClass={cssClass}
            addCssClass={addCssClass}
        >
            {icon}
        </ButtonLink>
    )
}

export default ButtonIconConfigurableLink

function ValidationError({ errors, cssClass }) {
    return errors?.length &&
        <div className={cssClass ?? 'invalid-feedback'}>
            <ul>
                { errors.map((error, index) => {
                    return (<li key={ index }>{ error }</li>)
                }) }
            </ul>
        </div>
}

export default ValidationError

import React from 'react';
import { useField, Field } from 'formik';

const TextInput = ({
    label,
    ...props
}) => {
    const [, meta] = useField(props);

    const hasError = meta.touched && meta.error

    return (
        <div style={{ marginTop: 10 }}>
            <label>{label}</label>
            <Field
                className={`inputField ${hasError && 'inputFieldError'}`}
                {...props}
                /**
                 * prevent mouse wheel event.
                 */
                onWheel={event => event.currentTarget.blur()}
            />
            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
        </div>
    )
}

export default TextInput;

import React from 'react';
import { useField, Field } from 'formik';

const RadioSelection = ({
    label,
    options=[],
    ...props
}) => {
    const [,meta] = useField(props);

    return (
        <div style={{marginTop: 10}}>
            <label>{label}&ensp;&ensp;</label>
            <Field name={props.name}>
                {
                    ({ field }) => (
                        options.map((opt, index) => (
                            <React.Fragment key={index}>
                                <input
                                    type="radio"
                                    {...field}
                                    value={opt.value}
                                    checked={field.value === opt.value}
                                />
                                {opt.key || opt.label || opt.name}
                                &ensp;&ensp;
                            </React.Fragment>
                        ))
                    )
                }
            </Field>
            <br/>
            <span className={"messageError"}>{meta.error || ''}</span>
        </div>
    )
}

export default RadioSelection;

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import * as styles from './forminfo.module.css';
import TextInput from '../input/textinput';
import RadioSelection from '../input/radio';
import { createNewRecord } from '../../httpService/service';
import { fetch_age_group, fetch_gender_ratio, fetch_table_rows } from '../../module/action';

const INPUT_NAME = {
    name: 'name',
    age: 'age',
    gender: 'gender'
}

const initialValue = {
    name: '',
    age: 0,
    gender: ''
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().min(1).max(120).required('Age is required'),
    gender: Yup.string().required('Gender is required'),
})

const Forminfo = () => {

    const dispatch = useDispatch();

    const handleSubmit =async(data,{resetForm})=> {
        try {
            const response = await createNewRecord(data);
            if(response.status === 201){
                alert('Successfully inserted new records');
                dispatch(fetch_age_group());
                dispatch(fetch_gender_ratio());
                dispatch(fetch_table_rows());
                resetForm();
            }
        } catch (error) {
            alert(error?.message || error);
        }
    }

    return (
        <div className='formContainer'>
            <h3>Create New Record</h3>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    formik => {
                        return (
                            <>
                                <TextInput
                                    name={INPUT_NAME.name}
                                    label={'Name'}
                                />
                                <TextInput
                                    name={INPUT_NAME.age}
                                    label={'age'}
                                    type={'number'}
                                />
                                <RadioSelection
                                    name={INPUT_NAME.gender}
                                    label={'Gender'}
                                    options={[
                                        {
                                            value: 'M',
                                            label: 'Male'
                                        },
                                        {
                                            value: 'F',
                                            label: 'Female'
                                        }
                                    ]}
                                />
                                <div className={styles.btn_container}>
                                    <button onClick={formik.resetForm} className={styles.clear_button}>
                                        <span>Clear</span>
                                    </button>
                                    &ensp;
                                    <button onClick={formik.submitForm} className={styles.submit_button}>
                                        <span>Save</span>
                                    </button>
                                </div>

                            </>
                        )
                    }
                }

            </Formik>
        </div>
    )
}

export default Forminfo;
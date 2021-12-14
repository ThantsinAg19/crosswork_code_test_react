import {
    getAgeGroup,
    getChartData,
    getGenderRatio,
    checkServer
} from '../httpService/service';
import {
    insert_table_row,
    set_age_group, set_gender_ratio,
    set_server_status,
    set_table_row
} from "./reducer";
import JsonList from './data/list.json';

export const check_server = () => {
    return async (dispatch, getState) => {
        try {
            const response = await checkServer();
            if(response.status === 200)
                dispatch(set_server_status(true));
        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * process data locally
 */
export const save_local_table_rows = () => {
    return async (dispatch, getState) => {
        try {
            if (JsonList && Array.isArray(JsonList) && JsonList.length > 0)
                dispatch(set_table_row(JsonList));

        } catch (error) {
            console.log(error)
        }
    }
}

export const insert_local_table = ({
    name = '',
    age = 0,
    gender = ''
}) => {
    return async (dispatch, getState) => {
        try {
            let error = []
            if (!name)
                error.push('Name');
            if (!age || !Number(age) || age < 1 || age > 120)
                error.push('Age');
            if (!['M', 'F'].includes(gender))
                error.push('Gender');

            if (error.length > 0) {
                alert(`Invalid ${error.join(', ')}`)
                return;
            }

            dispatch(insert_table_row({
                name,
                age,
                gender
            }))

        } catch (error) {
            console.log(error)
        }
    }
}

export const process_local_data = () => {
    return async (dispatch, getState) => {
        try {
            const DataList = getState()?.chart.table_rows
            if (DataList && Array.isArray(DataList) && DataList.length > 0) {
                const size = DataList.length;
                let i = 0;

                /**
                 * gender ratio
                 */
                let gd_m = 0, gd_f = 0

                /**
                 * age group
                 */
                let young = 0, adult = 0, seniors = 0

                for (; i < size; i++) {
                    const { gender = '', age } = DataList[i];

                    /**
                     * gender ratio
                     */
                    switch (gender) {
                        case 'M':
                            gd_m += 1;
                            break;

                        case 'F':
                            gd_f += 1;
                            break;

                        default:
                            break;
                    }

                    /**
                     * age group
                     */
                    if (age > 0 && age <= 35) {
                        young += 1;
                    }
                    else if (age > 35 && age < 50) {
                        adult += 1;
                    }
                    else if (age > 50) {
                        seniors += 1
                    }
                }

                dispatch(set_gender_ratio({
                    labels: ['M', 'F'],
                    data: [gd_m, gd_f],
                    total: gd_m + gd_f
                }))

                dispatch(set_age_group({
                    labels: ['Young adult', 'Adult', 'Seniors'],
                    datasets: [
                        {
                            label: 'Number of people by age group',
                            data: [young, adult, seniors],
                            backgroundColor: `rgba(255, 99, 152, 0.8)`,
                        }
                    ]
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * API fetching
 * @returns 
 */
export const fetch_gender_ratio = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getGenderRatio();
            if (response.status === 200) {
                const body = await response.data;
                if (body && Array.isArray(body)) {
                    let labels = [], data = [], total = 0
                    body.forEach(b => {
                        labels.push(b.gender)
                        data.push(b.total)
                        total += b.total
                    })
                    dispatch(set_gender_ratio({
                        labels,
                        data,
                        total
                    }));
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetch_age_group = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAgeGroup();
            if (response.status === 200) {
                const body = await response.data;
                dispatch(set_age_group(body));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetch_table_rows = () => {
    return async (dispatch, getState) => {
        try {
            const respnonse = await getChartData();
            if (respnonse.status === 200) {
                const body = await respnonse.data;
                dispatch(set_table_row(body))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
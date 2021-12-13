import { getAgeGroup, getChartData, getGenderRatio } from '../httpService/service';
import { set_age_group, set_gender_ratio, set_table_row } from "./reducer";

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

export const fetch_table_rows =()=>{
    return async (dispatch,getState)=>{
        try {
            const respnonse = await getChartData();
            if(respnonse.status ===200) {
                const body = await respnonse.data;
                dispatch(set_table_row(body))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
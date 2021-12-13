const types = {
    SET_GENDER_RATIO: 'SET_GENDER_RATIO',
    SET_AGE_GROUP: 'SET_AGE_GROUP',
    SET_TABLE_ROW: 'SET_TABLE_ROW'
}

const initialState = {
    gender_ratio: null,
    age_group: null,
    table_rows: []
}

/**
 * reducers
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const Reduer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_GENDER_RATIO:
            return {
                ...state,
                gender_ratio: action.payload
            }

        case types.SET_AGE_GROUP:
            return {
                ...state,
                age_group: action.payload
            }

        case types.SET_TABLE_ROW:
            return {
                ...state,
                table_rows: action.payload
            }

        default:
            return state
    }
}

export default Reduer;

export const set_gender_ratio = (data = {}) => ({
    type: types.SET_GENDER_RATIO,
    payload: data
})

export const set_age_group = (data = {}) => ({
    type: types.SET_AGE_GROUP,
    payload: data
})

export const set_table_row = (data = []) => ({
    type: types.SET_TABLE_ROW,
    payload: data
})
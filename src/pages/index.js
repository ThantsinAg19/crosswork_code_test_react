import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    Chart as ChartJs,
    /**
     * pie
     */
    ArcElement,

    /**
     * bar
     */
    CategoryScale,
    LinearScale,
    BarElement,
    Title,

    /**
     * common
     */
    Tooltip,
    Legend,
} from 'chart.js';

import '../App.css';
import GenderRatioPie from './component/pie';
import RangeByAge from './component/bar';
import FormInfo from './component/forminfo';
import TableRecords from './component/table';
import { fetch_age_group, fetch_gender_ratio, fetch_table_rows } from '../module/action';

ChartJs.register(
    ArcElement,

    CategoryScale,
    LinearScale,
    BarElement,
    Title,

    Tooltip,
    Legend
)

const ChartPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(fetch_gender_ratio());
        dispatch(fetch_age_group());
        dispatch(fetch_table_rows());

    }, [dispatch])

    return (
        <div className='app_container'>
            <div>
                <FormInfo />
            </div>
            <div>
                <GenderRatioPie />
                <RangeByAge />
            </div>
            <div>
                <TableRecords/>
            </div>
        </div>
    )
}

export default connect(null, null)(ChartPage);
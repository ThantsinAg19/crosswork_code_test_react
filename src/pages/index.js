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
import { check_server, fetch_age_group, fetch_gender_ratio, fetch_table_rows, process_local_data, save_local_table_rows } from '../module/action';

ChartJs.register(
    ArcElement,

    CategoryScale,
    LinearScale,
    BarElement,
    Title,

    Tooltip,
    Legend
)

const ChartPage = ({
    server_status = false
}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(check_server());
    },[dispatch])

    useEffect(() => {
        if (server_status) {
            dispatch(fetch_gender_ratio());
            dispatch(fetch_age_group());
            dispatch(fetch_table_rows());
        }
        else {
            dispatch(save_local_table_rows())
            setTimeout(() => {
                dispatch(process_local_data());
            }, 100)
        }
    }, [server_status, dispatch])

    return (
        <div className='app_container'>
            <div>
                <FormInfo server_status={server_status}/>
            </div>
            <div>
                <GenderRatioPie />
                <RangeByAge />
            </div>
            <div>
                <TableRecords />
            </div>
        </div>
    )
}

export default connect(
    (state) => ({
        server_status: state.chart.server_active
    }),
    null
)(ChartPage);
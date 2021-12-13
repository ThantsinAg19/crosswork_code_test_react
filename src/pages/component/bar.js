import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const RangeByAge = () => {

    const dataSet = useSelector(state => state.chart.age_group);

    if (dataSet && dataSet?.datasets && dataSet?.labels)
        return (
            <div className='formContainer'>
                <Bar
                    data={dataSet}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Number of people by age group',
                            },
                        },
                    }}
                />
            </div>
        )

    else
        return null;
}

export default RangeByAge;
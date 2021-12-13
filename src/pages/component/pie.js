import React from 'react';
import { useSelector} from 'react-redux';
import { Pie } from 'react-chartjs-2';

const GenderRatio = () => {

    const dataSet = useSelector(state=> state?.chart?.gender_ratio);
    
    const pieData = {
        datasets: [
            {
                data: dataSet?.data || [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }
        ],
        labels: dataSet?.labels || []
    }

    return (
        <div className='formContainer'>
            <Pie
                data={pieData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Total ${dataSet?.total}`,
                        },
                    },
                }}
            />
        </div>
    )
}

export default GenderRatio;
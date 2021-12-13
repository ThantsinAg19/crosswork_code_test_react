import React from 'react';
import { useSelector } from 'react-redux';

const TableRecords = () => {
    const data = useSelector(state => state?.chart?.table_rows) || [];

    return (
        <div className='table_container'>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.age}</td>
                                <td>{d.gender}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableRecords;
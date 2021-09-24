import React from  'react';
import MaterialTable from 'material-table';

function TablaPrueba(){
    const columns=[
        {title:'Name', field:'name'},
        {title:'Email', field:'email'}
    ]

    return(
        <>
            <MaterialTable columns={columns}/>
        </>
    )
}
export default TablaPrueba
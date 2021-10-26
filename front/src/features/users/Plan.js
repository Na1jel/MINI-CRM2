import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {planUserAsync, selectPlan} from './usersSlice'
import {Table, Button} from "react-bootstrap";

export function Plan(){
    let { id } = useParams();
    const plan = useSelector(selectPlan)
    const dispatch = useDispatch();
    console.log(plan)

    useEffect(()=>{
        dispatch(planUserAsync(id));
    },[id, dispatch])
        
    return(
        <div>
           <Table striped={true} bordered={true}>
            <thead>
            <tr>
                <th>id</th>
                <th>date</th>
                <th>hours</th>
            </tr>
            </thead>
            <tbody>
                {
                    plan.map(p=>{
                        <tr key={p.user_id}>
                            <td>{p.user_id}</td>
                            <td>{p.date}</td>
                            <td>{p.hours}</td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        </div>
    )
}
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import {postUserAsync, selectUser,} from './usersSlice'
function Create(){
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        if (Object.keys(user).length > 0){
            history.push(`/user/${user.id}`)
        }
    }, [user, history])

    const data = {}
    function onSubmit(event){
        event.preventDefault()
        data.name = event.target.name.value;
        data.email = event.target.email.value;
        dispatch(postUserAsync(data));
    }
    return <Form onSubmit={onSubmit}>
        <Form.Control type='text' name='name' />
        <Form.Control type='email' name='email'/>
        <Button type={"submit"}>Add</Button>
    </Form>
}

export default Create
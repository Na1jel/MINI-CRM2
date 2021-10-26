import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import {fetchUserAsync, patchUserAsync, selectUser,} from './usersSlice'

function Edit() {
    let {id} = useParams();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchUserAsync(id));
    }, [id, dispatch])

    async function  onSubmit(event) {
        event.preventDefault()
        const data = {};
        data.name = event.target.name.value;
        data.email = event.target.email.value;
        data.id = id;
        await dispatch(patchUserAsync(data));
        history.push(`/users/${user.id}`)
    }

    return <Form onSubmit={onSubmit}>
        <Form.Control type='text' name='name' defaultValue={user.name}/>
        <Form.Control type='email' name='email' defaultValue={user.email}/>
        <Button type={"submit"}>Add</Button>
    </Form>
}

export default Edit
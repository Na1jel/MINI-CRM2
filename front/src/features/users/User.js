import {useParams} from "react-router-dom";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserAsync, selectUser, loadingStatus } from './usersSlice'
import ClipLoader from "react-spinners/ClipLoader";

function User(){
    let { id } = useParams();
    const user = useSelector(selectUser);
    const loading = useSelector(loadingStatus);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUserAsync(id));
    },[id, dispatch])

    if (loading !== 'loading' && Object.keys(user).length > 0){
        return <div>
            <h1>user page {user.name}</h1>
            <h1>{user.email}</h1>
        </div>
    }else {
        return <ClipLoader loading={loading}  size='150px' />
    }
}

export default User
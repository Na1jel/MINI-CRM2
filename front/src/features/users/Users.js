import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deleteUserAsync, fetchUsersAsync, selectUsers} from './usersSlice'
import {FaAngleDown, FaAngleUp, FaTh, FaThList, FaEdit, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import {Stack, Table, Form, Pagination, Row, Button, ButtonGroup} from "react-bootstrap";
import {confirm} from "../Confirmation";
import '../../App.css'
import AlertContext from "../Notifications";

export function Users() {
    const users = useSelector(selectUsers);
    console.log(users.users)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState([]);
    const [sorting, setSorting] = useState({sort: users.sort, order: users.order});
    const [search, setSearch] = useState('');
    const [isList, toggleUi] = useState(false);
    const alert = useContext(AlertContext);
    useEffect(() => {
        dispatch(fetchUsersAsync({page, limit, sort: sorting.sort, order: sorting.order, search}));
        const items = [];
        for (let i = 1; i <= Math.ceil(users.count / limit); i++) {
            items.push(
                <Pagination.Item key={i} onClick={() => setPage(i)} active={i === users.page}>
                    {i}
                </Pagination.Item>,
            );
        }
        setPagination(items)
    }, [page, limit, users.count, dispatch, users.page, sorting, search])


    function countChange(e) {
        setLimit(e.target.value)
    }

    function changeSort(property) {
        let order = 'asc';
        if (sorting.sort === property) {
            order = sorting.order === 'asc' ? 'desc' : 'asc';
        }
        setSorting({sort: property, order})
    }

    function onChangeSearch(event) {
        setSearch(event.target.value)
    }
    async function onRemoveUser(id) {
        if(await confirm('Are your sure?')){
            const response = await dispatch(deleteUserAsync(id));
            dispatch(fetchUsersAsync({page, limit, sort: sorting.sort, order: sorting.order, search}));
            alert.show('Remove', response.payload, 'danger');
        }
    }

    function onToggleUi() {
        toggleUi(!isList);
    }

    const tableTemplate = ()=>{
        return <Table striped={true} bordered={true}>
            <thead>
            <tr>
                <th>photo</th>
                <th onClick={() => changeSort('id')}>
                    {sorting.sort === 'id' ? sorting.order === 'asc' ? <FaAngleUp/> : <FaAngleDown/> : ''}
                    id
                </th>
                <th onClick={() => changeSort('name')}>
                    {sorting.sort === 'name' ? sorting.order === 'asc' ? <FaAngleUp/> : <FaAngleDown/> : ''}
                    name
                </th>
                <th onClick={() => changeSort('salary')}>
                    {sorting.sort === 'salary' ? sorting.order === 'asc' ? <FaAngleUp/> : <FaAngleDown/> : ''}
                    salary
                </th>
                <th onClick={() => changeSort('role')}>
                    {sorting.sort === 'role' ? sorting.order === 'asc' ? <FaAngleUp/> : <FaAngleDown/> : ''}
                    role
                </th>
                <th onClick={() => changeSort('email')}>
                    {sorting.sort === 'email' ? sorting.order === 'asc' ? <FaAngleUp/> : <FaAngleDown/> : ''}
                    email
                </th>
                <th>edit</th>
                <th>delete</th>
            </tr>
            </thead>
            <tbody>
            {
                users.users.map(u =>
                    <tr key={u.id}>
                        <td><img src={u.photo} alt={u.name}/></td>
                        <td>{u.id}</td>
                        <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                        <td><Link to={`/users/plan/${u.id}`}>{u.salary}</Link> </td>
                        <td>{u.role}</td>
                        <td>{u.email}</td>
                        <td><Link to={`/users/edit/${u.id}`} className='btn btn-info'>Edit</Link></td>
                        <td><Button onClick={()=>onRemoveUser(u.id)}>Remove</Button></td>
                    </tr>
                )}
            </tbody>
        </Table>
    }

    const listTemplate = ()=>{
        return <ul className='listUsers'>
            {
                users.users.map(u =>
                    <li key={u.id}>
                       <img src={u.photo} alt={u.name}/>
                        <Link to={`/users/${u.id}`}>{u.name}</Link>
                        <div>
                            <Link to={`/users/edit/${u.id}`} className='btn btn-outline-secondary'><FaEdit/></Link>
                            <Button variant="outline-secondary" onClick={()=>onRemoveUser(u.id)}><FaTrashAlt/></Button>
                        </div>
                    </li>
                )}
        </ul>
    }
    return (<div>
        <Row>
            <Stack direction="horizontal" gap={3}>
                <Form.Control type="text" onChange={onChangeSearch} placeholder={'input search text'} />
                <Form.Select aria-label="Select users count"  onChange={countChange}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </Form.Select>
                <div className="vr"/>
                <Link className={'btn btn-info'} to='users/create'>Add new</Link>
                <ButtonGroup>
                    <Button variant={isList ? 'secondary' : 'outline-secondary'} onClick={onToggleUi}><FaTh/></Button>
                    <Button variant={isList ? 'outline-secondary' : 'secondary'} onClick={onToggleUi}><FaThList/></Button>
                </ButtonGroup>
            </Stack>
        </Row>
        <Row>
            { isList ? listTemplate() : tableTemplate()}
        </Row>
        <Row>
            <p>Showing {(page - 1) * limit + 1} to {page * limit < users.count ? page * limit : users.count} of {users.count} </p>
        </Row>
        <Row>
            <Pagination>
                <Pagination.First
                    disabled={page <= 1}
                    onClick={() => setPage(1)}
                />
                <Pagination.Prev
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                />
                {pagination}
                <Pagination.Next
                    disabled={Math.ceil(users.count / limit) <= page}
                    onClick={() => setPage(page + 1)}
                />
                <Pagination.Last
                    disabled={Math.ceil(users.count / limit) <= page}
                    onClick={() => setPage(Math.ceil(users.count / limit))}
                />
            </Pagination>
        </Row>
    </div>)
}
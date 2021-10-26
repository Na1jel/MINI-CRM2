// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import axios from "axios";

// export default function Login({ setToken }) {

//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();

//     async function loginUser(credentials){
//         return axios.post('http://localhost:3001/login')
//     }

//     const handleSubmit = async e => {
//         e.preventDefault();
//         const token = await loginUser({
//             email,
//             password
//         });
//         console.log(token.data);
//         setToken(token.data);
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <label>
//                 <p>Email</p>
//                 <input type="email" onChange={e => setEmail(e.target.value)} />
//             </label>
//             <label>
//                 <p>Password</p>
//                 <input type="password" onChange={e => setPassword(e.target.value)}/>
//             </label>
//             <div>
//                 <button type="submit">Submit</button>
//             </div>
//         </form>
//     )
// }

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
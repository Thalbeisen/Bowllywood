import { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/users';

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        const usersList = async () => {
            try {
                const response = await axios.get('/users')
            }
        catch (err) {
            console.log(err)
        }
    },[])

    return (
        <div>
            <h2>Liste users - WIP</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.email}</li>
                    ))}
                </ul>
            ) : (
                <p>Aucun utilisateur</p>
            )}
        </div>
    );
};

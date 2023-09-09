import { LocalhostUserToModel } from '../mappers/localhost-user-mapper';
import { ModelToLocalhostUser } from '../mappers/user-localhost-mapper';
import { User } from '../models/users'

export const SaveUser = async (userLike) => {
    const user = new User(userLike)
    if (!user.firstName || !user.lastName) throw 'No se envio ninguno valor'
    const userToSave = ModelToLocalhostUser(user);
    let userUpdate;
    if (!user.id) {
        userUpdate = await createUser(userToSave);
    } else {
        userUpdate = await updateUser(userToSave);
    }

    return LocalhostUserToModel(userUpdate);
}

const createUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUser = await res.json();
    console.log({ newUser });
    return newUser;
}

const updateUser = async (user) => {
    console.log({ user });
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUser = await res.json();
    console.log({ newUser });
    return newUser;
}
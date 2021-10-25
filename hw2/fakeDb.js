import { v4 as uuidv4 } from 'uuid';

const DB = [{
    id: 1,
    login: 'TestLogin1',
    password: 'TestPassword1',
    age: 10,
    isDeleted: false
}, {
    id: 2,
    login: 'TestLogin2',
    password: 'TestPassword2',
    age: 12,
    isDeleted: false
}];

export const getUserById = userId => DB.find(item => item.id === userId);

export const createUser = reqBody => {
    const user = Object.assign({
        id: uuidv4(),
        isDeleted: false
    }, reqBody);
    DB.push(user);
};

export const deleteById = id => {
    const user = getUserById(id);
    return user && Object.assign(user, {
        isDeleted: true
    }) || null;
};

export const updateUser = req => {
    const user = getUserById(+req.params.id);
    return user ? Object.assign(user, req.body) : null;
};

export const searchUser = (login = '', limit) => {
    const users = DB.reduce(
        (requestedUsers, user) => {
            requestedUsers.length < limit && !user.isDeleted && user.login.includes(login) && requestedUsers.push(user);
            return requestedUsers;
        }, []
    );
    return users.sort((user1, user2) => user1.login > user2.login);
};

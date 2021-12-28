import { UserService } from '../../hw6/services/user.service';

const testUserData = { login: 'testLogin', password: 'testPassword', id: 'testId', age: 10 };
const mockModel = {
    create: () => {
        return [testUserData];
    },
    findByPk: () => {
        return testUserData;
    },
    findAndCountAll: () => {
        return [testUserData];
    },
    update: data => ({ ...testUserData, ...data })
};
const userService = new UserService(mockModel);

describe('User Service', () => {
    test('it should create a user', async () => {
        const result = await userService.createUser(testUserData);
        expect(result).toEqual([testUserData]);
    });

    test('it should update a user', async () => {
        const newLogo = 'TestLogin2';
        const newUserData = { ...testUserData, login: newLogo };
        const result = await userService.updateUser(newUserData, testUserData.id);

        expect(result.login).toEqual(newLogo);
    });

    test('it should mark as deleted by id', async () => {
        const result = await userService.deleteUser(testUserData.id);
        expect(result.isDeleted).toBeTruthy();
    });

    test('it should find a user by id', async () => {
        const result = await userService.getUserById(testUserData.id);
        expect(result).toEqual(testUserData);
    });

    test('it should find all the matched terms', async () => {
        const result = await userService.getUsersByQuery(5, 'testLogin');
        expect(result).toEqual([testUserData]);
    });
});

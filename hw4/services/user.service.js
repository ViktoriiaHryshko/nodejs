import { Op } from 'sequelize';
import { DEFAULT_QUERY_LIMIT } from '../configs/constants';

export class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(user) {
        return await this.userModel.create({
            login: user.login,
            password: user.password,
            age: user.age
        });
    }

    async updateUser(user, userID) {
        return await this.userModel.update({
            login: user.login,
            password: user.password,
            age: user.age
        },
        { where: { id: userID } });
    }

    async deleteUser(userID) {
        return await this.userModel.update({
            isDeleted: true
        }, { where: { id: userID } });
    }

    async getUserById(userId) {
        return await this.userModel.findByPk(userId);
    }

    async getUsersByQuery(reqQuery) {
        const { query, limit = DEFAULT_QUERY_LIMIT } = reqQuery;
        return await this.userModel.findAndCountAll({
            where: {
                login: {
                    [Op.like]: `%${query}%`
                }
            },
            limit
        });
    }
}

import { sequelize } from '../data-access/sequelize';

export class UserGroupService {
    constructor(userGroupModel) {
        this.userGroupModel = userGroupModel;
    }

    async getUserGroupById(userGroupId) {
        return await this.userGroupModel.findByPk(userGroupId);
    }

    async getAllUserGroups() {
        return await this.userGroupModel.findAll();
    }

    async addUsersToGroup(groupId, userId) {
        const t = await sequelize.transaction();

        try {
            const user = await this.userGroupModel.create({
                userId,
                groupId
            }, {
                transaction: t
            });

            await t.commit();

            return user;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

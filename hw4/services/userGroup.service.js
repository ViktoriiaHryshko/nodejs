export class UserGroupService {
    constructor(userGroupModel, userModel, groupModel) {
        this.userGroupModel = userGroupModel;
        this.userModel = userModel;
        this.groupModel = groupModel;
    }

    async getUserGroupById(userGroupId) {
        return await this.userGroupModel.findByPk(userGroupId);
    }

    async getAllUserGroups() {
        return await this.userGroupModel.findAll();
    }

    async createUserGroup(userGroup) {
        return await this.userGroupModel.create({
            userId: userGroup.userId,
            groupId: userGroup.groupId
        });
    }
}

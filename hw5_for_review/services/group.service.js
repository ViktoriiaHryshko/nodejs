export class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async getGroupById(groupId) {
        return await this.groupModel.findByPk(groupId);
    }

    async getAllGroups() {
        return await this.groupModel.findAll();
    }

    async createGroup(group) {
        return await this.groupModel.create({
            name: group.name,
            permissions: group.permissions
        });
    }

    async updateGroup(group, groupID) {
        return await this.groupModel.update(
            group,
            { where: { id: groupID } });
    }

    async deleteGroup(groupID) {
        return await this.groupModel.destroy({
            where: { id: groupID }
        });
    }
}

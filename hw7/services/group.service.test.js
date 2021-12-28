import { GroupService } from '../../hw6/services/group.service';

const testGroupData = {
    id: 'groupId',
    name: 'groupName',
    permissions: [
        'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'
    ]
};
const mockModel = {
    create: () => {
        return [testGroupData];
    },
    findByPk: () => {
        return testGroupData;
    },
    findAll: () => {
        return [testGroupData];
    },
    update: data => ({ ...testGroupData, ...data }),
    destroy: () => null
};
const groupService = new GroupService(mockModel);

describe('Group Service', () => {
    test('it should create a group', async () => {
        const result = await groupService.createGroup(testGroupData);
        expect(result).toEqual([testGroupData]);
    });

    test('it should update a group', async () => {
        const newGroupName = 'TestGroup2';
        const newGroupData = { ...testGroupData, name: newGroupName };
        const result = await groupService.updateGroup(newGroupData, testGroupData.id);

        expect(result.name).toEqual(newGroupName);
    });

    test('it should mark as deleted by id', async () => {
        const result = await groupService.deleteGroup(testGroupData.id);
        expect(result).toBeNull();
    });

    test('it should find a group by id', async () => {
        const result = await groupService.getGroupById(testGroupData.id);
        expect(result).toEqual(testGroupData);
    });

    test('it should find all the matched terms', async () => {
        const result = await groupService.getAllGroups();
        expect(result).toEqual([testGroupData]);
    });
});

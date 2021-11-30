import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../data-access/sequelize';
import { GroupModel } from './group.model';
import { UserModel } from './user.model';

class UserGroupModel extends Model {}

UserGroupModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Please enter the user id'
            }
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter the user id'
            }
        }
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'userGroup'
});

UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel });

export { UserGroupModel };

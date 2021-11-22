import { sequelize } from '../data-access/sequelize';
import { DataTypes, Model } from 'sequelize';

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
        },
        references: {
            model: 'users',
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter the user id'
            }
        },
        references: {
            model: 'groups',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'userGroup'
});

export { UserGroupModel };

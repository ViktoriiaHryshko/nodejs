import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { PERMISSIONS } from '../configs/constants';

class Group extends Model {}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter the group\'s name'
            }
        }
    },
    permissions: DataTypes.ARRAY(DataTypes.ENUM(...PERMISSIONS))
}, {
    sequelize,
    timestamps: false,
    modelName: 'group'
});

export { Group };

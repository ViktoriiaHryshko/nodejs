import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../data-access/sequelize';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your login'
            }
        }
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        isInt: true,
        validate: {
            isInt: {
                msg: 'Please enter your login'
            }
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        default: false
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'users'
});

export { User };

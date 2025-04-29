const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Users = sequelize.models.Users;
    console.log('Users in otp', sequelize)
    console.log('Users in otp', Users)

    const OTP = sequelize.define('Otp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            },
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'otp',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['userId'],
            },
        ],
    })
    OTP.belongsTo(Users, { foreignKey: 'userId' }); // Устанавливаем связь "один ко многим" между OTP и User

    return OTP
}


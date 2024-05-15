const { DataTypes } = require('sequelize');

module.exports = {
    MODEL_NAME: 'Movements',
    DEFINITION: {
        concept: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        import: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        transactionDate: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        valueDate: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
};

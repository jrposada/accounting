'use strict';

const { Model } = require('sequelize');
const { DEFINITION, MODEL_NAME } = require('../definitions/movement.cjs');

// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, DataTypes) => {
    class Movements extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define association here
        }
    }
    Movements.init(DEFINITION, {
        sequelize,
        modelName: MODEL_NAME,
    });
    return Movements;
};

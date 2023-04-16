const { DataTypes } = require("sequelize")

const db = require('../db/conn')

const Conta = db.define('Conta', {
    
    id_conta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
           
    },

    tipoconta: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },

    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    }

})

module.exports = Conta
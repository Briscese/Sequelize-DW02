const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const Conta = require('./Conta')

const Saldo = db.define('Saldo', {

    saldo: {
        type: DataTypes.FLOAT,
        required: true,
        defaultValue: 0

    }

})


Conta.hasMany(Saldo)
Saldo.belongsTo(Conta)

module.exports = Saldo
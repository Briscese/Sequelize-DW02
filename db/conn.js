const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('crud2','root','Topsp808!@',{
    host: 'localhost',
    dialect: 'mysql',
    define: {freezeTableName: true}

})

try { 

    sequelize.authenticate()
    console.log('Conectado com sucesso')

} catch (err){

    console.log('Não é possivel conectar',error)

}

module.exports = sequelize
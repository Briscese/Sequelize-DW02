const express = require ('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Conta = require('./models/Conta')
const Saldo = require('./models/Saldo')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')


app.use (
    express.urlencoded({
    extend: true
}),
)

app.get('/conta/criar',(req,res)=>{
    res.render('addconta')
})

app.post('/conta/criar', async (req,res)=> {
    const name = req.body.name
    let tipoconta = req.body.tipoconta
    const idade = req.body.idade

    await Conta.create({name,tipoconta,idade})

    res.redirect('/')
})


app.get('/', async (req, res)=> {

    const conta = await Conta.findAll({raw: true})

    console.log(conta)

    res.render('home', {conta: conta})
})

app.get('/conta/:id_conta/', async (req,res)=>{
    const id = req.params.id_conta

    const conta = await Conta.findOne({raw: true ,where: {id_conta: id}})

    res.render('contadados',{conta})

})

app.post('/conta/deletar/:id_conta', async (req,res)=>{
    const id = req.params.id_conta

    await Conta.destroy({where:{id_conta:id}})

    res.redirect('/')
})

app.post('/conta/atualizar', async (req,res)=>{
    const id_conta = req.body.id_conta
    const name = req.body.name
    const tipoconta = req.body.tipoconta
    const idade = req.body.idade

    const contaData = {
        id_conta,
        name,
        tipoconta,
        idade
    }

    await Conta.update(contaData, {where: {id_conta: id_conta }})

    res.redirect('/')

})

app.get('/conta/atualizar/:id_conta', async (req,res)=>{
    const id = req.params.id_conta

    const conta =  await Conta.findOne({include: Saldo, where: {id_conta: id}})
 
    

    res.render('contaedit',{conta:  conta.get({plain: true})})
})

app.post('/saldo/adicionar', async(req,res)=>{
    const ContumIdConta = req.body.ContumIdConta
    const AdicionarValor = req.body.saldo
    
    const saldo = {
        ContumIdConta,
        saldo: AdicionarValor,
    }

    await Saldo.create(saldo)

    res.redirect('/')

})



conn.sync({force: false}).then(() => {
app.listen(3000)
}).catch(err => console.log(err))
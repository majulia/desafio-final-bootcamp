const express = require('express');
const transactionRouter = express.Router();

transactionRouter.get('/', async (request, response) => {
  const { query } = request

  try {
    if (!query.period) {
      throw new Error
        (`É necessário informar o parâmetro "período", cujo valor deve estar no formato yyyy-mm`)
    }

    const { period } = query

    if (period.length !== 7) {
      throw new Error
        (`Período Inválido. Use yyyy-mm`)
    }

    response.send({
      length: 2,
      transactions: ['transaction1', 'transaction2'],
    })

  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ error: message })
  }
})

transactionRouter.post('/', async (request, response) => {
  const { body } = request

  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error
        (`Conteúdo inválido ou inexistente`)
    }

    response.send({
      status: 'Ok',
    })

  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ error: message })
  }
})

transactionRouter.put('/', async (request, response) => {
  try {
    
    throw new Error ('Id inexistente')
  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ error: message })
  }
})

transactionRouter.put('/:id', async (request, response) => {
  const { body, params } = request

  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error
        (`Conteúdo inválido ou inexistente`)
    }

    response.send({
      status: 'Ok',
    })

  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ error: message })
  }
})

transactionRouter.delete('/', async (request, response) => {
  try {
    
    throw new Error ('Id inexistente')
  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ error: message })
  }
})

transactionRouter.delete('/:id', async (request, response) => {
  const { params } = request

  try {
   
    
    response.send({
      status: 'Ok',
    })

  } catch ({ message }) {
    console.log(message)
    response.status(400).send({ error: message })
  }
})

module.exports = transactionRouter;

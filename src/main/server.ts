import express from 'express'

const app = express()

app.listen(3333, () => {
  console.log('servidor rodando na porta 3333')
})

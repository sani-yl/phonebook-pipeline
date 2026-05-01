const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
]

app.get('/health', (req, res) => {
  res.send('OK')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) res.json(person)
  else res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const person = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== Number(req.params.id))
  res.status(204).end()
})

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
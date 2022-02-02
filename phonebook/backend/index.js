const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Borld!</h1>')
})

app.get('/api/persons', (req, response) => {
  response.json(persons)
})

var currentTime = new Date();

app.get('/info', (req, res) => {
	res.send(`Phonebook has info for ${persons.length} people <br><br>${currentTime}`)
  })

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
	  response.json(person)
	} else {
	  response.status(404).end()
	}
})

const generateId = () => {
  const maxId = Math.floor(Math.random() * 10000);
  console.log(maxId)
  return maxId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  let persona = persons.filter(person => person.name === body.name)
  if ( persona.length > 0) {
    return response.status(400).json({ 
      error: 'name already existing' 
    })
  }

  const person = {
	id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  response.json(person)
})



app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

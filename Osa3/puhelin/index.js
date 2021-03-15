require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const PORT = process.env.PORT

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/api/persons/:id', (req,res,next) => {
	Person.findById(req.params.id)
		.then(person => {
			if(person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.get('/info', (req, res, next) => {
	Person.count({}, (err, result) => {
		const message = (
			`<p> Phonebook has info for ${result} people </p>
      <p> ${new Date()} </p>`
		)
		res.send(message)
	})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	console.log(req.params)
	Person.findByIdAndRemove(req.params.id)
		// eslint-disable-next-line no-unused-vars
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {
	const number = req.body

	const person = new Person({
		name: number.name,
		number: number.number
	})

	person.save().then(savedNote => {
		res.json(savedNote)
	})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(req.params.id, person, { new:true })
		.then(updatedPerson => {
			res.json(updatedPerson)
		})
		.catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
	console.log(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Listening port ${PORT}`)
})

const mongoose = require('mongoose')

if(process.argv.length < 3) {
	console.log('Please provide password as an argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://puhelinluettelo:${password}@cluster0.8q8ow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})

	person.save().then(() => {
		console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
		mongoose.connection.close()
	})
}
else {
	console.log('Phonebook:')
	Person.find({}).then(person => {
		person.forEach(people => {
			console.log(`${people.name} ${people.number}`)
		})
		mongoose.connection.close()
	})
}

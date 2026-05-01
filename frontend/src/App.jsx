import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    fetch('/api/persons')
      .then(res => res.json())
      .then(data => setPersons(data))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const person = { name: newName, number: newNumber }
    fetch('/api/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    })
      .then(res => res.json())
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    fetch(`/api/persons/${id}`, { method: 'DELETE' })
      .then(() => setPersons(persons.filter(p => p.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} /></div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(p =>
        <div key={p.id}>
          {p.name} {p.number}
          <button onClick={() => deletePerson(p.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default App
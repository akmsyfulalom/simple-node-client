import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email }
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)
        console.log(data)

      })
      .catch(e => console.error(e))

    e.target.reset();

  }

  return (
    <div className="App">

      <form onSubmit={handleAddUser} >
        <input type="text" name='name' placeholder='name' />
        <br />
        <input type="email" name='email' placeholder='email' />
        <br />
        <button type='submit'>Add user</button>

      </form>



      <h3>Users: {users.length}</h3>

      {
        users.map(user => <p key={user._id}> {user.name} {user.email}</p>)
      }
    </div>
  );
}

export default App;

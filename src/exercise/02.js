// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useRef} from 'react'
import {useEffect, useState} from 'react'

function useLocalStorageState(
  key,
  initialName = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [name, setName] = useState(() => {
    const valueLocalStorage = window.localStorage.getItem(key)
    if (valueLocalStorage) {
      return deserialize(valueLocalStorage)
    } else {
      return typeof initialName === 'function' ? initialName() : initialName
    }
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    serialize(window.localStorage.setItem(key, name))
  }, [key, name, serialize])
  return [name, setName]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = useState(
  //   () => window.localStorage.getItem('name') || initialName,
  // )

  // useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // function handleChange(event) {
  //   setName(event.target.value)
  // }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={e => setName(e.target.value)} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Masoud" />
}

export default App

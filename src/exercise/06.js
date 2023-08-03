// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {useState} from 'react'
import {useEffect} from 'react'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = useState(null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  useEffect(() => {
    setPokemon(null)
    if (!pokemonName) {
    } else {
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setPokemon(pokemonData)
        })
        .catch(err => {
          setPokemon(err.message)
        })
    }
  }, [pokemonName])

  return (
    <>
      {pokemonName ? (
        pokemon ? (
          <PokemonDataView pokemon={pokemon} />
        ) : (
          <PokemonInfoFallback name={pokemonName} />
        )
      ) : (
        'Submit a pokemon'
      )}
    </>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

import React, {useState, useEffect, useRef} from 'react'
import  api  from './api';
import {Pokemon} from './types';
import './index.css'

function App() {

  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon>();
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [pokemonIsDiscovered, setPokemonIsDiscovered] = useState<boolean>(false);
  const [fails, setFails] = useState<number>(0)
  const [success, setSuccess] = useState<number>(0)

  const userInput =  useRef<HTMLInputElement>(null);


  const getPokemon = () =>{
      api.random().then(setPokemonToGuess);
      setPokemonIsDiscovered(false);
  }
  
  useEffect(() => {
    getPokemon()

    userInput.current?.focus();
  }, [])



  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  const testGuess = () =>{
    const $inputPokemon = userInput.current!;

    if($inputPokemon.value.replace(/[^a-zA-Z]/g, "").toLowerCase() === pokemonToGuess?.name){
        setPokemonIsDiscovered(true);
        setUserGuess(true);
        $inputPokemon.value = "";
        setSuccess(() => success + 1)
    }else{
      setFails(() => fails + 1)
    }
  }

  const giveUp = () =>{
    const $inputPokemon = userInput.current!;
    setPokemonIsDiscovered(true);
    setUserGuess(false);
    $inputPokemon.value = "";
    setFails(() => fails + 1)
  }

  const playAgain = () => {
    setUserGuess(null);
    getPokemon();

    userInput.current?.focus();
  }

  return(
    <div className="container">
        <header>
          <h3>¿Quién es este Pokémon?</h3>
          <h4>Challenge de <a href="https://github.com/goncy/interview-challenges/tree/main/guess-pokemon">Goncy</a> </h4>
        </header>

      <main>
        <section className="nes-container is-rounded pokemon-container">
            <h2 className={`${pokemonIsDiscovered ? "" : 'name-hidden'} pokemon-name`}>{pokemonToGuess?.name}</h2>
            <div className="pokemon">
                <img
                  src={pokemonToGuess?.image}
                  alt={`Imagen del pokemon ${pokemonToGuess?.name}`} 
                  className={`${pokemonIsDiscovered ? "" : "hidden"} pokemon`}
                 />
            </div>
        </section>
        <section className=" form-wrapper">
          {userGuess === null ? ""
          : userGuess === true ? (<span className="center">Adivinaste!</span>)
          : (<span>Fallaste!</span>)
          }
            <form className="nes-field form-container" onSubmit={handleSubmit}>
              {userGuess === null ? (
              <>
                <input ref={userInput}
                  className="nes-input"
                  placeholder='Ingresa el pokemon'
                />
                <button className="nes-btn is-primary" onClick={testGuess}>Adivinar</button>
                <button className="nes-btn is-error" onClick={giveUp}>Rendirse</button>
              </>
              ) : (<button className="nes-btn is-error play-again" onClick={playAgain}>Volver a jugar</button> 
              )}
            </form>
            <div className="attempts">
              <p className="nes-text is-success">Aciertos: {success}</p>
              <p className="nes-text is-error">Fallados: {fails}</p>
            </div>
        </section>

        <footer className="fixed-footer">
        Hecho por <a href="https://github.com/Marcos-Iorio">Marcos Iorio</a>
        </footer>
      </main>
    </div>
  );

}

export default App;

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { BASE_URL, GQL_BASE_URL } from '../Contants';
import { selectCharacter } from "../redux/actions";

import Header from "../components/containers/Header";

const graphqlClient = new ApolloClient({
    uri: GQL_BASE_URL,
    cache: new InMemoryCache(),
    headers: {
        "x-rapidapi-key": "e72d7cd00fmsh6966eb374c88c60p1a6fa7jsnc9812567753f",
        "x-rapidapi-host": "rick-and-morty-graphql.p.rapidapi.com"
    }
});

const mapStateToProps = (state) => {
    return {
        characters: state.characters.all,
        character: state.characters.selectedById
    }
}
const mapActionToProps = { selectCharacter }

function CharacterPage({ characters, character, selectCharacter }) {
    const { characterId } = useParams();
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        let result = null
        if (characters.length > 0) {
            result = characters.find(character => character.id === characterId)
        }

        if (!result) {
            graphqlClient
                .query({
                    variables: { id: characterId },
                    query: gql`
                    query($id: ID!) { 
                        character(id: $id) { 
                            id
                            name
                            image
                            species
                            status
                            episode{ episode }
                            origin{ name }
                            location{ name }
                        }
                    }
                `
                })
                .then((response) => {
                    if (response.error) throw response;

                    const { character } = response.data

                    selectCharacter(character)
                    setErrorMessage('')
                })
                .catch(({ error }) => {
                    selectCharacter({})
                    setErrorMessage(error)
                })
        } else {
            selectCharacter(result)
            setErrorMessage('')
        }
    }, [characterId])

    return (
        <>
            <Header />
            {/* character banner */}
            <section className="hero is-success">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <figure class="pl-3 image is-128x128">
                                <img src={character.image} alt={'image ' + character.name} />
                            </figure>
                            <div className="pl-5">
                                <h1 className="title">{character.name}</h1>
                                <h2 className="subtitle">Came from {character.origin.name}</h2>
                                <span className={`tag ${character.status === 'Alive' ? 'is-danger' : 'is-light'}`}>
                                    <span className="icon is-small mr-2">
                                        <i className="fas fa-heart" aria-hidden="true"></i>
                                    </span>
                                    {character.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* character episodes */}
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <p className="mb-5">
                            <strong>Available Episode: </strong> <small>{character.episode.length || 0} episodes</small>
                        </p>

                        {errorMessage !== '' && (<p className="has-text-centered">{errorMessage}</p>)}

                        <div className="columns mb-5" style={{ flexWrap: "wrap" }}>
                            {character.episode.map((episode) => {
                                // const episodeParams = episode.split("/")

                                return (
                                    <div key={episode} className="column is-3" style={{ display: "flex", alignItems: "stretch" }}>
                                        <div class="card" style={{ display: "flex" }}>
                                            <div className="card-image" style={{ width: 150 }}>
                                                <figure class="image" style={{ height: "100%" }}>
                                                    <img style={{ height: "100%" }} src="https://rickandmortyapi.com/api/character/avatar/104.jpeg" alt="noimage" />
                                                </figure>
                                            </div>
                                            <div class="card-content">
                                                <p class="title  is-size-4">Episode {episode.episode}</p>
                                                <p class="subtitle is-size-7"> {`${BASE_URL}/${character.id}/${episode.episode}`} </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default connect(mapStateToProps, mapActionToProps)(CharacterPage)
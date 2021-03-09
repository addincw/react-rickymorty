import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { BASE_URL } from '../Contants';
import { storeCharacters } from "../redux/actions";

import CharacterCard from "../components/bases/CharacterCard";
import Header from "../components/containers/Header";
import Pagination from "../components/containers/Pagination";


const mapStateToProps = (state) => {
    return {
        characters: state.characters.all
    }
}
const mapActionToProps = { storeCharacters }

function LandingPage({ characters, storeCharacters }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [info, setInfo] = useState({});
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnChange = (val) => setQuery(val);
    const handleOnSearch = (e) => {
        e.preventDefault();

        setCurrentPage(1);
        setSearch(query);
    }

    const handleOnPrevious = () => setCurrentPage(currentPage - 1);
    const handleOnNext = () => setCurrentPage(currentPage + 1);

    useEffect(() => {
        fetch(`${BASE_URL}?page=${currentPage}&name=${search}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) throw data;

                const nextPageUrl = data.info.next || ''
                let nextPageParams = nextPageUrl.substring(nextPageUrl.indexOf('?') + 1)
                nextPageParams = new URLSearchParams(nextPageParams)

                if (nextPageParams.get('page')) setCurrentPage(parseInt(nextPageParams.get('page')) - 1)

                setInfo(data.info)
                storeCharacters(data.results)
                setErrorMessage('')
            })
            .catch(({ error }) => {
                setInfo({})
                storeCharacters([])
                setErrorMessage(error)
            })
    }, [search, currentPage])


    return (
        <>
            <Header />
            {/* character banner */}
            <section className="hero is-success">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title"> Rick and Morty </h1>
                        <h2 className="subtitle"> List  Rick and Morty Characters</h2>
                        {/* search character */}
                        <div className="field has-addons">
                            <div className="control">
                                <input className="input" type="text" placeholder="Find a character" value={query} onChange={e => handleOnChange(e.target.value)} />
                            </div>
                            <div className="control">
                                <button className="button is-warning" onClick={handleOnSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* character list */}
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <p className="mb-5">
                            <strong>Result for: </strong> <small>{search ? `${search}, ` : ''} {info.count || 0} characters</small>
                        </p>

                        {errorMessage !== '' && (<p className="has-text-centered">{errorMessage}</p>)}

                        <div className="columns mb-5" style={{ flexWrap: "wrap" }}>
                            {characters.map((character) => (
                                <Link to={`/character/${character.id}`} key={character.id} className="column is-3" style={{ display: "flex", alignItems: "stretch" }}>
                                    <CharacterCard character={character} />
                                </Link>
                            ))}
                        </div>

                        <Pagination currentPage={currentPage} totalPage={info.pages} onPrevious={handleOnPrevious} onNext={handleOnNext} />
                    </div>
                </div>

            </section>
        </>
    )
}

export default connect(mapStateToProps, mapActionToProps)(LandingPage)

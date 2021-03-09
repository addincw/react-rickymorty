import React from "react";

function CharacterCard(props) {
    const { character } = props

    return (
        <div className="box" style={{ width: '100%' }}>
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={character.image} alt={'img-' + character.name.toLowerCase().replace(' ', '-')} />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p style={{ width: '100%' }}>
                            <strong>{character.name}</strong> <small>{character.species}</small>
                            <br />
                            Came from {character.origin.name}
                        </p>
                    </div>
                    <div className="level is-mobile">
                        <div className="level-left">
                            <span className={`level-item ${character.status === 'Alive' ? 'has-text-danger' : 'has-text-grey'}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <span className="icon is-small mr-2">
                                    <i className="fas fa-heart" aria-hidden="true"></i>
                                </span>
                                {character.status}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default CharacterCard;
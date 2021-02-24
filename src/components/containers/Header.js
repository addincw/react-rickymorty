import React from "react";

function Header(props) {
    return (
        <nav className="navbar is-success" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item has-text-weight-bold" href="/">
                        Rick and Morty
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Header;
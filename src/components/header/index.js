import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const HeaderView = ({
  onMenuClick,
  activeClass,
}) => (
  <header className="Header">
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img className="Header-logo" src="" />
          <h1 className="is-size-4">
            Webhue
          </h1>
        </Link>
        <div className={`navbar-burger burger ${activeClass}`} onClick={onMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`navbar-menu ${activeClass}`}>
        <div className="navbar-end">
          <Link to="/" className="navbar-item">
            Home
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  onMenuClick(e) {
    e && e.preventDefault();
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    return HeaderView({
      onMenuClick: this.onMenuClick.bind(this),
      activeClass: this.state.isMenuOpen ? "is-active" : "",
    });
  }
}

export default Header;

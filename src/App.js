import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';
import logoIcon from './resources/images/logo/logo_small_icon_only.png';
import logoLarge from './resources/images/logo/logo_large.png';

// similar font as logo: Varela Round (free)

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header className="header-color" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            <img
              src={logoIcon}
              alt="logo"
              className="logo-icon"
            /></Link>} scroll>
            <Navigation>
              <Link to="/simpleactivity">Simple Activity</Link>
              <Link to="/kratzywordtz">Kratzy Wordtz</Link>
              <Link to="/landingpage">Landing Page</Link>
              {/* <Link to="/projects">Projects</Link> */}
              {/* <Link to="/contact">Contact</Link> */}
            </Navigation>
          </Header>
          <Drawer title={<Link style={{ textDecoration: 'none', color: 'black' }} to="/">MyPortfolio</Link>}>
            <Navigation>
              <Link to="/simpleactivity">Simple Activity</Link>
              <Link to="/kratzywordtz">Kratzy Wordtz</Link>
              {/* <Link to="/projects">Projects</Link> */}
              {/* <Link to="/contact">Contact</Link> */}
            </Navigation>
          </Drawer>
          <Content>
            <div className="page-content" />
            <Main />
          </Content>
        </Layout>
      </div>

    );
  }
}

export default App;

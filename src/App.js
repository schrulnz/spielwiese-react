import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './components/Main';
import { Link } from 'react-router-dom';
import logoIcon from './resources/images/logo/logo_small_icon_only.png';
import logoSmall from './resources/images/logo/logo_small.png';
import logoWhite from './resources/images/logo/logo_white_large.png';

// similar font as logo: Varela Round (free)

class App extends Component {

  hideToggle() {
    var selectorId = document.querySelector('.mdl-layout');
    selectorId.MaterialLayout.toggleDrawer();
  }

  render() {
    return (
      <div className="app">
        <Layout>
          <Header className="header-color" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/spielwiese-react/">
            <img
              src={logoWhite}
              alt="logo"
              style={{height: "50px"}}
            /></Link>} scroll>
            <Navigation>
              <Link to="/spielwiese-react/simpleactivity/">Simple Activity</Link>
              <Link to="/spielwiese-react/kratzywordtz/">Crasy Wordtz</Link>
            </Navigation>
          </Header>
          <Drawer title={<Link style={{ textDecoration: 'none', color: 'black' }} to="/spielwiese-react/"><img
              src={logoSmall}
              alt="logo"
              style={{height: "30px"}}
            /></Link>}>
            <Navigation>
              <Link to="/spielwiese-react/simpleactivity/" onClick={() => this.hideToggle()}>Simple Activity</Link>
              <Link to="/spielwiese-react/kratzywordtz/" onClick={() => this.hideToggle()}>Crasy Wordtz</Link>
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

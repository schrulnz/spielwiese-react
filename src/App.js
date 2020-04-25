import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';
import logoIcon from './resources/images/logo/logo_small_icon_only.png';
import logoLarge from './resources/images/logo/logo_large.png';

// similar font as logo: Varela Round (free)

class App extends Component {

  hideToggle() {
    var selectorId = document.querySelector('.mdl-layout');
    selectorId.MaterialLayout.toggleDrawer();
  }

  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header className="header-color" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/spielwiese-react/">
            <img
              src={logoIcon}
              alt="logo"
              className="logo-icon"
            /></Link>} scroll>
            <Navigation>
              <Link to="/spielwiese-react/simpleactivity/">Simple Activity</Link>
              <Link to="/spielwiese-react/kratzywordtz/">Kratzy Wordtz</Link>
            </Navigation>
          </Header>
          <Drawer title={<Link style={{ textDecoration: 'none', color: 'black' }} to="/spielwiese-react/">Spielwiese</Link>}>
            <Navigation>
              <Link to="/spielwiese-react/simpleactivity/" onClick={() => this.hideToggle()}>Simple Activity</Link>
              <Link to="/spielwiese-react/kratzywordtz/" onClick={() => this.hideToggle()}>Kratzy Wordtz</Link>
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

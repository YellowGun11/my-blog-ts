import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import './App.css';
import Layout from './components/layout';
import Home from './pages/home'
import Classfiy from './pages/classfiy'
import Photo from './pages/photo'
import About from './pages/about'
import Detail from './pages/detail'

interface Styles{
  theme:{
    [key:string]:string,
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    box-sizing: border-box;
  }

  html,body{
    height:auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    color: ${(props:Styles) => props.theme.color};
    background-color: ${(props:Styles) => props.theme.bgColor};
  }

  h1, h2, h3, h4, h5, h6 {
    color: white;
  }

`;

const theme = {
  bgColor: 'black',
  color: 'white'
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/classify' component={Classfiy} />
              <Route exact path='/photo' component={Photo} />
              <Route exact path='/about' component={About} />
              <Route path='/detail' component={Detail} />
            </Switch>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;

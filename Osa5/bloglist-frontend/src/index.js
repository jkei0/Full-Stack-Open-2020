import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'

ReactDOM.render(
  <Container>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Container>,
  document.getElementById('root'))
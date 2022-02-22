import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/index.sass'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './redux/reducers/mainReducer'

const mainStore = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={mainStore}>
      <App/>
  </Provider>, document.getElementById('root')
);

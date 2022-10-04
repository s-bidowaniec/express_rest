import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

const Root = () => (
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import Routes from './Router/Routes';
import Header from './Includes/Header';
import Footer from './Includes/Footer';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Switch  } from 'react-router-dom';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ProductsContextProvider>
        <CartContextProvider>
        <Header/>
          <Switch>
          <>
          <div className="container" style={{marginBottom: 60}} >
            <Routes />
            </div>
          </>
          </Switch>
        <Footer/>
        </CartContextProvider>
      </ProductsContextProvider>
  </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

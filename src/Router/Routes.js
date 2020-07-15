import React from "react";
import { Route } from "react-router-dom";
// We will create these two pages in a moment
import HomePage from "../Pages/Home/Home";
import Category from "../Pages/Category/Categories";
import Single from "../Pages/Home/Single";
import Product from "../Pages/Product/Products";
import AddProduct from "../Pages/Product/AddProduct";
import EditProduct from "../Pages/Product/EditProduct";
import ViewProduct from "../Pages/Product/ViewProduct";
import Cart from "../Pages/Cart";

import AddCategory from "../Pages/Category/AddCategory";
import ViewCategory from "../Pages/Category/ViewCategory";

export default function Routes() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route path="/cart" component={Cart} /> 
      <Route path={`/single-product/:id`}  render={props => <Single {...props} />}  /> 
      <Route
        path="/product"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`}   render={props => <Product {...props} />} exact />
            <Route path={`${url}/create`}  render={props => <AddProduct {...props} />}  />
            <Route path={`${url}/view/:id`}  render={props => <ViewProduct {...props} />}  />
            <Route path={`${url}/:id/edit/`}  render={props => <EditProduct {...props} />}   />
          </>
        )}
      />
      <Route
        path="/category"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`}   render={props => <Category {...props} />} exact />
            <Route path={`${url}/create`}  render={props => <AddCategory {...props} />}  />
            <Route path={`${url}/viewcategory`}  render={props => <ViewCategory {...props} />}  />
          </>
        )}
      />
    </>
  );
}

import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import {Link} from 'react-router-dom';

const CartProducts = () => {

    const { cartItems, increase, decrease, removeProduct } = useContext(CartContext);

    return ( 
        <div>
            <div className="card card-body border-0">

                {
                    cartItems.map(el =>  {
                        return <div key={el.id} className="col-lg-4">
                        <div className="card border-primary p-0">
                            <div className="card-body  p-0">
                                <img src={`http://127.0.0.1:8000/uploads/${el.image}`} alt="product" className="img-fluid" style={{objectFit: 'cover'}}/>
                                <div className="p-2">
                                     <h2 className="text-capitalize text-muted display-5">{el.name}</h2> 
                                        <p>Qty: {el.quantity} </p> 
                                     <Link className="btn btn-info text-center" to={`single-product/${el.id}`}> Show More</Link> 
                                     <button 
                                        onClick={() => increase(el)}
                                        className="btn btn-primary btn-sm mr-2 mb-1">
                                            +
                                        </button>

                                        {
                                            el.quantity > 1 &&
                                            <button
                                            onClick={() => decrease(el)}
                                            className="btn btn-danger btn-sm mb-1">
                                                -
                                            </button>
                                        }
                                        {
                                            el.quantity === 1 &&
                                            <button
                                            onClick={() => removeProduct(el)}
                                            className="btn btn-danger btn-sm mb-1">
                                                delete
                                            </button>
                                        }
                                </div>
                            </div>
                        </div> 
                        </div>
                    })
                }

            </div>
        </div>

     );
}
 
export default CartProducts;
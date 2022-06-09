import { useState } from "react";
import "./App.css";
import { data } from "./data";

export default function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [productlist, setProductlist] = useState(data);

  let addtocard = (element, id) => {
    let temp = productlist;
    temp[id].isDisabled = true;
    setCart([...cart, element]);
    setProductlist(temp);
  };
  const removefromCart = (element,id) => {
    setCart(cart.filter((e) => e !== element));
    console.log(cart);
    let index = element.id - 1;
    let temp = data;
    temp[index].isDisabled = false;
    setProductlist(temp);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand font-weight-bold">B&B</a>
        <h3 className="text-white">BEST BUY</h3>
        <div className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Products"
            aria-label="Search"
            onChange={(event) => setQuery(event.target.value)}
          />
          {/* cart start */}

          <button
            type="button"
            className="btn btn-outline-success"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart{" "}
            {cart.length}
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Cart
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Remove Item start*/}
                  <ul className="list-group">
                    {cart.map((element, index) => (
                      <li className="list-group-item " key={index}>
                        <span className="data">
                          {element.index}
                          Product Name:{" "}
                          <span className="text-danger font-weight-bold">
                            {element.name}
                          </span>
                        </span>
                        ,{" "}
                        <span className="data">
                          Price:{" "}
                          <span className="text-success font-weight-bold">
                            Rs: {element.price}
                          </span>
                        </span>
                        <button
                          type="button"
                          className="close"
                          onClick={() => removefromCart(element,index)}
                        >
                          {" "}
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* Remove Item End */}
                </div>
              </div>
            </div>
          </div>
          {/* cart End */}
        </div>
      </nav>
      

      <div className="container mt-5">
        <div className="row">
          {data
            .filter((g) => g.name.toLowerCase().includes(query))
            .map((element, index) => (
              <div className="col mt-3 mb-3 text-center">
                
                <div className="" style={{ width: "15rem" }}>
                  <img
                    src={element.pics}
                    className="card-img-top"
                    alt="..."
                    
                  />
                  <div className="card-body">
                    <h6 className="card-title bg-warning">{element.name}</h6>
                   
                    <p className="card-text font-weight-bold">Rs: {element.price}</p>
                    <button
                      disabled={element.isDisabled}
                      className="btn btn-outline-dark card_Btn"
                      onClick={() => addtocard(element, index)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

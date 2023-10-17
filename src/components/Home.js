import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useParams } from "react-router-dom"; // Import useParams hook
import Pagination from "react-js-pagination";

import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";


import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();

  // get products from the database
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease",
      once: true,
    });

    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentpageNo(pageNumber) {
    setCurrentpage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <h1 id="products_heading" data-aos="fade-right">
              Latest Products
            </h1>
            <MetaData title={"Buy Best Phones online"} />

            <section id="products" className="container mt-5">
              <div className="row" data-aos="fade-up">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentpageNo}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

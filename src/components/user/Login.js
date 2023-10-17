import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  // Validation function to check if an email is in a valid format
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Check for empty email or invalid email format
    if (!email || !isValidEmail(email)) {
      alert.error('Please enter a valid email address');
      return;
    }

    // Check if the password is empty
    if (!password) {
      alert.error('Please enter your password');
      return;
    }

    // If both email and password are valid, dispatch the login action
    dispatch(login(email, password));
  };

    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5" data-aos="fade-out">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1
                  style={{
                    textAlign: "center",
                    display: "block",
                    marginBottom: "2rem",
                  }}
                >
                  Login
                </h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link
                  to="/password/forgot"
                  style={{
                    textAlign: "center",
                    display: "block",
                    marginTop: "1rem",
                  }}
                >
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3 mb-3"
                >
                  LOGIN
                </button>

                <Link
                  to="/register"
                  style={{
                    textAlign: "center",
                    display: "block",
                    marginTop: "1rem",
                  }}
                >
                  New to here? Sign-up
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default Login

import React, { Component } from 'react'
import './App.css'
import { withFormik } from 'formik'
import Yup from 'yup'


const App = ({values, handleChange}) => {
    return (
      <form>
        <input 
            type='email'
            name='email'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
        />
        <input 
            type='password'
            name='password'
            placeholder='Password'
            value={values.password}
            onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    );
}


const FormikApp = withFormik({
  mapPropsToValues({email, password}) {
    return {
      email: email || '',
      password: password || ''
    }
  }
})(App)

// withFormik -> used to create higher Order Component
//FormikApp -> call withFormik then pass in an options object, this object is where we define everything ie. what our initial values are, how we handle validation, what to do when form gets submitted etc...
// name='email' is used by formik as identifier 
// setup props then pass through the props in mapPropsTovalues, so can set an inital value || ''(empty string)
// onSubmit -> call prop from formik that allows us to do validation as middleware then submits, (ie. like Redux-Saga, does stuff then executes function)

export default FormikApp;

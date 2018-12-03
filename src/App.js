import React from 'react'
import './App.css'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'


const App = ({values, errors, touched, isSubmitting}) => {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field 
            type='email' 
            name='email' 
            placeholder='Email'
        /><br/>
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field 
            type='password' 
            name='password' 
            placeholder='Password'
        /><br/>
      </div>
      <label>
        <Field 
            type='checkbox' 
            name='newsletter' 
            checked={values.newsletter}
            /> Join Our Newsletter
      </label><br/>
      <Field component='select' name='plan'>
        <option value='free'>Free</option>
        <option value='basic'>Basic</option>
        <option value='gold'>Gold</option>
        <option value='platinum'>Platinum</option>
      </Field>
      <button type='submit' disabled={isSubmitting}>Submit</button>
    </Form>
  );
}


const FormikApp = withFormik({
  mapPropsToValues({email, password, newsletter, plan}) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || true,
      plan: plan || 'free'      
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not Valid').required('Email is Required'),
    password: Yup.string().min(9).required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // where you make http req(get, post requests)
    // Using setTimeout to test how it handles async, test email taken
    setTimeout(() => {
      // here error is not form validation error but error coming from server. FormikBag -> set of functions we can use(resetForm, setErrors etc...)
      if(values.email === 'abdil@gmail.com'){
        console.log('it works')
        setErrors({email: 'Email not avilable'});
      } else {
        resetForm()
      }
      // submit button is disabled while server checks form info, then enabled when check is done
      setSubmitting(false)
    }, 2000)
    console.log(values)
  }
})(App)

// withFormik -> used to create higher Order Component
//FormikApp -> call withFormik then pass in an options object, this object is where we define everything ie. what our initial values are, how we handle validation, what to do when form gets submitted etc...
// name='email' is used by formik as identifier 
// setup props then pass through the props in mapPropsTovalues, so can set an inital value || ''(empty string)
// onSubmit -> call prop from formik that allows us to do validation as middleware then submits, (ie. like Redux-Saga, does stuff then executes function)
// handleSubmit -> pass into onSubmit 
// With Formik can use Form instead of form, with Form you dont need to have onSubmit={handleSubmit}, this is automatically fon with Form.
//Field -> we can use Field instead of input, Field gives us additional functionality like select dropdowns etc..., with Field you also don't need to include value and onChange because this is automatically handled.
// Field -> for checkboxes need to include values
// Field Dropdown -> for dropdown need to have component='select' and name='anything', then you create all the options to appear in dropdown

// Validation -> setup validation schema with yup. include all the fields you are validating [password: Yup.string().min(9).required()]. Yup does the rest 
//Formik gives us access to a set of errors, we can use these to render a message above the individual fields as errors occure.
// touched attribute -> when you start typing error shows up immediatly, but when using touched only shows after finished with field(clicked out of field)
// setSubmitting -> disables submit button until async request is complete. use in button tag
// resetForm -> clears all fields after valid submission
// setErrors -> allows us to set errors

export default FormikApp;

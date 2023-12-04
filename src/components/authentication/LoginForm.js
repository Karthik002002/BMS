import Divider from 'components/common/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import SocialAuthButtons from './SocialAuthButtons';

const LoginForm = ({ hasLabel }) => {
  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    let data = {}
    if((username === 'superuser' && password === 'awesomeadmin') || (username === 'dgll' && password === 'dgll@2023')  ){

      window.sessionStorage.setItem('loggedInUser', JSON.stringify(data));
      window.location.href = '/dashboard';
    }else{
      toast.error('Login Error', { theme: 'colored' });
    }

    // fetch('https://sbmsadmin.elenageosys.com/api/auth/login/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: e.target[0].value,
    //     password: e.target[1].value,
    //     client: 'smbs-webapp'
    //   })
    // })
    //   .then(response => (response = response.json()))
    //   .then(data => {
    //     if (data.non_field_errors) {
    //       toast.error(data.non_field_errors[0], { theme: 'colored' });
    //       return;
    //     }
    //     toast.success(`Logged in as ${e.target[0].value}`, {
    //       theme: 'colored'
    //     });
    //     // eslint-disable-next-line react/prop-types
    //     window.sessionStorage.setItem('loggedInUser', JSON.stringify(data));
    //     window.location.href = '/dashboard';
    //     // console.log('data: ', data)
    //   })
    //   .catch(() => {
    //     // console.error(e);
    //     toast.error('Login Error', { theme: 'colored' });
    //   });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-4">
        {hasLabel && <Form.Label>Username</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Username' : ''}
          name="username"
          type="username"
          id="loginformusername"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          name="password"
          type="password"
          id="loginformpassword"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input type="checkbox" name="remember" />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        {/* <Col xs="auto">
          <Link className="fs--1 mb-0" to={`/forgot-password`}>
            Forgot Password?
          </Link>
        </Col> */}
      </Row>

      <Form.Group>
        <Button type="submit" color="primary" className="mt-4 w-100">
          Log in
        </Button>
      </Form.Group>

      <Link to={`/contact-us`}>
        {/* <Divider className="mt-5">Contact Elena Geo Systems</Divider> */}
      </Link>

      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  // layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  props: PropTypes.object
};

LoginForm.defaultProps = {
  // layout: 'simple',
  hasLabel: false,
  props: {}
};

export default LoginForm;

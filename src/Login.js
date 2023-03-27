import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserAPIService from './APIService/userAPIService';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [register, setRegister] = useState(false)
  const [invalid_credentials, setInvalid_credentials] = useState(false)
  const { cookie, setCookie } = props;

  let navigate = useNavigate()
  useEffect(() => {
    if (cookie['token']) {
      navigate('/')
    }
  }, [cookie])

  const handleLogin = async(e) => {
    e.preventDefault();
    if ((!e.currentTarget.username.value) || (!e.currentTarget.password.value))
      return
    let user = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };
    if (register) {
      await UserAPIService.RegisterUser(user)
      .then(resp => {
        setCookie('token', resp.token);
        setCookie('username', resp.username);
      })
    }
    UserAPIService.LoginUser(user)
    .then(resp => {
      resp.token ? addCookie(resp) : setInvalid_credentials(true);
    })
  };

  function addCookie(resp) {
    setCookie('token', resp.token);
    setCookie('username', resp.username);
  }

  return (
    <React.Fragment>
      <h1>{register ? 'Register' : 'Login'}</h1>
      <br />
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3 mx-5" controlId="username" required={true}>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-2 mx-5" controlId="password" required={true}>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>
        {invalid_credentials ? (
          <p className="text-danger mx-5">Invalid credentials!</p>
        ) : (
          <br />
        )}
        <Form.Switch
          className="loginSwitch mb-4 mx-5"
          id="custom-switch"
          label="Register"
          variant="secondary"
          onClick={() => setRegister(!register)}
        />
        <Button className="mb-3 mx-5" type="submit" variant="secondary">
          {register ? 'Register' : 'Login'}
        </Button>        
      </Form>
    </React.Fragment>
  )
}

export default Login
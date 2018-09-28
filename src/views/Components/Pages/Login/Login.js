import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from '../../../../data/api/ApiConnect';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleClick(event) {
    var bodyFormData = new FormData();
    bodyFormData.set('username', this.state.username);
    bodyFormData.set('password', sha256(this.state.password));
    login(bodyFormData).then(function(response){
      console.log(response)
      if (response !== 0) {
        
        console.log(response);
        console.log("Login successfull");
        sessionStorage.setItem('jwtToken', response);
      }else {
        console.log("Username password do not match");
        alert("Username and password do not match")
      }
      window.location.reload();
  });
  }

  render() {
    if (sessionStorage.getItem('jwtToken')!==null) {
      return <Redirect push to="/home" />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" onChange={this.onChangeUsername} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" onChange={this.onChangePassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={(event) => this.handleClick(event)}>Login</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Try Ewetasker capabilities to automate tasks in an easy way.</p>
                      <Link to={{ pathname: '/register'}}>
                        <Button color="primary" className="mt-3" active>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default Login;

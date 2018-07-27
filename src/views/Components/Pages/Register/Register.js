import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { signUp } from '../../../../data/api/ApiConnect';
import { sha256 } from 'js-sha256';

class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    this.state = {
      username: '',
      password: '',
      repeatPassword: ''
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

  onChangeRepeatPassword(e) {
    this.setState({
      repeatPassword: e.target.value
    })
  }

  handleClick(event) {
    if (this.state.password !== this.state.repeatPassword) {
      alert("Password must be the same");
      return ;
    }else if(this.state.password.length<5||this.state.password===null) {
      alert("Password must be at least 6 characters");
      return ;
    }
    var bodyFormData = new FormData();
    bodyFormData.set('username', this.state.username);
    bodyFormData.set('password', sha256(this.state.password));
    signUp(bodyFormData).then(function(response){
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
      return <Redirect push to="/" />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your Ewetasker account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Username" onChange={this.onChangeUsername}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password"  onChange={this.onChangePassword}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password"  onChange={this.onChangeRepeatPassword}/>
                  </InputGroup>
                  <Button color="success" block onClick={(event) => this.handleClick(event)}>Create Account</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;

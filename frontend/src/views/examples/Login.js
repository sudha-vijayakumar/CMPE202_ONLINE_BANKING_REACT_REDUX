/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class Login extends React.Component
{

  constructor(props) {
    super(props);
    this.state = {Username:"" , password:"",admin:"",token:""}

    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handle_login = this.handle_login.bind(this);
  }

  componentDidMount() {
    this.state = {Username:"" , password:"",admin:"",token:""}
  }

  handle_login = () => {
      
      let userType = this.state.admin

      localStorage.setItem('Username', this.state.Username);
      localStorage.setItem('password',this.state.password);


     fetch('https://team-202-test.herokuapp.com/token-auth/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state)
         })
         .then(res =>  {
           if(!res.ok) {
             alert('Incorrect username/ password');
             this.state.token = "undefined";
             return;}
           else {
             this.state.token = "valid";
             return res.json();
           }
         })
         .then(json => {
           
            if(this.state.token == "valid")
            {
              if(userType=='on')
              {

                browserHistory.push('/auth/NewAccount'); 

              }
              else
              {
                
                browserHistory.push('/admin/Accounts'); 

              }
              window.location.reload();
          }
       }); 

  };

  handleEmailUpdate = (evt) => {
		this.setState({Username: evt.target.value});
	}
	handlePasswordUpdate = (evt) => {
		this.setState({password: evt.target.value});
	}
  isAdmin = (evt) => {
		this.setState({admin: evt.target.value});
	}

  render() {
    return (

              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader>
                    <large>Sign In</large>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <br/>
                    
                  <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Username"
                          type="Username"
                          autoComplete="Username"
                            value={this.state.Username} onChange={this.handleEmailUpdate}
                          />
                      </InputGroup>
                    </FormGroup>
                  
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="password"
                          type="password"
                          autoComplete="new-password"
                            value={this.state.password} onChange={this.handlePasswordUpdate}
                          />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <Input addon type="checkbox" aria-label="" onChange={this.isAdmin} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Admin" />
                        </InputGroup>
                      </FormGroup>

                    
                    <div className="text-center">
					<button type="submit" className="btn btn-md btn-warning" onClick={this.handle_login}>
						Login
					</button>
				</div>
                  </div>
                  </CardBody>
                </Card>
              </Col>
    );
  };
}


const mapStateToProps = state => {
  const { logged_in } = state
  return {
      logged_in: logged_in,
      
  }
}
const mapDispatchToProps = dispatch => {
return {
    dispatch
}
}
export default connect(mapStateToProps)(Login)

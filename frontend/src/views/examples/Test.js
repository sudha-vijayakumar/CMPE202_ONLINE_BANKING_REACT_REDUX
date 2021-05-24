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

class Test extends React.Component
{
state = {
		users: []
	}

	createNewUser = (user) => {
		fetch('https://localhost:8000/account/api/CreateCustomer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		}).then(response => response.json())
		.then(user => {
			this.setState({users: this.state.users.concat([user])});
		});
	}

  render() {
    return (
      <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <large>User login</large>
            <ToggleableUserForm
              onuserCreate={this.createNewUser}
            />
          </div>
          </CardBody>
        </Card>
      </Col>
      </>
    );
  };
}


class ToggleableUserForm extends React.Component {
	state = {
		inCreateMode: false
	}
	handleCreateClick = () => {
		this.setState({inCreateMode: true});
	}
	leaveCreateMode = () => {
		this.setState({inCreateMode: false});
	}
	handleCancleClick = () => {
		this.leaveCreateMode();
	}
	handleFormSubmit = (user) => {
		this.leaveCreateMode();
		this.props.onuserCreate(user);
	}
	render() {
			return (
				<div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
					<UserForm
						onFormSubmit={this.handleFormSubmit}
          ></UserForm>
				</div>

			)

	}
}

class UserForm extends React.Component {
	state = {
		"First_Name": this.props.First_Name || '',
		"Last_Name": this.props.Last_Name || '',
		"Username": this.props.Username || '',
    "Email": this.props.Email || '',
    "Password": this.props.Password || '',
    "Total_Accounts": parseInt(this.props.Total_Accounts) || ''
	}

	handleFormSubmit = (evt) => {
		evt.preventDefault();
		this.props.onFormSubmit({...this.state});
	}
	handleFirstNameUpdate = (evt) => {
		this.setState({First_Name: evt.target.value});
	}
	handleLastNameUpdate = (evt) => {
		this.setState({Last_Name: evt.target.value});
	}
	handleUsernameUpdate = (evt) => {
		this.setState({Username: evt.target.value});
	}
  handleEmailUpdate = (evt) => {
		this.setState({Email: evt.target.value});
	}
  handlePasswordUpdate = (evt) => {
		this.setState({Password: evt.target.value});
	}
  handleTotalAccountsUpdate = (evt) => {
		this.setState({Total_Accounts: evt.target.value});
	}

	render() {
		const buttonText = 'Sign In';
		return (
      <Form role="form" onSubmit={this.handleFormSubmit}>
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-user-04" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Firstname"
            type="Firstname"
            autoComplete="Firstname"
            value={this.state.First_Name} onChange={this.handleFirstNameUpdate}
          />
        </InputGroup>

      </FormGroup>
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-user-04" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Lastname"
            type="Lastname"
            autoComplete="Lastname"
            value={this.state.Last_Name} onChange={this.handleLastNameUpdate}
          />
        </InputGroup>

      </FormGroup>
        <FormGroup className="mb-3">
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Email"
              type="email"
              autoComplete="new-email"
              value={this.state.Email} onChange={this.handleEmailUpdate}
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
              placeholder="Password"
              type="password"
              autoComplete="new-password"
                value={this.state.Password} onChange={this.handlePasswordUpdate}
              />
          </InputGroup>
        </FormGroup>

        <FormGroup>
					<textarea className="form-control" placeholder="user Description"
						rows="5" value={this.state.Username}
						onChange={this.handleUsernameUpdate}
					>
						{this.state.Username}
					</textarea>
        </FormGroup>

        <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Total_accounts"
            type="Total_accounts"
            autoComplete="Total_accounts"
            value={this.state.Total_Accounts} onChange={this.handleTotalAccountsUpdate}
          />
        </InputGroup>
        </FormGroup>

				<div className="text-center">
					<button type="submit" className="btn btn-md btn-primary">
						{buttonText}
					</button>
				</div>
      </Form>
		)
	}
}

export default Test;

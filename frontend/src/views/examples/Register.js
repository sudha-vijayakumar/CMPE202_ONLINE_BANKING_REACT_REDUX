import React from "react";
import { connect } from 'react-redux'

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

import { submitCreateCustomerRequest } from 'actions'

function validate(First_Name,Last_Name, Email, Password,Username, Total_Accounts) {
  // true means invalid, so our conditions got reversed
  return {
    First_Name: First_Name.length === 0,
    Last_Name: Last_Name.length === 0,
    Email: Email.length === 0,
    Password: Password.length === 0,
    Username: Username.length === 0,
    Total_Accounts: Total_Accounts.length === 0
  };
}

class Register extends React.Component{
   
  componentDidMount() {

    const { dispatch, authenticated, customer,
      First_NameValidationMessage,
      Last_NameValidationMessage,
      Username_NameValidationMessage,
      Email_NameValidationMessage,
      TotalAccounts_NameValidationMessage } = this.props

}

    constructor(props) {
      super(props);
      this.state = {First_Name:"" , Last_Name:"", Username:"", Email:"", Password:"", Total_Accounts:"",
  
                    everFocusedEmail: false,
                    everFocusedPassword: false,
                    everFocusedFirstname: false,
                    everFocusedLastname: false,
                    everFocusedUsername: false,
                    everFocusedTotalAccounts: false,
                    inFocus: ""
    }

      this.handleLastNameUpdate = this.handleLastNameUpdate.bind(this);
      this.handleFirstNameUpdate = this.handleFirstNameUpdate.bind(this);
      this.handleSubmitAll = this.handleSubmitAll.bind(this);
      this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
      this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
      this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
      this.handleTotalAccountsUpdate = this.handleTotalAccountsUpdate.bind(this);
    }

  handleSubmitAll(event) {
    const { dispatch } = this.props

    event.preventDefault();

    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }

    let First_Name = this.state.First_Name
    let Last_Name = this.state.Last_Name
    let Username = this.state.Username
    let Email = this.state.Email
    let Password = this.state.Password
    let Total_Accounts = this.state.Total_Accounts
    
    // dispatch(submitCreateCustomerRequest(First_Name,Last_Name,Email,Password,Username,Total_Accounts));

    //retrieve & store token.
    fetch('https://team-202-test.herokuapp.com/account/api/CreateCustomerToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(json => {
    });

    alert('User registered successfully!');

    setTimeout(this.props.history.push('unauth/login'), 3000);

  }

  canBeSubmitted() {
    const errors = validate(this.state.First_Name,this.state.Last_Name,this.state.Email, this.state.Password,this.state.Username, this.state.Total_Accounts);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
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
        const { dispatch, authenticated, customer,
        First_NameValidationMessage,
        Last_NameValidationMessage,
        Username_NameValidationMessage,
        Email_NameValidationMessage,
        TotalAccounts_NameValidationMessage } = this.props

        const errors = validate(this.state.First_Name,this.state.Last_Name,this.state.Email, this.state.Password,this.state.Username, this.state.Total_Accounts);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
   
        return (
          <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader>
              <large>Sign Up</large>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <br/>
              
              <Form role="form" id='regForm'>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className={errors.First_Name ? "error" : ""}
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
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className={errors.Last_Name ? "error" : ""}
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
                        className={errors.Email ? "error" : ""}
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
                        className={errors.Password ? "error" : ""}
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                          value={this.state.Password} onChange={this.handlePasswordUpdate}
                        />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={errors.Username ? "error" : ""}
                        placeholder="Username"
                        type="Username"
                        autoComplete="Username"
                          value={this.state.Username} onChange={this.handleUsernameUpdate}
                        />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-copy-04" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className={errors.Total_Accounts ? "error" : ""}
                      placeholder="Total_accounts"
                      type="Total_accounts"
                      autoComplete="Total_accounts"
                      value={this.state.Total_Accounts} onChange={this.handleTotalAccountsUpdate}
                    />
                  </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <button disabled={isDisabled} type="submit" className="btn btn-md btn-warning" onClick={this.handleSubmitAll}>
                      Register
                    </button>
                  </div>
                </Form>
	
            </div>
            </CardBody>
          </Card>
        </Col>
        );
    }
}

const mapStateToProps = state => {
    const { customer } = state
    return {
        isFetching: customer.isFetching,
        customer: customer.items,
        First_NameValidationMessage: customer.First_NameValidationMessage,
        Last_NameValidationMessage: customer.Last_NameValidationMessage,
        Email_NameValidationMessage: customer.Email_NameValidationMessage,
        Username_NameValidationMessage: customer.Username_NameValidationMessage,
        TotalAccounts_NameValidationMessage: customer.TotalAccounts_NameValidationMessage,
    }
}
const mapDispatchToProps = dispatch => {
  return {
      dispatch
  }
}
export default connect(mapStateToProps)(Register)
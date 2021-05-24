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
  Col,Label, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";

import { submitCreateAccountRequest, fetchAllCustomers } from 'actions'


class ManageAccount extends React.Component{
   
  componentDidMount() {
    const { dispatch, authenticated, customers } = this.props

    this.state = {Username:localStorage.getItem('Username') , password:localStorage.getItem('password')}

        //retrieve & store token.
        fetch('https://team-202-test.herokuapp.com/token-auth/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state)
              })
              .then(res =>  {
                if(!res.ok) throw new Error(res.status);
                else return res.json();
              })
              .then(json => {
                localStorage.setItem('token', json.token);

                const token =  localStorage.getItem('token');
                // alert(token)
                dispatch(fetchAllCustomers(token));

                this.setState({
                  logged_in: true,
                });
            });
       
}

    constructor(props) {
      super(props);
      this.state = {Username:"" , Account_Type:"", Balance:0,
                    everFocusedUsername: false,
                    everFocusedAccountType: false,
                    everFocusedBalance: false,
                    inFocus: ""
    }

      this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
      this.handleAccountTypeUpdate = this.handleAccountTypeUpdate.bind(this);
      this.handleBalanceUpdate = this.handleBalanceUpdate.bind(this);

      this.handleSubmitAll = this.handleSubmitAll.bind(this);
    }

  handleSubmitAll(event) {
    const { dispatch, account } = this.props

    event.preventDefault();

    let Username = this.state.Username
    let Account_Type = this.state.Account_Type
    let Balance = this.state.Balance
    const token =  localStorage.getItem('token');
    dispatch(submitCreateAccountRequest(Username,Account_Type,Balance,token));

    alert(Account_Type+' account created successfully!');

  }

	handleUsernameUpdate = (evt) => {
		this.setState({Username: evt.target.value});
	}
	handleAccountTypeUpdate = (evt) => {
		this.setState({Account_Type: evt.target.value});
	}
  handleBalanceUpdate = (evt) => {
		this.setState({Balance: evt.target.value});
	}

    render() {
        const { dispatch, authenticated, getCustomers, account } = this.props
   
        return (
          <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader>
              <large>Add New Account</large>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <br/>
              
              <Form role="form" id='regForm'>

                  <FormGroup>
                        <Label for="exampleSelect">Username</Label>
                        <Input type="select"  name="select" id="exampleSelect" value={this.state.Username} onChange={this.handleUsernameUpdate}>
                         <option>--Select--</option>
                         {getCustomers.customers
                                      ? getCustomers.customers.map(cust => {
                                          if(cust.isAdmin=='False')
                                          {
                                            return <option key={cust.Cust_UUID} value={cust.Cust_UUID}>{cust.Username}</option>;
                                          }
                                          else
                                          {
                                            // return <option></option>;
                                          }
                                        })
                                      : "Username loading.."}
                        
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">Account Type</Label>
                        <Input type="select"  name="select" id="exampleSelect" value={this.state.Account_Type} onChange={this.handleAccountTypeUpdate}>
                          <option>--Select--</option>
                          <option>Checking</option>
                          <option>Savings</option>
                        </Input>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-credit-card"  />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.handleBalanceUpdate}
                            placeholder="Balance in USD"
                            type="Amount"
                            autoComplete="Amount"
                            />
                        </InputGroup>
                      </FormGroup>                  
                  <div className="text-center">
                    <button type="submit" className="btn btn-md btn-warning" onClick={this.handleSubmitAll}>
                      Add account
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
    const { getCustomers,account} = state
    return {
        isFetching: account.isFetching,
        getCustomers: getCustomers.items

    }
}
const mapDispatchToProps = dispatch => {
  return {
      dispatch
  }
}
export default connect(mapStateToProps)(ManageAccount)

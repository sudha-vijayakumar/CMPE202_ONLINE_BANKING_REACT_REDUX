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
  Label
} from "reactstrap";

import { extTransfer, fetchAccounts } from 'actions'

class ExternalTransfer extends React.Component
{
  componentDidMount() {
    const { dispatch, authenticated, accounts,extTransfer } = this.props
    
    const token = localStorage.getItem('token');
    const custid = localStorage.getItem('cust_uuid');

    dispatch(fetchAccounts(custid,token));
}

    constructor(props) {
      super(props);
      this.state = { Source_Account_Num: 1234, Dest_Account_Num: 1234, Amount: 0, Details: "Testing Send",
                    everFocusedAccountType: false,
                    inFocus: ""
    }
      this.handleBalanceUpdate = this.handleBalanceUpdate.bind(this);

      this.handleSrcAccNumberUpdate = this.handleSrcAccNumberUpdate.bind(this);
      this.handleDestAccNumberUpdate = this.handleDestAccNumberUpdate.bind(this);

      this.handleTransfer = this.handleTransfer.bind(this);
    }

    handleTransfer(event) {
    const { dispatch } = this.props

    event.preventDefault();

    let Source_Account_Num = this.state.Source_Account_Num
    let Dest_Account_Num = this.state.Dest_Account_Num
    let Amount = parseFloat(this.state.Amount)
    let Details = "Internal transfer"

    const token = localStorage.getItem('token');
    
    dispatch(extTransfer(Source_Account_Num,Dest_Account_Num,Amount,Details,token));
    
    alert("Transfer successful !");

  }


	handleSrcAccNumberUpdate = (evt) => {
		this.setState({Source_Account_Num: evt.target.value});
	}

  handleDestAccNumberUpdate = (evt) => {
		this.setState({Dest_Account_Num: evt.target.value});
	}

  handleBalanceUpdate = (evt) => {
		this.setState({Amount: evt.target.value});
	}



  render() {
    const { accounts } = this.props
    const buttonText = 'Transfer';
    return (
          <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <Form>
                      <FormGroup>
                        <Label for="exampleSelect">From</Label>
                          <Input type="select" name="select" id="exampleSelect" onLoad={this.handleSrcAccNumberUpdate} onChange={this.handleSrcAccNumberUpdate}>
                            <option>--Select--</option>
                                          {accounts.accounts
                                            ? accounts.accounts.map(acct => {
                                                return (<option key={acct.Account_Number} value={acct.Account_Number}>{acct.Account_Type}</option>);
                                              })
                                            : "Accounts loading.."}
                          </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">To</Label>
                          <Input type="select" name="select" id="exampleSelect1" onLoad={this.handleDestAccNumberUpdate} onChange={this.handleDestAccNumberUpdate}>
                              <option>--Select--</option>
                              <option value="12">Internet</option>
                              <option value="123">Disney Subscription</option>
                              <option value="1234">School fee</option>
                              <option value="12345">Utility</option>
                              <option value="123456">Electricity</option>
                            </Input>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-credit-card"  />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input  onChange={this.handleBalanceUpdate}
                            placeholder="Amount in USD"
                            type="Amount"
                            autoComplete="Amount"
                            />
                        </InputGroup>
                      </FormGroup>

                      {/* <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <Input addon type="checkbox" aria-label="" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Check if recurring transfer" />
                        </InputGroup>
                      </FormGroup> */}

                      <div className="text-center">
                        <button type="submit" className="btn btn-md btn-primary" onClick={this.handleTransfer}>
                          {buttonText}
                        </button>
                      </div>
                      </Form>
                  </div>
                  </CardBody>
                </Card>
              </Col>
          </div>
    );
  };
}


const mapStateToProps = state => {
  const { accounts, extTransfer } = state
  return {
      isFetching: accounts.isFetching,
      accounts: accounts.items,
      // extTransfer: extTransfer.items
  }
}
const mapDispatchToProps = dispatch => {
return {
    dispatch
}
}
export default connect(mapStateToProps)(ExternalTransfer)


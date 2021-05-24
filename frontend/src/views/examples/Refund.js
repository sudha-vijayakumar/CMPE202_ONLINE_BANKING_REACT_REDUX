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
  Col,Label,InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";

import { submitRefund, fetchActiveAccounts } from 'actions'

class Refund extends React.Component{
   
  componentDidMount() {
    const { dispatch, authenticated, getActiveAccounts,refund } = this.props
    const token =  localStorage.getItem('token');
    dispatch(fetchActiveAccounts(token));
}

    constructor(props) {
      super(props);
      this.state = {Account_Num:"", Amount:0,
                    everFocusedAccountType: false,
                    inFocus: ""
    }
      this.handleBalanceUpdate = this.handleBalanceUpdate.bind(this);

      this.handleActiveAccNumberUpdate = this.handleActiveAccNumberUpdate.bind(this);

      this.handleRefund = this.handleRefund.bind(this);
    }

    handleRefund(event) {
    const { dispatch } = this.props

    event.preventDefault();

    let Account_Num = this.state.Account_Number
    let Amount = this.state.Amount

    const token =  localStorage.getItem('token');

    dispatch(submitRefund(Account_Num,parseFloat(Amount),token));
    
    alert("Refund successful to account number: "+ Account_Num+" !");

  }


	handleActiveAccNumberUpdate = (evt) => {
		this.setState({Account_Number: evt.target.value});
	}

  handleBalanceUpdate = (evt) => {
		this.setState({Amount: evt.target.value});
	}


    render() {
        const { getActiveAccounts } = this.props
   
        return (
          <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader>
              <large>Refund</large>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <Form role="form" id='regForm'>
                  <FormGroup>
                        <Label for="exampleSelect">Account</Label>
                        <Input type="select"  name="select" id="exampleSelect" value={this.state.Account_Number} onChange={this.handleActiveAccNumberUpdate}>
                        <option>--Select--</option>
                        {getActiveAccounts.accounts
                                      ? getActiveAccounts.accounts.map(acct => {
                                          return (<option key={acct.Account_Number} value={acct.Account_Number}>{acct.Account_Number}</option>);
                                        })
                                      : "Accounts loading.."}
                        
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
                  <button type="submit" className="btn btn-md btn-warning" onClick={this.handleRefund}>
                      Refund
                  </button> 
                </Form>
	
            </div>
            </CardBody>
          </Card>
        </Col>
        );
    }
}

const mapStateToProps = state => {
    const { refund, getActiveAccounts } = state
    return {
        isFetching: getActiveAccounts.isFetching,
        getActiveAccounts: getActiveAccounts.items,
        // refund: refund.items
    }
}
const mapDispatchToProps = dispatch => {
  return {
      dispatch
  }
}
export default connect(mapStateToProps)(Refund)

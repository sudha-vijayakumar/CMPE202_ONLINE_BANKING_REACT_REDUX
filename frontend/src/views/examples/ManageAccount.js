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
  Col,Label
} from "reactstrap";

import { submitActivate,submitDeactivate, fetchActiveAccounts, fetchInactiveAccounts } from 'actions'
import accounts from "reducers/accounts";

class MangeAccount extends React.Component{
   
  componentDidMount() {
    const { dispatch, authenticated, getInactiveAccounts, getActiveAccounts } = this.props
    
    const token =  localStorage.getItem('token');
    
    dispatch(fetchInactiveAccounts(token));
    dispatch(fetchActiveAccounts(token));
}

    constructor(props) {
      super(props);
      this.state = {Account_Number:"", 
                    everFocusedAccountType: false,
                    inFocus: ""
    }

      this.handleActiveAccNumberUpdate = this.handleActiveAccNumberUpdate.bind(this);
      this.handleInactiveAccNumberUpdate = this.handleInactiveAccNumberUpdate.bind(this);

      this.handleRefreshActive = this.handleRefreshActive.bind(this);
      this.handleRefreshInActive = this.handleRefreshInActive.bind(this);

      this.handleSubmitActivate = this.handleSubmitActivate.bind(this);
      this.handleSubmitDeactivate = this.handleSubmitDeactivate.bind(this);
    }

  handleSubmitActivate(event) {
    const { dispatch, getInactiveAccounts } = this.props

    event.preventDefault();

    let Account_Number = this.state.Account_Number
    
    const token =  localStorage.getItem('token');

    dispatch(submitActivate(Account_Number,token));
    
    alert(Account_Number+' activated successfully!');

  }

  handleSubmitDeactivate(event) {
    const { dispatch, getInactiveAccounts } = this.props

    event.preventDefault();

    let Account_Number = this.state.Account_Number
    
    const token =  localStorage.getItem('token');

    dispatch(submitDeactivate(Account_Number,token));

    alert(Account_Number+' de-activated successfully!');

  }

  handleRefreshActive(event){
    const { dispatch, getActiveAccounts } = this.props
    
    const token =  localStorage.getItem('token');

    event.preventDefault();

    dispatch(fetchActiveAccounts(token));
  }

  handleRefreshInActive(event){
    const { dispatch, getInactiveAccounts } = this.props

    const token =  localStorage.getItem('token');

    event.preventDefault();

    dispatch(fetchInactiveAccounts(token));

  }

	handleActiveAccNumberUpdate = (evt) => {
		this.setState({Account_Number: evt.target.value});
	}

  handleInactiveAccNumberUpdate = (evt) => {
		this.setState({Account_Number: evt.target.value});
	}

    render() {
        const { getInactiveAccounts, getActiveAccounts } = this.props
   
        return (
          <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader>
              <large>Manage Accounts</large>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <Form role="form" id='regForm'>
                  <FormGroup>
                        <Label for="exampleSelect">Inactive accounts</Label>
                        <Input type="select"  name="select" id="exampleSelect" value={this.state.Account_Number} onChange={this.handleInactiveAccNumberUpdate}>
                        <option>--Select--</option>
                         {getInactiveAccounts.accounts
                                      ? getInactiveAccounts.accounts.map(acct => {
                                          return (<option key={acct.Account_Number} value={acct.Account_Number}>{acct.Account_Number}</option>);
                                        })
                                      : "Accounts loading.."}
                        
                        </Input>
                      </FormGroup>

                  <div className="text-center">
                    <button type="submit" className="btn btn-md btn-success" onClick={this.handleSubmitActivate}>
                      Activate
                    </button>
                    <button type="submit" className="btn btn-md btn-info" onClick={this.handleRefreshInActive}>
                      Refresh
                    </button>
                  </div>
                  <br/>
                  <FormGroup>
                        <Label for="exampleSelect">Active accounts</Label>
                        <Input type="select"  name="select" id="exampleSelect" value={this.state.Account_Number} onChange={this.handleActiveAccNumberUpdate}>
                        <option>--Select--</option>
                         {getActiveAccounts.accounts
                                      ? getActiveAccounts.accounts.map(acct => {
                                          return (<option key={acct.Account_Number} value={acct.Account_Number}>{acct.Account_Number}</option>);
                                        })
                                      : "Accounts loading.."}
                        
                        </Input>
                  </FormGroup>                      
                  <button type="submit" className="btn btn-md btn-warning" onClick={this.handleSubmitDeactivate}>
                      Close
                    </button>
                  <button type="submit" className="btn btn-md btn-info" onClick={this.handleRefreshActive}>
                      Refresh
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
    const { getInactiveAccounts, getActiveAccounts } = state
    return {
        isFetching: getInactiveAccounts.isFetching,
        getActiveAccounts: getActiveAccounts.items,
        getInactiveAccounts: getInactiveAccounts.items

    }
}
const mapDispatchToProps = dispatch => {
  return {
      dispatch
  }
}
export default connect(mapStateToProps)(MangeAccount)

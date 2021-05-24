
import React, { Component } from 'react'
import AccountComp from 'components/AccountComp'
import { connect } from 'react-redux'
import { fetchAccounts,fetchCustomers } from 'actions'
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
} from "reactstrap";

const style = {
    float: 'right'
}

class AccountsPage extends Component {

    componentDidMount() {

        const { dispatch, authenticated } = this.props
        
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
                // if (json.status === 200)
                // {
                  localStorage.setItem('token', json.token);
                  localStorage.setItem('cust_uuid',json.user.Cust_UUID);

                  const custid = localStorage.getItem('cust_uuid');
                  const token =  localStorage.getItem('token');

                  dispatch(fetchCustomers(custid,token));
                  dispatch(fetchAccounts(custid,token));

                  this.setState({
                    logged_in: true,
                  });
                // }
            }); 
    }


    render() {
        const { accounts,getCustomer } = this.props


        return (
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                  <Container fluid>
                      <Row>
                        <Col className="mb-5 mb-xl-0" xl="8">
                          <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <div className="col">
                                  <h4 className="text-white mb-0">
                                    Hello &nbsp;&nbsp;
                                    {getCustomer.customer
                                      ? getCustomer.customer.map(cust => {
                                          return <b key={cust.Cust_UUID}>{cust.First_Name} {cust.Last_Name} !</b>;
                                        })
                                      : "Username loading.."}
                                  </h4>
                                </div>
                              </Row>
                            </CardHeader>
                          </Card>
                        </Col>
                      </Row>
                      <br/>
                      <Row>
                        <Col>
                          {accounts.accounts
                              ? accounts.accounts.map(account => {
                                  return (<AccountComp key={account.Customer_ID} {...account} />);
                                })
                              : "Balance loading.."}
                        </Col>
                      </Row>
                  </Container>
                </div>
        )
    }
}

const mapStateToProps = state => {
    const { accounts, getCustomer, login } = state
    return {
        isFetching: accounts.isFetching,
        accounts: accounts.items,
        getCustomer:getCustomer.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage)

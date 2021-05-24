
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAccounts,fetchCustomers } from 'actions'
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col, Label
} from "reactstrap";

const style = {
    float: 'right'
}

class Profile extends Component {

    componentDidMount() {

        const { dispatch, authenticated } = this.props
        const token =  localStorage.getItem('token');
        const custid = localStorage.getItem('cust_uuid');

        dispatch(fetchCustomers(custid,token));
    }


    render() {
        const { getCustomer } = this.props


        return (
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                  <Container fluid>
                      <Row>
                        <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <Col>
                                        <Row>
                                        <h4 className="text-white mb-0">
                                          <i className="ni ni-circle-08" /> &nbsp;
                                          <Label>Firstname</Label>
                                        </h4>
                                        </Row>
                                </Col>
                                <Col>
                                        <Row>
                                          <h4 className="text-white mb-0">
                                          {getCustomer.customer
                                            ? getCustomer.customer.map(cust => {
                                                return (<Label>{cust.First_Name}</Label>);
                                              })
                                            : "Username loading.."}
                                        </h4>
                                        </Row>
                                </Col>
                              </Row>
                            </CardHeader>
                          </Card>
                          <Card className="bg-gradient-warning shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <Col>
                                        <Row>
                                        <h4 className="text-white mb-0">
                                        <i className="ni ni-circle-08" /> &nbsp;
                                          <Label>Lastname</Label>
                                        </h4>
                                        </Row>
                                </Col>
                                <Col>
                                        <Row>
                                          <h4 className="text-white mb-0">
                                          {getCustomer.customer
                                            ? getCustomer.customer.map(cust => {
                                                return (<Label>{cust.Last_Name}</Label>);
                                              })
                                            : "Username loading.."}
                                        </h4>
                                        </Row>
                                </Col>
                              </Row>
                            </CardHeader>
                          </Card>
                          <Card className="bg-gradient-warning shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <Col>
                                        <Row>
                                        <h4 className="text-white mb-0">
                                        <i className="ni ni-badge" /> &nbsp;
                                          <Label>Username</Label>
                                        </h4>
                                        </Row>
                                </Col>
                                <Col>
                                        <Row>
                                          <h4 className="text-white mb-0">
                                          {getCustomer.customer
                                            ? getCustomer.customer.map(cust => {
                                                return (<Label>{cust.Username}</Label>);
                                              })
                                            : "Username loading.."}
                                        </h4>
                                        </Row>
                                </Col>
                              </Row>
                            </CardHeader>
                          </Card>
                          <Card className="bg-gradient-warning shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <Col>
                                        <Row>
                                        <h4 className="text-white mb-0">
                                        <i className="ni ni-email-83" /> &nbsp;
                                          <Label>Email</Label>
                                        </h4>
                                        </Row>
                                </Col>
                                <Col>
                                        <Row>
                                          <h4 className="text-white mb-0">
                                          {getCustomer.customer
                                            ? getCustomer.customer.map(cust => {
                                                return (<Label>{cust.Email}</Label>);
                                              })
                                            : "Username loading.."}
                                        </h4>
                                        </Row>
                                </Col>
                              </Row>
                            </CardHeader>
                          </Card>
                          <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <Col>
                                        <Row>
                                        <h4 className="text-white mb-0">
                                        <i className="ni ni-bullet-list-67" /> &nbsp;
                                          <Label>Total_Accounts</Label>
                                        </h4>
                                        </Row>
                                </Col>
                                <Col>
                                        <Row>
                                          <h4 className="text-white mb-0">
                                          {getCustomer.customer
                                            ? getCustomer.customer.map(cust => {
                                                return (<Label>{cust.Total_Accounts}</Label>);
                                              })
                                            : "Username loading.."}
                                        </h4>
                                        </Row>
                                </Col>
                              </Row>
                            </CardHeader>
                          </Card>
                        </Col>
                      </Row>
                      <br/><br/><br/><br/>
                  </Container>
                </div>
        )
    }
}

const mapStateToProps = state => {
    const { getCustomer } = state
    return {
        isFetching: getCustomer.isFetching,
        getCustomer:getCustomer.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

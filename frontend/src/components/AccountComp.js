import React,{Component} from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import formatMoney from 'formatMoney'

class AccountComp extends Component {


    componentDidMount() {

        const { dispatch,Account_Number } = this.props
        // dispatch(fetchTransactions(Account_Number));

    }


    render() {
        const {  
                 Account_Type,
                 Account_Number,status,
                 Balance } = this.props
        return (
          <div>
          <Row>
            <Col lg="8" xl="8">
              <Card className="card-stats mb-8 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h6"
                        className="text-uppercase text-muted mb-0"
                      >

                      {status=='Inactive'
                              ? <h2>Inactive</h2>
                              : ''
                      }
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          <span className="h6 mb-0">
                           {`Account_Number/ ${Account_Number}`}-XXXXX
                          </span>
                        </h6>
                        <h4 className="text-uppercase text-red ls-1 mb-1">
                        <span className="font-weight-bold mb-0">
                          {Account_Type}
                        </span>
                        </h4>
                      </CardTitle>
                      <br/>
                      <span className="h4 font-weight-bold mb-0">
                      {` ${formatMoney(Balance)}`}
                      </span>

                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-calculator" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <hr/>
          {/* <Row>
            <Col>
            {transactions.transactions
              ? transactions.transactions.map(transaction => {
                  return (<TransactionComp key={transaction.Acc_Number} {...transaction} />);
                })
              : "Loading..."}

            </Col>
          </Row> */}
          </div>
        )
    }
}

const mapStateToProps = state => {
    const { transactions } = state
    return {
        isFetching: transactions.isFetching,
        transactions: transactions.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountComp)

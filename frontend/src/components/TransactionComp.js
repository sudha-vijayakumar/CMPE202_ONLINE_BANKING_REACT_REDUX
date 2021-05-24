import React from 'react'
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
import SimpleDateTime  from 'react-simple-timestamp-to-date';

function getParsedDate(date){
  date = String(date).split(' ');
  var days = String(date[0]).split('-');
  var hours = String(date[1]).split(':');
  return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
}

const TransactionComp = ({
    Acc_Number, Transaction_Type,Amount,Details, Transaction_Date
}) => (         <div>
                <Row className="mt-5">
                  <Col className="mb-5 mb-xl-0" xl="8">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col">
                            <h3 className="mb-0">Recent transactions</h3>
                          </div>
                          <div className="col text-right">
                            <Button
                              color="primary"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              size="sm"
                            >
                              See all
                            </Button>
                          </div>
                        </Row>
                      </CardHeader>
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"><SimpleDateTime dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">{Transaction_Date}</SimpleDateTime></th>
                            <td>{Details}</td>
                            <td>{Transaction_Type}</td>
                            <td>{Amount}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6" xl="3">
                    <hr/>
                  </Col>
                </Row>
                </div>
    )

export default TransactionComp

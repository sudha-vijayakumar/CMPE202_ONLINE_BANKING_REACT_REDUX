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
  Label
} from "reactstrap";

class InternalTransfer extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }



  render() {
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
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Checking</option>
                          <option>Savings</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">To</Label>
                        <Input type="select" name="select" id="exampleSelect">
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
                          <Input
                            placeholder="Amount in USD"
                            type="Amount"
                            autoComplete="Amount"
                            />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                       <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-copy-04"  />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Description"
                            type="Description"
                            autoComplete="Description"
                            />
                        </InputGroup>
                      </FormGroup>

                      <div className="text-center">
                        <button type="submit" className="btn btn-md btn-primary">
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


export default InternalTransfer;

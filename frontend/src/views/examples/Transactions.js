
import React, { Component, forwardRef} from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import { fetchAccounts, fetchTransactions, fetchTransactions18, fetchTransactionsrange } from 'actions'
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Container,
  Row,
  Col,
  InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";



import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const style = {
  float: 'right'
}


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class Transactions extends Component {

    componentDidMount() {

        const { dispatch, authenticated, accounts } = this.props

        // const custid = '3b70f9a0-fdcf-4060-9c8f-ea4de7b15b55';
        // dispatch(fetchAccounts(custid));
        const custid = localStorage.getItem('cust_uuid');
        const token =  localStorage.getItem('token');
        dispatch(fetchAccounts(custid,token));

    }

    constructor(props) {
      super(props);
      this.state = {value: 'Checking', range:1};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleRangeChange = this.handleRangeChange.bind(this);
      this.handleSubmitAll = this.handleSubmitAll.bind(this);
      this.handleSubmit18 = this.handleSubmit18.bind(this);
      this.handleSubmitRange = this.handleSubmitRange.bind(this);

    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleRangeChange(event) {
      this.setState({range: event.target.value});
    }

    handleSubmitAll(event) {
      const { dispatch, authenticated, accounts } = this.props
      const token =  localStorage.getItem('token');
      dispatch(fetchTransactions(this.state.value,token)); 
      event.preventDefault();
    }

    handleSubmit18(event) {
      const { dispatch, authenticated, accounts } = this.props
      const token =  localStorage.getItem('token');
      dispatch(fetchTransactions18(this.state.value,token)); 
      event.preventDefault();
    }

    handleSubmitRange(event) {
      const { dispatch, authenticated, accounts } = this.props
      const token =  localStorage.getItem('token');
      dispatch(fetchTransactionsrange(this.state.value, this.state.range,token)); 
      event.preventDefault();
    }

    render() {
        const { getCustomer,transactions, accounts } = this.props
        
        const buttonText1 = 'All';
        const buttonText2 = 'Past 18 months';
        const buttonText3 = 'View';
        
        const columns = [
          { title: "Account", field: "Account_Type" },
          { title: "Transaction Type", field: "Transaction_Type" },
          { title: "Date", field: "Transaction_Date",type:"datetime" }, 
          { title: "Amount", field: 'Amount',type:"int" }
        ] 

        return (
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                  <Container fluid>

                        <Row>
                        <Col>
                          <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <div className="col">
                                  <h3 className="text-white mb-0">
                                    Transactions Summary
                                  </h3>
                                </div>
                              </Row>
                            </CardHeader>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                            <Card className="bg-secondary shadow border-0">
                               <CardBody className="px-lg-5 py-lg-5">
                                  <Form>
                                    <FormGroup>
                                      <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange}>
                                      <option>--Select--</option>
                                      {accounts.accounts
                                          ? accounts.accounts.map(acct => {
                                              return (<option key={acct.Account_Number} value={acct.Account_Number}>{acct.Account_Type}</option>);
                                            })
                                          : "Accounts loading.."}
                                      </Input>
                                    </FormGroup>
                                    <div className="text-center">
                                      <button type="submit" className="btn btn-md btn-primary" onClick={this.handleSubmitAll}>
                                        {buttonText1}
                                      </button>
                                      <button type="submit" className="btn btn-md btn-warning" onClick={this.handleSubmit18}>
                                        {buttonText2}
                                      </button>
                                      <InputGroup className="py-sm-3">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Enter how many months" onChange={this.handleRangeChange} />
                                      </InputGroup>
                                      <button type="submit" className="btn btn-md btn-info" onClick={this.handleSubmitRange}>
                                        {buttonText3}
                                      </button>
                                    </div>
                                    </Form>
                                </CardBody>
                              </Card>
                        </Col>
                      </Row>
                      <br/>
                      <Row>
                        <Col>
                        <Card className="h5 bg-gradient-white shadow">
                          <CardHeader>
                                <MaterialTable
                                  title=""
                                  data={transactions.transactions}
                                  columns={columns}
                                  icons={tableIcons}
                                  
                                />
                          </CardHeader>
                        </Card>
                        </Col>
                      </Row>
                  </Container>
                </div>
        )
    }
}

const mapStateToProps = state => {
    const { transactions, getCustomer, login, accounts } = state
    return {
        isFetching: transactions.isFetching,
        transactions: transactions.items,
        getCustomer:getCustomer.items,
        accounts: accounts.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

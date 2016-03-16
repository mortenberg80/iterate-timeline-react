'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let EmployeeBox = require('./employeeBox').EmployeeBox;
let MonthRange = require('./month-range').MonthRange;
let moment = require('moment');
let employee = require('./employee').employee;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allEmployees: [],
      employees: [],
      month: moment()
    }
    this.update = this.update.bind(this)
  }
  loadEmployeesFromServer() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(json => {
        let all = json.map(employee);
        let current = all.filter(employee => employee.isEmployedOn(this.state.month));
        this.setState({
          allEmployees: all,
          employees: current
        })
      })
      .catch(error => console.log(this.props.url, error))
  }
  componentWillMount() {
    this.loadEmployeesFromServer();
  }
  update(monthMap) {
    let month = monthMap.get(+ReactDOM.findDOMNode(this.refs.month.refs.inp).value);
    let current = this.state.allEmployees.filter(employee => employee.isEmployedOn(month));
    this.setState({
      month: month,
      employees: current
    });
  }
  render() {
    if (!this.state.allEmployees) {
      return (
        <div>
          <MonthRange ref='month' update={this.update} label='Måned' />
          Laster ansatte...
        </div>
      )
    }
    return (
      <div>
        <MonthRange ref='month' update={this.update} label='Måned' />
        <EmployeeBox allEmployees={this.state.allEmployees} employees={this.state.employees} month={this.state.month} />
      </div>
    )
  }
}

App.propTypes = {
  url: React.PropTypes.string.isRequired
}

ReactDOM.render(
  <App url='/data/employees.json' />,
  document.getElementById('content')
);

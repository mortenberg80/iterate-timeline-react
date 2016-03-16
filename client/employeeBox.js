'use strict';

let React = require('react');

class EmployeeImages extends React.Component {
  render()  {
    let employeeNodes = this.props.employees.map(function(employee) {
      return (
        <img key={employee.id} src={employee.image} title={employee.name} alt={employee.name} width='100px' />
      );
    });
    return (
      <div className='employeeImages maincontent' >
        {employeeNodes}
      </div>
    )
  }
}

EmployeeImages.propTypes = {
  employees: React.PropTypes.array.isRequired
}

class EmployeeStats extends React.Component {
  render() {
    let numberOfEmployees = this.props.employees.length;
    let males = this.props.employees.filter(employee => employee.isMale).length;
    let females = this.props.employees.filter(employee => employee.isFemale).length;
    let ratio = ((females / males) * 100).toFixed();
    let alumni = this.props.allEmployees.filter(employee => employee.startDate <= this.props.month).length;
    let month = this.props.month.format('MMMM YYYY');
    return (
      <div className='aside' >
        <h2>Statistikk per {month}</h2>
        <dl id="stats">
          <dt>Antall ansatte</dt>
          <dd>{numberOfEmployees}</dd>
          <dt>Kvinneandel</dt>
          <dd>{ratio} %</dd>
          <dt>Antall ansatte inkludert de som har sluttet</dt>
          <dd>{alumni}</dd>
        </dl>
      </div>
    )
  }
}

EmployeeStats.propTypes = {
  employees: React.PropTypes.array.isRequired,
  allEmployees: React.PropTypes.array.isRequired,
  month: React.PropTypes.object.isRequired
}

class EmployeeBox extends React.Component {
  render() {
    return (
      <div className='container'>
        <EmployeeImages employees={this.props.employees} />
        <EmployeeStats allEmployees={this.props.allEmployees} employees={this.props.employees} month={this.props.month} />
      </div>
    );
  }
}

EmployeeBox.propTypes = {
  employees: React.PropTypes.array.isRequired,
  allEmployees: React.PropTypes.array.isRequired,
  month: React.PropTypes.object.isRequired
}

module.exports.EmployeeBox = EmployeeBox;

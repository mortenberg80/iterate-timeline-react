'use strict';

let React = require('react');
let employee = require('./employee').employee;
let moment = require('moment');

let EmployeeImages = React.createClass({
  render: function() {
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
});

let EmployeeStats = React.createClass({
  render: function() {
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
});

let EmployeeBox = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <EmployeeImages employees={this.props.employees} />
        <EmployeeStats allEmployees={this.props.allEmployees} employees={this.props.employees} month={this.props.month} />
      </div>
    );
  }
});

module.exports.EmployeeBox = EmployeeBox;

'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let EmployeeBox = require('./employeeBox').EmployeeBox;

ReactDOM.render(
  <div>
    <EmployeeBox url='/data/employees.json' />
  </div>,
  document.getElementById('content')
);

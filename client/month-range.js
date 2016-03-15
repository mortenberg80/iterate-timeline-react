'use strict';

let React = require('react');
let moment = require('moment');

function createMonthMap(fromDate, toDate) {
  let result = new Map();
  let currentDate = fromDate;
  let i = 1;
  while (currentDate < toDate) {
    result.set(i++, currentDate.clone());
    currentDate = currentDate.add(1, 'months');
  }

  return result;
}

let MonthRange = React.createClass({
  getInitialState: function() {
    return {monthMap: createMonthMap(this.props.fromDate, this.props.toDate)}; 
  },
  render: function() {
    let label = this.props.label !== '' ? <label>{this.props.label} - {this.props.val}</label> : '';
    let update = this.props.update.bind(this, this.state.monthMap);
    return (
      <div>
        <input 
          ref='inp'
          type='range'
          min={0}
          max={this.state.monthMap.size}
          step={1}
          defaultValue={this.state.monthMap.size}
          onChange={update} />
          {label}
      </div>
    )
  }
});

MonthRange.propTypes = {
  fromDate : React.PropTypes.object,
  toDate: React.PropTypes.object,
  label: React.PropTypes.string,
  update: React.PropTypes.func.isRequired
}

MonthRange.defaultProps = {
  fromDate: moment().subtract(10, 'years'),
  toDate: moment(),
  label: ''
}

module.exports.MonthRange = MonthRange;

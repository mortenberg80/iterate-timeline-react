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

class MonthRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthMap: createMonthMap(props.fromDate, props.toDate)
    }
  }
  render() {
    let month = this.state.monthMap.get(this.props.val).format('MMMM YYYY').toString();
    let label = this.props.label !== '' ? <label>{this.props.label} - {month}</label> : '';
    let update = this.props.update.bind(this, this.state.monthMap);
    return (
      <div>
        <input
          ref='inp'
          type='range'
          min={0}
          max={this.state.monthMap.size}
          step={1}
          defaultValue={this.props.val}
          onChange={update} />
          {label}
      </div>
    )
  }
}

MonthRange.propTypes = {
  fromDate : React.PropTypes.object,
  toDate: React.PropTypes.object,
  label: React.PropTypes.string,
  val: React.PropTypes.number,
  update: React.PropTypes.func.isRequired
}

MonthRange.defaultProps = {
  fromDate: moment().subtract(10, 'years'),
  toDate: moment(),
  val: 0,
  label: ''
}

module.exports.MonthRange = MonthRange;

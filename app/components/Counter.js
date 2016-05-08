import React, {PropTypes} from 'react'

export default class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onIncrement = this.props.onIncrement.bind(this);
    this.onDecrement = this.props.onDecrement.bind(this);
  }

  render () {
    const { count } = this.props;

    return (
      <div className="counter">
        <h1>Count: {count}</h1>
        <button type="button" onClick={this.onDecrement}>
          Decrement
        </button>
        <button type="button" onClick={this.onIncrement}>
          Increment
        </button>
      </div>
    )
  }
}

import React, {PropTypes} from 'react'

export default class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired
  };

  render () {
    const { count, onDecrement, onIncrement } = this.props;

    return (
      <div className="counter">
        <h1>Count: {count}</h1>
        <button type="button" onClick={onDecrement}>
          Decrement
        </button>
        <button type="button" onClick={onIncrement}>
          Increment
        </button>
      </div>
    )
  }
}

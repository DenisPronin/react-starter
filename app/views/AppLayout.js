import React, { PropTypes } from 'react'
import connectWrapper from '../redux/utils/connect'
import actions from '../redux/rootActions'

import '../styles/main.scss'
import Counter from '../components/Counter'

export class AppLayout extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onDecrement() {
    this.props.actions.decrement();
  }

  onIncrement() {
    this.props.actions.increment();
  }

  render() {
    const { state } = this.props;

    return (
      <div>
        <Counter
          count={state.counter.value}
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
        />
      </div>
    )
  }

}

export default connectWrapper(actions, AppLayout)

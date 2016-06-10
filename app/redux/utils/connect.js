import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

export default function connectWrapper (actions, view) {
  const mapStateToProps = (state) => ({
    state
  });

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(view)
}

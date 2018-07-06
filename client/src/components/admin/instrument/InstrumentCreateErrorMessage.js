import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, TransitionablePortal } from 'semantic-ui-react'

import { resetNewInstrument } from '../../../actions/instruments'

class InstrumentCreateErrorMessage extends Component {
  render () {
    const {newInstrument} = this.props

    return (
      <TransitionablePortal
        open={newInstrument.error !== null}
        onClose={this.props.resetNewInstrument}
      >
        <Message
          negative
          style={{left: '30%', position: 'fixed', top: '50%', zIndex: 1000}}
        >
          <Message.Header>Error</Message.Header>
          <p>
            {newInstrument.error ? newInstrument.error.message : ''}
          </p>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newInstrument: state.instruments.newInstrument
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetNewInstrument () {
    dispatch(resetNewInstrument())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentCreateErrorMessage)

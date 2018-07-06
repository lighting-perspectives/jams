import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, TransitionablePortal } from 'semantic-ui-react'

import { resetUpdatedInstrument } from '../../../actions/instruments'

class InstrumentUpdateErrorMessage extends Component {
  render () {
    const {updatedInstrument} = this.props

    return (
      <TransitionablePortal
        open={updatedInstrument.error !== null}
        onClose={this.props.resetUpdatedInstrument}
      >
        <Message
          negative
          style={{left: '30%', position: 'fixed', top: '50%', zIndex: 1000}}
        >
          <Message.Header>Error</Message.Header>
          <Message.Content>
            {updatedInstrument.error ? updatedInstrument.error.message : ''}
          </Message.Content>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    updatedInstrument: state.instruments.updatedInstrument
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetUpdatedInstrument () {
    dispatch(resetUpdatedInstrument())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentUpdateErrorMessage)

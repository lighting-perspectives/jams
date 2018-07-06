import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, TransitionablePortal } from 'semantic-ui-react'

import { resetDeletedInstrument } from '../../../actions/instruments'

class InstrumentDeleteSuccessMessage extends Component {
  render () {
    const { deletedInstrument } = this.props

    return (
      <TransitionablePortal
        open={deletedInstrument.instrument !== null}
        onClose={this.props.resetDeletedInstrument}
      >
        <Message
          warning
          style={{ left: '30%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <Message.Header>
            Instrument removed - {deletedInstrument.instrument ? deletedInstrument.instrument.label : ''}
          </Message.Header>
          <p>
            The <strong>instrument</strong> {deletedInstrument.instrument ? ' n°' + deletedInstrument.instrument.id : ''} has been <strong>removed</strong> successfully
          </p>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deletedInstrument: state.instruments.deletedInstrument
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetDeletedInstrument () {
    dispatch(resetDeletedInstrument())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentDeleteSuccessMessage)

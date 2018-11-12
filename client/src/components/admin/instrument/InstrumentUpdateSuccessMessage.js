import React, { Component } from "react"
import { connect } from "react-redux"
import { Message, TransitionablePortal } from "semantic-ui-react"

import { resetUpdatedInstrument } from "../../../actions/instruments"

class InstrumentUpdateSuccessMessage extends Component {
  render() {
    const { updatedInstrument } = this.props

    return (
      <TransitionablePortal
        open={
          updatedInstrument.instrument !== null && updatedInstrument.updated
        }
        onClose={this.props.resetUpdatedInstrument}
      >
        <Message
          positive
          style={{ left: "30%", position: "fixed", top: "50%", zIndex: 1000 }}
        >
          <Message.Header>Instrument updated</Message.Header>
          <Message.Content>
            The instrument{" "}
            {updatedInstrument.instrument
              ? " n°" + updatedInstrument.instrument.id
              : ""}{" "}
            has been <strong>updated successfully</strong>
          </Message.Content>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    updatedInstrument: state.instruments.updatedInstrument,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetUpdatedInstrument() {
    dispatch(resetUpdatedInstrument())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentUpdateSuccessMessage)

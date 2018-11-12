import React, { Component } from "react"
import { connect } from "react-redux"
import { Message, TransitionablePortal } from "semantic-ui-react"

import { resetNewInstrument } from "../../../actions/instruments"

class InstrumentCreateSuccessMessage extends Component {
  render() {
    const { newInstrument } = this.props

    return (
      <TransitionablePortal
        open={newInstrument.instrument !== null}
        onClose={this.props.resetNewInstrument}
      >
        <Message
          positive
          style={{ left: "30%", position: "fixed", top: "50%", zIndex: 1000 }}
        >
          <Message.Header>
            Instrument created -{" "}
            {newInstrument.instrument ? newInstrument.instrument.label : ""}
          </Message.Header>
          <p>
            The <strong>instrument</strong>{" "}
            {newInstrument.instrument
              ? " n°" + newInstrument.instrument.id
              : ""}{" "}
            has been <strong>created</strong> successfully
          </p>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newInstrument: state.instruments.newInstrument,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetNewInstrument() {
    dispatch(resetNewInstrument())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentCreateSuccessMessage)

import React, { Component } from "react"
import { connect } from "react-redux"
import { Message, TransitionablePortal } from "semantic-ui-react"

import { resetDeletedInstrument } from "../../../actions/instruments"

class InstrumentDeleteErrorMessage extends Component {
  render() {
    const { deletedMapping } = this.props

    return (
      <TransitionablePortal
        open={deletedMapping.error}
        onClose={this.props.resetDeletedInstrument}
      >
        <Message
          negative
          style={{ left: "30%", position: "fixed", top: "50%", zIndex: 1000 }}
        >
          <Message.Header>Error</Message.Header>
          <p>{deletedMapping.error ? deletedMapping.error.message : ""}</p>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    deletedMapping: state.instruments.deletedMapping,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetDeletedInstrument() {
    dispatch(resetDeletedInstrument())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentDeleteErrorMessage)

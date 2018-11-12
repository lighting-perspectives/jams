import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "semantic-ui-react"

import { createInstrumentOpenModal } from "../../../actions/instruments"

class InstrumentCreateButton extends Component {
  render() {
    return (
      <Button
        style={{ marginBottom: "1em" }}
        primary
        disabled={this.props.newInstrument.instrument}
        onClick={this.props.createInstrumentOpenModal}
      >
        New Instrument
      </Button>
    )
  }
}

const mapStateToProps = state => {
  return {
    newInstrument: state.instruments.newInstrument,
  }
}

const mapDispatchToProps = dispatch => ({
  createInstrumentOpenModal() {
    dispatch(createInstrumentOpenModal())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentCreateButton)

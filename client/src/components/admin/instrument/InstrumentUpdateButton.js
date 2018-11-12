import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "semantic-ui-react"

import { updateInstrumentOpenModal } from "../../../actions/instruments"

class InstrumentUpdateButton extends Component {
  render() {
    const { instrument } = this.props

    return (
      <Button
        icon="add"
        floated="right"
        loading={this.props.updatedInstrument.loading}
        onClick={() => this.props.updateInstrumentShowModal(instrument)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    updatedInstrument: state.instruments.updatedInstrument,
  }
}

const mapDispatchToProps = dispatch => ({
  updateInstrumentShowModal(instrument) {
    dispatch(updateInstrumentOpenModal(instrument))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentUpdateButton)

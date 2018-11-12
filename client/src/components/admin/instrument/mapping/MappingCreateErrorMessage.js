import React, { Component } from "react"
import { connect } from "react-redux"
import { Message, TransitionablePortal } from "semantic-ui-react"

import { resetNewMapping } from "../../../../actions/instruments"

class MappingCreateErrorMessage extends Component {
  render() {
    const { newMapping } = this.props

    return (
      <TransitionablePortal
        open={newMapping.error !== null}
        onClose={this.props.resetNewMapping}
      >
        <Message
          negative
          style={{ left: "30%", position: "fixed", top: "50%", zIndex: 1000 }}
        >
          <Message.Header>Error</Message.Header>
          <p>{newMapping.error ? newMapping.error.message : ""}</p>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = state => {
  return {
    newMapping: state.instruments.newMapping,
  }
}

const mapDispatchToProps = dispatch => ({
  resetNewMapping() {
    dispatch(resetNewMapping())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MappingCreateErrorMessage)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { resetUpdatedInstrument } from '../../../actions/instruments'

class InstrumentListErrorMessage extends Component {
  render () {
    return (
      <Message
        negative
        hidden={this.props.instrumentList.error === null}
        header='Failed to retrieve instrument list'
        content={`${this.props.instrumentList.error}`}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    instrumentList: state.instruments.instrumentList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetUpdatedInstrument () {
    dispatch(resetUpdatedInstrument())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentListErrorMessage)

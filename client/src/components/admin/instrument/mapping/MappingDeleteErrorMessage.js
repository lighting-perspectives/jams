import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, TransitionablePortal } from 'semantic-ui-react'

import { resetDeletedMapping } from '../../../../actions/instruments'

class MappingDeleteErrorMessage extends Component {
  render () {
    const {deletedMapping} = this.props

    return <TransitionablePortal
      open={deletedMapping.error !== null}
      onClose={this.props.resetDeletedMapping}
    >
      <Message
        negative
        style={{ left: '30%', position: 'fixed', top: '50%', zIndex: 1000 }}
      >
        <Message.Header>Error</Message.Header>
        <p>
          {deletedMapping.error ? deletedMapping.error.message : ''}
        </p>
      </Message>
    </TransitionablePortal>
  }
}

const mapStateToProps = (state) => {
  return {
    deletedMapping: state.instruments.deletedMapping
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetDeletedMapping () {
    dispatch(resetDeletedMapping())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MappingDeleteErrorMessage)

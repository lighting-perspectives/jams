import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, TransitionablePortal } from 'semantic-ui-react'

import { resetDeletedMapping } from '../../../../actions/instruments'

class MappingDeleteSuccessMessage extends Component {
  render () {
    const { deletedMapping } = this.props

    return (
      <TransitionablePortal
        open={deletedMapping.mapping !== null && deletedMapping.done}
        onClose={this.props.resetDeletedMapping}
      >
        <Message
          warning
          style={{ left: '30%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <Message.Header>
            Instrument mapping removed
          </Message.Header>
          <p>
            The <strong>instrument mapping</strong> {deletedMapping.mapping ? ' n°' + deletedMapping.mapping.id : ''} has been <strong>removed</strong> successfully
          </p>
        </Message>
      </TransitionablePortal>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(MappingDeleteSuccessMessage)

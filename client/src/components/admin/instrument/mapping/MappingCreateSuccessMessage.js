import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, TransitionablePortal } from 'semantic-ui-react'
import { resetNewMapping } from '../../../../actions/instruments'

class MappingCreateSuccessMessage extends Component {
  render () {
    const { newMapping } = this.props

    return (
      <TransitionablePortal
        open={newMapping.mapping !== null}
        onClose={this.props.resetNewMapping}
      >
        <Message
          positive
          style={{ left: '30%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <Message.Header>
            Instrument mapping created - {newMapping.mapping ? newMapping.mapping.instrumentId : ''}
          </Message.Header>
          <p>
            The <strong>mapping</strong> {newMapping.mapping ? ' n°' + newMapping.mapping.id : ''} has been <strong>created</strong> successfully
          </p>
        </Message>
      </TransitionablePortal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newMapping: state.instruments.newMapping
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetNewMapping () {
    dispatch(resetNewMapping())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MappingCreateSuccessMessage)

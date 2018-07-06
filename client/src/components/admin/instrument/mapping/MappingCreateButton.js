import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { createMappingOpenModal } from '../../../../actions/instruments'

class MappingCreateButton extends Component {
  render () {
    return (
      <Button
        style={{ marginBottom: '1em' }}
        content='New mapping'
        size='mini'
        disabled={this.props.newMapping.mapping && this.props.newMapping.mapping.instrumentId === this.props.instrumentId}
        onClick={() => this.props.createMappingOpenModal(this.props.instrumentId)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newMapping: state.instruments.newMapping
  }
}

const mapDispatchToProps = (dispatch) => ({
  createMappingOpenModal (instrumentId) {
    dispatch(createMappingOpenModal(instrumentId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MappingCreateButton)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { createSampleShowModal } from '../../../actions/sample'

class SampleCreateButton extends Component {
  render () {
    const style = { marginBottom: '1em' }

    return <Button
      style={style}
      primary
      disabled={this.props.newSample.open}
      onClick={this.props.createSampleShowModal}
    >
      New Sample
    </Button>
  }
}

const mapStateToProps = (state) => {
  return {
    newSample: state.samples.newSample
  }
}

const mapDispatchToProps = (dispatch) => ({
  createSampleShowModal () {
    dispatch(createSampleShowModal())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleCreateButton)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { updateSampleShowModal } from '../../../actions/sample'

class SampleUpdateButton extends Component {
  render () {
    const {sample} = this.props

    return <Button
      // size='small'
      icon='edit'
      // floated='right'
      content='Edit sample'
      disabled={this.props.updatedSample.open}
      onClick={() => this.props.updateSampleShowModal(sample)}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    updatedSample: state.samples.updatedSample
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSampleShowModal (sample) {
    dispatch(updateSampleShowModal(sample))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleUpdateButton)

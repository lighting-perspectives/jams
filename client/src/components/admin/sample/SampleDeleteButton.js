import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { deleteSample } from '../../../actions/sample'

class SampleDeleteButton extends Component {
  render () {
    const {sample, deletedSample} = this.props

    return <Button basic
      icon='delete'
      color='red'
      // size='small'
      // floated='right'
      loading={deletedSample.loading}
      content='Remove sample'
      onClick={() => this.props.deleteSample(sample)}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    deletedSample: state.samples.deletedSample
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteSample: data => {
    dispatch(deleteSample(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleDeleteButton)

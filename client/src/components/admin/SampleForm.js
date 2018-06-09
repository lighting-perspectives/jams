import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Icon, Message, TransitionablePortal } from 'semantic-ui-react'
import { createSample, resetNewSample } from '../../actions/sample'

const resetFileInput = form => {
  form.querySelector('input[name="audioFile"]').value = ''
}

class SampleForm extends Component {
  render () {
    const {newSample, onCreateSampleSubmit, resetModal, resetNewSample} = this.props

    const inlineStyle = {
      portal: {
        left: '40%',
        position: 'fixed',
        top: '50%',
        zIndex: 1000
      }
    }

    return (
      <div>
        <Form onSubmit={onCreateSampleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Audio file' type='file' name='audioFile' />
            <Form.Input fluid label='Label' name='label' />
            <Form.Input fluid label='Group' name='group' />
          </Form.Group>
          <Button icon type='submit' loading={newSample.loading}>
            <Icon name='file audio outline' />
          &nbsp;New Sample
          </Button>
        </Form>

        <TransitionablePortal
          open={newSample.sample !== null}
          onClose={resetNewSample}
        >
          <Message positive style={inlineStyle.portal}>
            <Message.Header>Sample created - {newSample.sample ? newSample.sample.label : ''}</Message.Header>
            <p>
              The <strong>sample</strong> {newSample.sample ? ' n°' + newSample.sample.id : ''} has been <strong>created</strong> successfully
            </p>
          </Message>
        </TransitionablePortal>

        <TransitionablePortal
          open={newSample.error !== null}
          onClose={resetModal}
        >
          <Message negative style={inlineStyle.portal}>
            <Message.Header>Error</Message.Header>
            <p>
              {newSample.error ? newSample.error.message : ''}
            </p>
          </Message>
        </TransitionablePortal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newSample: state.samples.newSample
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCreateSampleSubmit: event => {
    event.preventDefault()

    let form = event.target

    // eslint-disable-next-line no-undef
    dispatch(createSample(new FormData(form)))

    resetFileInput(form)
  },
  resetModal: () => {
    dispatch(resetNewSample())
  },
  resetNewSample: () => {
    dispatch(resetNewSample())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleForm)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Icon, Label, Message, TransitionablePortal } from 'semantic-ui-react'
import { updateSample, resetUpdatedSample } from '../../actions/sample'

class SampleUpdateForm extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  render () {
    const {
      updatedSample,
      handleSubmit,
      resetUpdatedSample
    } = this.props

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
        <Form onSubmit={handleSubmit}>
          <Label>
            Id: {updatedSample.sample ? updatedSample.sample.id : ''}
          </Label>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Audio file'
              type='file'
              name='audioFile'
            />
            <Form.Input
              fluid
              label='Label'
              name='label'
              value={updatedSample.sample ? updatedSample.sample.label : ''}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label='Group'
              name='group'
              value={updatedSample.sample ? updatedSample.sample.group : ''}
              onChange={this.handleChange}
            />
            <Form.Input
              name='id'
              type='hidden'
              value={updatedSample.sample ? updatedSample.sample.id : ''}
            />
          </Form.Group>
          <Button icon type='submit' loading={updatedSample.loading}>
            <Icon name='file audio outline' />
            &nbsp;Update Sample
          </Button>
        </Form>

        <TransitionablePortal
          open={updatedSample.sample !== null && updatedSample.updated}
          onClose={resetUpdatedSample}
        >
          <Message positive style={inlineStyle.portal}>
            <Message.Header>Sample updated - {updatedSample.sample ? updatedSample.sample.label : ''}</Message.Header>
            <p>
              The <strong>sample</strong> {updatedSample.sample ? ' n°' + updatedSample.sample.id : ''} has been <strong>updated</strong> successfully
            </p>
          </Message>
        </TransitionablePortal>

        <TransitionablePortal
          open={updatedSample.error !== null}
          onClose={resetUpdatedSample}
        >
          <Message negative style={inlineStyle.portal}>
            <Message.Header>Error</Message.Header>
            <p>
              {updatedSample.error ? updatedSample.error.message : ''}
            </p>
          </Message>
        </TransitionablePortal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    updatedSample: state.samples.updatedSample
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const id = formData.get('id')

    console.log('id', id)

    if (id) {
      dispatch(updateSample(id, formData))
    } else {
      dispatch(resetUpdatedSample())
    }
  },
  resetUpdatedSample: () => {
    dispatch(resetUpdatedSample())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleUpdateForm)

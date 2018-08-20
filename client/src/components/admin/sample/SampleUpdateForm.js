import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Message, Modal, TransitionablePortal } from 'semantic-ui-react'
import { updateSample, resetUpdatedSample } from '../../../actions/sample'

class SampleUpdateForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      audioFile: null,
      label: '',
      group: ''
    }

    this.audioFile = React.createRef()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const name = target.name
    const value = target.type === 'type' ? this.audioFile.current.files[0] : target.value
    console.log('target', target)
    console.log('type', target.type)

    this.setState({
      [name]: value
    })

    console.log('state', this.state)
  }

  render () {
    const {updatedSample} = this.props

    const inlineStyle = {
      portal: {
        left: '30%',
        position: 'fixed',
        top: '50%',
        zIndex: 1000
      }
    }

    return (
      <div>
        <Modal closeIcon open={updatedSample.open} onClose={this.props.closeModal}>
          <Modal.Header>Sample n°{updatedSample.sample ? updatedSample.sample.id : ''}</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Field>
                <label htmlFor='audioFile'>Audio</label>
                <small className='input-info'>Current file: {updatedSample.sample ? updatedSample.sample.filename : ''}</small>
                <Input type='file' name='audioFile' onChange={this.handleChange} />
                <small className='input-help'>Supported formats are : wav, mp3</small>
              </Form.Field>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label htmlFor='label'>Label</label>
                  <Input
                    fluid
                    name='label'
                    placeholder='Sample label'
                    defaultValue={updatedSample.sample ? updatedSample.sample.label : ''}
                    onChange={this.handleChange}
                  />
                  <small className='help'>Defaults to the audio file original name</small>
                </Form.Field>
                <Form.Field>
                  <label htmlFor='group'>Group</label>
                  <Input
                    fluid
                    name='group'
                    placeholder='Sample group'
                    defaultValue={updatedSample.sample ? updatedSample.sample.group : ''}
                    onChange={this.handleChange}
                  />
                  <small className='help'>Defaults to 'default'</small>
                </Form.Field>
                <Form.Input
                  name='id'
                  type='hidden'
                  value={updatedSample.sample ? updatedSample.sample.id : ''}
                />
              </Form.Group>
              <Button
                positive
                icon='file audio outline'
                content='Update Sample'
                type='submit'
                loading={updatedSample.loading}
              />
            </Form>
          </Modal.Content>
        </Modal>

        <TransitionablePortal
          open={updatedSample.sample !== null && updatedSample.updated}
          onClose={this.props.resetUpdatedSample}
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
          onClose={this.props.resetUpdatedSample}
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
  handleSubmit (event) {
    event.preventDefault()

    // eslint-disable-next-line no-undef
    const formData = new FormData(event.target)
    const id = formData.get('id')

    dispatch(updateSample(id, formData))
  },
  closeModal () {
    dispatch(resetUpdatedSample())
  },
  resetUpdatedSample: () => {
    dispatch(resetUpdatedSample())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleUpdateForm)

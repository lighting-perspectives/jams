import React, { Component } from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'
import config from '../../config/config'

export default class FormSampleNew extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateSampleList = props.updateSampleList
    this.state = {
      isCreatingSample: false
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({isCreatingSample: true})

    let form = event.target

    fetch(config.SERVER.BASE_URL + config.SERVER.SAMPLE_RESOURCE, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(res => res.json())
      .then(sample => {
        console.log('new Sample', sample)
        this.updateSampleList()
        this.resetFileInput(form)
        this.setState({isCreatingSample: false})
      })
      .catch(err => {
        console.error('Fetch Error :', err)
      })
  }

  resetFileInput (form) {
    form.querySelector('input[name="audioFile"]').value = ''
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Audio file' type='file' name='audioFile' />
          <Form.Input fluid label='Label' name='label' />
          <Form.Input fluid label='Group' name='group' />
        </Form.Group>
        <Button icon type='submit' loading={this.state.isCreatingSample}>
          <Icon name='file audio outline' />
          &nbsp;New Sample
        </Button>
      </Form>
    )
  }
}

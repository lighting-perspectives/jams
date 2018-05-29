import React, { Component } from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

export default class FormSampleNew extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.updateSampleList = props.updateSampleList
    this.state = {
      sampleCreating: false,
      file: null,
      label: null,
      group: null
    }
  }

  handleSubmit (e) {
    this.setState({sampleCreating: true})
    e.preventDefault()

    let form = e.target
    const formData = new FormData(form)

    fetch('http://localhost:3000/api/samples', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(sample => {
        console.log(sample)
        this.updateSampleList()
        this.resetFileInput(form)
        this.setState({sampleCreating: false})
      })
      .catch(err => {
        console.error('Fetch Error :', err)
      })
  }

  handleFileInputChange (e) {
    const files = e.target.files
    console.log('files', e.target.files)

    this.setState({file: files[0]})
  }

  resetFileInput (form) {
    form.querySelector('input[name="audioFile"]').value = ''
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Audio file' type='file' name='audioFile' onChange={this.handleFileInputChange} />
          <Form.Input fluid label='Label' name='label' />
          <Form.Input fluid label='Group' name='group' />
        </Form.Group>
        <Button icon type='submit' loading={this.state.sampleCreating}>
          <Icon name='file audio outline' />
          &nbsp;New Sample
        </Button>
      </Form>
    )
  }
}

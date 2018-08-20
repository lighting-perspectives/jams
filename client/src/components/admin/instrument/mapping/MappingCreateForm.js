import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'

import { createMapping, resetNewMapping } from '../../../../actions/instruments'
import { noteMap } from '../../../../utils/mapping'
import './MappingCreateForm.css'

class MappingCreateForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: {
        lowerRank: null,
        upperRank: null,
        referenceRank: null,
        sampleId: null,
        instrumentId: this.props.instrumentId
      },
      error: {
        lowerRank: false,
        upperRank: false,
        referenceRank: false,
        sampleId: false
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleInputChange (event, SuiObject) {
    const target = event.target
    const inputValue = SuiObject ? SuiObject.value : target.value
    const inputName = SuiObject ? SuiObject.name : target.name

    const {input} = this.state
    input[inputName] = inputValue
    this.setState({input})

    this.checkValidity(inputName, inputValue)
  }

  checkValidity (name, value) {
    const {error} = this.state
    error[name] = !value
    this.setState({error})
  }

  onSubmit () {
    const {input} = this.state

    for (let name in input) {
      this.checkValidity(name, input[name])
    }

    if (this.state.error.lowerRank ||
      this.state.error.upperRank ||
      this.state.error.referenceRank ||
      this.state.error.sampleId) {
      return
    }

    this.props.handleSubmit(this.state.input)
  }

  render () {
    const {instrId, newMapping, sampleChoices} = this.props
    const sampleOptions = sampleChoices.map(sample => {
      return {
        key: sample.id,
        text: `${sample.label} - ${sample.label}`,
        value: sample.id
      }
    })

    const noteOptions = []
    for (let [rank, value] of noteMap.entries()) {
      noteOptions.push({
        key: rank,
        text: value,
        value: rank
      })
    }

    return (
      <Modal
        size='small'
        open={newMapping.open && newMapping.instrumentId === instrId}
        onClose={this.props.closeModal}
        closeIcon
      >
        <Modal.Header>Mapping for instrument n°{newMapping.instrumentId}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                required
                label='Lower note'
                options={noteOptions}
                name='lowerRank'
                placeholder='Select a note in the list'
                onChange={this.handleInputChange}
                error={this.state.error.lowerRank}
              />
              <Form.Select
                fluid
                required
                label='Upper note'
                options={noteOptions}
                name='upperRank'
                placeholder='Select a note in the list'
                onChange={this.handleInputChange}
                error={this.state.error.upperRank}
              />
              <Form.Select
                fluid
                required
                label='Reference note'
                options={noteOptions}
                name='referenceRank'
                placeholder='Select a note in the list'
                onChange={this.handleInputChange}
                error={this.state.error.referenceRank}
              />
            </Form.Group>
            <Form.Select
              required
              label='Sample'
              options={sampleOptions}
              name='sampleId'
              placeholder={'Select a sample in the list'}
              onChange={this.handleInputChange}
              error={this.state.error.sampleId}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon='add'
            loading={newMapping.loading}
            labelPosition='right'
            content='Add mapping'
            onClick={this.onSubmit}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  newMapping: state.instruments.newMapping
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (inputs) => {
    const {lowerRank, upperRank, referenceRank, sampleId, instrumentId} = inputs

    // eslint-disable-next-line no-undef
    const formData = new FormData()
    formData.append('lowerRank', lowerRank)
    formData.append('upperRank', upperRank)
    formData.append('referenceRank', referenceRank)
    formData.append('sampleId', sampleId)

    dispatch(createMapping(instrumentId, formData))
  },
  closeModal () {
    dispatch(resetNewMapping())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MappingCreateForm)

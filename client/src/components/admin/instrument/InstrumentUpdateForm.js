import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Modal } from 'semantic-ui-react'

import './InstrumentUpdateForm.css'
import { resetUpdatedInstrument, updateInstrument } from '../../../actions/instruments'

class InstrumentCreateForm extends Component {
  render () {
    const {updatedInstrument} = this.props

    return (
      <Modal
        closeIcon
        open={updatedInstrument.open}
        onClose={this.props.resetUpdatedInstrument}
      >
        <Modal.Header as='h1'>
          Edit Instrument n°{updatedInstrument.instrument ? updatedInstrument.instrument.id : ''}
        </Modal.Header>
        <Modal.Content>
          <p>
            Fields with <span style={{color: '#db2828'}}>*</span> are mandatory
          </p>

          <Form onSubmit={this.props.handleInstrumentUpdateSubmit}>
            <Form.Field required>
              <label htmlFor='label'>Label</label>
              <Input
                type='text'
                name='label'
                placeholder='Instrument label'
                defaultValue={updatedInstrument.instrument ? updatedInstrument.instrument.label : ''}
              />
            </Form.Field>
            <Form.Input
              name='id'
              type='hidden'
              value={updatedInstrument.instrument ? updatedInstrument.instrument.id : ''}
            />
            <Button
              positive
              icon='add'
              content='Update Instrument'
              type='submit'
              labelPosition='right'
              loading={updatedInstrument.loading}
            />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    updatedInstrument: state.instruments.updatedInstrument
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleInstrumentUpdateSubmit (event) {
    event.preventDefault()

    let form = event.target
    // eslint-disable-next-line no-undef
    let formData = new FormData(form)
    const id = formData.get('id')

    // eslint-disable-next-line no-undef
    dispatch(updateInstrument(id, formData))
  },
  resetUpdatedInstrument () {
    dispatch(resetUpdatedInstrument())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentCreateForm)

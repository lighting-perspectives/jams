import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Modal } from 'semantic-ui-react'

import './InstrumentCreateForm.css'
import { createInstrument, resetNewInstrument } from '../../../actions/instruments'

class InstrumentCreateForm extends Component {
  render () {
    const {newInstrument} = this.props

    return (
      <Modal
        closeIcon
        open={newInstrument.open}
        onClose={this.props.resetNewInstrument}
      >
        <Modal.Header as='h1'>New Instrument</Modal.Header>
        <Modal.Content>
          <p>
            Fields with <span style={{color: '#db2828'}}>*</span> are mandatory
          </p>

          <Form onSubmit={this.props.handleInstrumentCreateSubmit}>
            <Form.Field required>
              <label htmlFor='label'>Label</label>
              <Input type='text' name='label' placeholder='Instrument label' />
            </Form.Field>
            <Button
              positive
              icon='add'
              content='Create Instrument'
              labelPosition='right'
              type='submit'
              loading={newInstrument.loading}
            />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newInstrument: state.instruments.newInstrument
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleInstrumentCreateSubmit (event) {
    event.preventDefault()

    let form = event.target
    // eslint-disable-next-line no-undef
    let formData = new FormData(form)

    // eslint-disable-next-line no-undef
    dispatch(createInstrument(formData))
  },
  resetNewInstrument () {
    dispatch(resetNewInstrument())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentCreateForm)

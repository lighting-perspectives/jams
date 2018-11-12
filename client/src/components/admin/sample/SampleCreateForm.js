import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Button,
  Form,
  Icon,
  Input,
  Message,
  Modal,
  TransitionablePortal,
} from "semantic-ui-react"

import "./SampleCreateForm.css"
import { createSample, resetNewSample } from "../../../actions/sample"

const resetFileInput = form => {
  form.querySelector('input[name="audioFile"]').value = ""
}

class SampleCreateForm extends Component {
  render() {
    const { newSample } = this.props

    const inlineStyle = {
      portal: {
        left: "40%",
        position: "fixed",
        top: "50%",
        zIndex: 1000,
      },
    }

    return (
      <div>
        <Modal closeIcon open={newSample.open} onClose={this.props.closeModal}>
          <Modal.Header as="h1">New Sample</Modal.Header>
          <Modal.Content>
            <p>
              Fields with <span style={{ color: "#db2828" }}>*</span> are
              mandatory
            </p>
            <Form onSubmit={this.props.onCreateSampleSubmit}>
              <Form.Group widths="equal">
                <Form.Field required fluid>
                  <label htmlFor="audioFile">Audio</label>
                  <Input type="file" name="audioFile" />
                  <small className="help">
                    Supported formats are : wav, mp3
                  </small>
                </Form.Field>
                <Form.Field fluid>
                  <label htmlFor="label">Label</label>
                  <Input type="text" name="label" placeholder="Sample label" />
                  <small className="help">
                    Defaults to the audio file original name
                  </small>
                </Form.Field>
                <Form.Field fluid>
                  <label htmlFor="group">Group</label>
                  <Input type="text" name="group" placeholder="Sample group" />
                  <small className="help">Defaults to 'default'</small>
                </Form.Field>
              </Form.Group>
              <Button positive icon type="submit" loading={newSample.loading}>
                <Icon name="file audio outline" />
                &nbsp;Create Sample
              </Button>
            </Form>
          </Modal.Content>
        </Modal>

        <TransitionablePortal
          open={newSample.sample !== null}
          onClose={this.props.closeModal}
        >
          <Message positive style={inlineStyle.portal}>
            <Message.Header>
              Sample created - {newSample.sample ? newSample.sample.label : ""}
            </Message.Header>
            <p>
              The <strong>sample</strong>{" "}
              {newSample.sample ? " n°" + newSample.sample.id : ""} has been{" "}
              <strong>created</strong> successfully
            </p>
          </Message>
        </TransitionablePortal>

        <TransitionablePortal
          open={newSample.error !== null}
          onClose={this.props.closeModal}
        >
          <Message negative style={inlineStyle.portal}>
            <Message.Header>Error</Message.Header>
            <p>{newSample.error ? newSample.error.message : ""}</p>
          </Message>
        </TransitionablePortal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newSample: state.samples.newSample,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCreateSampleSubmit(event) {
    event.preventDefault()

    let form = event.target
    // eslint-disable-next-line no-undef
    let formData = new FormData(form)
    console.log("audioFile", formData.get("audioFile"))
    console.log("label", formData.get("label"))
    console.log("group", formData.get("group"))

    // eslint-disable-next-line no-undef
    dispatch(createSample(formData))

    resetFileInput(form)
  },
  closeModal() {
    dispatch(resetNewSample())
  },
  resetNewSample() {
    dispatch(resetNewSample())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleCreateForm)

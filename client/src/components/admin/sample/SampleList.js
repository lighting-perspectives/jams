import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Icon,
  Loader,
  Message,
  Table,
  TransitionablePortal,
} from "semantic-ui-react"

import "./SampleList.css"
import {
  deleteSample,
  fetchSamples,
  resetDeletedSample,
} from "../../../actions/sample"
import SampleListItem from "./SampleListItem"

class SampleList extends Component {
  componentDidMount() {
    this.props.fetchSamples()
  }

  render() {
    const { sampleList, deletedSample } = this.props

    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
              <Table.HeaderCell>Sample</Table.HeaderCell>
              <Table.HeaderCell>
                <Icon name="clock" />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sampleList.samples.map(s => (
              <SampleListItem key={s.id} sample={s} />
            ))}
          </Table.Body>
        </Table>
        <Loader active={sampleList.loading} />
        <TransitionablePortal
          open={deletedSample.sample !== null}
          onClose={this.props.resetDeletedSample}
        >
          <Message
            warning
            style={{ left: "30%", position: "fixed", top: "50%", zIndex: 1000 }}
          >
            <Message.Header>
              Sample removed -{" "}
              {deletedSample.sample ? deletedSample.sample.label : ""}
            </Message.Header>
            <p>
              The <strong>sample</strong>{" "}
              {deletedSample.sample ? " n°" + deletedSample.sample.id : ""} has
              been <strong>removed</strong> successfully
            </p>
          </Message>
        </TransitionablePortal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sampleList: state.samples.sampleList,
    deletedSample: state.samples.deletedSample,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSamples: () => {
    dispatch(fetchSamples())
  },
  deleteSample: data => {
    dispatch(deleteSample(data))
  },
  resetDeletedSample: () => {
    dispatch(resetDeletedSample())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleList)

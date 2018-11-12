import React, { Component } from "react"
import { connect } from "react-redux"
import { List, Loader } from "semantic-ui-react"

import { fetchInstruments } from "../../../actions/instruments"
import InstrumentListItem from "./InstrumentListItem"
import { fetchSamples } from "../../../actions/sample"

class InstrumentList extends Component {
  componentDidMount() {
    this.props.fetchInstruments()
    this.props.fetchSamples()
  }

  render() {
    const { instrumentList, sampleList } = this.props

    return (
      <List celled>
        <Loader active={instrumentList.loading} />
        {instrumentList.instruments.map(i => (
          <InstrumentListItem
            key={i.id}
            instrument={i}
            sampleChoices={sampleList.samples}
          />
        ))}
      </List>
    )
  }
}

const mapStateToProps = state => {
  return {
    instrumentList: state.instruments.instrumentList,
    sampleList: state.samples.sampleList,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInstruments() {
    dispatch(fetchInstruments())
  },
  fetchSamples() {
    dispatch(fetchSamples())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentList)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

import { deleteInstrument, createMappingOpenModal } from '../../../actions/instruments'
import MappingCreateForm from './mapping/MappingCreateForm'
import InstrumentDeleteButton from './InstrumentDeleteButton'
import MappingList from './mapping/MappingList'
import MappingCreateButton from './mapping/MappingCreateButton'
import MappingCreateSuccessMessage from './mapping/MappingCreateSuccessMessage'
import MappingCreateErrorMessage from './mapping/MappingCreateErrorMessage'
import InstrumentUpdateButton from './InstrumentUpdateButton'

class InstrumentListItem extends Component {
  render () {
    const {instrument, sampleChoices} = this.props

    return (
      <List.Item>
        <InstrumentDeleteButton instrument={instrument} />
        <InstrumentUpdateButton instrument={instrument} />
        <List.Content>
          <List.Header as='h4'>
            Instrument {instrument.label}
          </List.Header>
          <List.Description>
            Created: {instrument.createdAt} — Updated: {instrument.updatedAt} <br />
            Label: {instrument.label || '~'} <br />
            Uuid: {instrument.id} <br />

            <List.Header as='h5'>
              <span style={{marginRight: '1em'}}>
                Mappings
              </span>
              <MappingCreateButton instrumentId={instrument.id} />
            </List.Header>

            <MappingCreateForm instrumentId={instrument.id} sampleChoices={sampleChoices} />
            <MappingCreateSuccessMessage />
            <MappingCreateErrorMessage />

            <List.List>
              <MappingList mappings={instrument.mappings} />
            </List.List>

          </List.Description>
        </List.Content>
      </List.Item>
    )
  }
}

const mapStateToProps = (state) => ({
  deletedInstrument: state.instruments.deletedInstrument
})

const mapDispatchToProps = (dispatch) => ({
  deleteInstrument (instrument) {
    dispatch(deleteInstrument(instrument))
  },
  openModal (instrumentId) {
    dispatch(createMappingOpenModal(instrumentId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentListItem)

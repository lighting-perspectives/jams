import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Confirm } from 'semantic-ui-react'

import { deleteInstrument, deleteInstrumentOpenConfirm, resetDeletedInstrument } from '../../../actions/instruments'

class InstrumentDeleteButton extends Component {
  render () {
    const {instrument, deletedInstrument} = this.props

    return (
      <div>
        <Button basic
          icon='delete'
          color='red'
          floated='right'
          loading={deletedInstrument.loading}
          onClick={() => this.props.deleteInstrumentOpenConfirm(instrument)}
        />
        <Confirm open={deletedInstrument.open}
          header='Delete instrument'
          content={`Are you sure you want to delete the instrument ${deletedInstrument.instrument ? 'n°' + deletedInstrument.instrument.id : ''} ?`}
          onCancel={() => this.props.deleteInstrumentCloseConfirm()}
          onConfirm={() => this.props.deleteInstrument(deletedInstrument.instrument)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deletedInstrument: state.instruments.deletedInstrument
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteInstrumentOpenConfirm (instrument) {
    dispatch(deleteInstrumentOpenConfirm(instrument))
  },
  deleteInstrumentCloseConfirm () {
    dispatch(resetDeletedInstrument())
  },
  deleteInstrument (instrument) {
    dispatch(deleteInstrument(instrument))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentDeleteButton)

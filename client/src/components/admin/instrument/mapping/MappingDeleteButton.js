import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Confirm } from 'semantic-ui-react'

import { deleteMapping, deleteMappingOpenConfirm, resetDeletedMapping } from '../../../../actions/instruments'

class MappingDeleteButton extends Component {
  render () {
    const {mapping, deletedMapping} = this.props

    return (
      <div>
        <Button basic
          icon='delete'
          color='red'
          size='mini'
          floated='right'
          loading={deletedMapping.loading}
          onClick={() => this.props.deleteMappingOpenConfirm(mapping)}
        />
        <Confirm
          open={deletedMapping.open}
          header='Delete mapping'
          content={`Are you sure you want to delete the mapping n°${deletedMapping.mapping ? 'n°' + deletedMapping.mapping.id : ''} ?`}
          onCancel={() => this.props.deleteMappingCloseConfirm()}
          onConfirm={() => this.props.deleteMapping(deletedMapping.mapping)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deletedMapping: state.instruments.deletedMapping
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteMappingOpenConfirm (mapping) {
    dispatch(deleteMappingOpenConfirm(mapping))
  },
  deleteMappingCloseConfirm () {
    dispatch(resetDeletedMapping())
  },
  deleteMapping (mapping) {
    dispatch(deleteMapping(mapping))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MappingDeleteButton)

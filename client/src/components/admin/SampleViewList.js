import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, List, Loader, Message, Popup, TransitionablePortal } from 'semantic-ui-react'
import Tone from 'tone'
import classnames from 'classnames'
import './SampleViewList.css'
import { BASE_URL } from '../../api'
import { deleteSample, fetchSamples, resetDeletedSample, selectSampleToUpdate } from '../../actions/sample'

const onIconClick = sample => {
  let audio = new Tone.Player(`${BASE_URL}/static/audio/${sample.filename}`).toMaster()
  audio.autostart = true // play as soon as the buffer is loaded
}

class SampleViewList extends Component {
  componentDidMount () {
    this.props.fetchSamples()
  }

  render () {
    const {
      sampleList,
      deletedSample,
      updatedSample,
      deleteSample,
      resetDeletedSample,
      selectSampleToUpdate
    } = this.props
    return (
      <List celled>
        <Loader active={sampleList.loading} />
        <TransitionablePortal
          open={deletedSample.sample !== null}
          onClose={resetDeletedSample}
        >
          <Message warning style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
            <Message.Header>Sample removed - {deletedSample.sample ? deletedSample.sample.label : ''}</Message.Header>
            <p>
              The <strong>sample</strong> {deletedSample.sample ? ' n°' + deletedSample.sample.id : ''} has been <strong>removed</strong> successfully
            </p>
          </Message>
        </TransitionablePortal>
        {sampleList.samples.map(s => {
          let listContentClass = classnames({
            'sample-selected': updatedSample.sample && updatedSample.sample.id === s.id
          })
          return (<List.Item key={s.id} className={listContentClass}>
            <Popup
              trigger={
                <List.Icon
                  size='big'
                  color='violet'
                  name='file audio outline'
                  onClick={() => onIconClick(s)}
                  link
                />
              }
              content='Click to play'
            />
            <Button
              icon='delete'
              floated='right'
              loading={deletedSample.loading}
              onClick={() => deleteSample(s)}
            />
            <List.Content onClick={() => selectSampleToUpdate(s)}>
              <List.Header><h4>{s.filename}</h4> {s.path}</List.Header>
              <List.Description>
                Created: {s.createdAt} — Updated: {s.updatedAt} <br />
                Label: {s.label || '~'} <br />
                Group: {s.group || '~'} <br />
                Uuid: {s.id}
              </List.Description>
            </List.Content>
          </List.Item>)
        })}
      </List>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sampleList: state.samples.sampleList,
    deletedSample: state.samples.deletedSample,
    updatedSample: state.samples.updatedSample
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSamples: () => {
    dispatch(fetchSamples())
  },
  deleteSample: data => {
    dispatch(deleteSample(data))
  },
  resetDeletedSample: () => {
    dispatch(resetDeletedSample())
  },
  selectSampleToUpdate: (data) => {
    dispatch(selectSampleToUpdate(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleViewList)

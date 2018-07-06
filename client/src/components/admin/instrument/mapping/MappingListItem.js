import React from 'react'
import { List } from 'semantic-ui-react'
import Tone from 'tone'

import { rankToNote } from '../../../../utils/mapping'
import { BASE_URL } from '../../../../api'
import MappingDeleteButton from './MappingDeleteButton'

function handlePlayClick (sampleID) {
  let audio = new Tone.Player(`${BASE_URL}/static/audio/${sampleID}`).toMaster()
  audio.autostart = true // play as soon as the buffer is loaded
}

const MappingListItem = ({mapping}) => {
  return (
    <List.Item>
      <List.Header as='h5'>{mapping.id}</List.Header>
      <MappingDeleteButton mapping={mapping} />
      <List.Description>
        lowerNote: {rankToNote(mapping.lowerRank)} ({mapping.lowerRank}) <br />
        upperNote: {rankToNote(mapping.upperRank)} ({mapping.upperRank}) <br />
        referenceNote: {rankToNote(mapping.referenceRank)} ({mapping.referenceRank}) <br />
        sample: <a href={void (0)} onClick={() => handlePlayClick(mapping.sampleId)}>Play</a>
      </List.Description>
    </List.Item>
  )
}

export default MappingListItem

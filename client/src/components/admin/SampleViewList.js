import React from 'react'
import { List, Popup } from 'semantic-ui-react'
import Tone from 'tone'
import config from '../../config/config'

const handleIconClick = sample => {
  let audio = new Tone.Player(config.SERVER.BASE_URL + config.SERVER.AUDIO_DIR + '/' + sample.filename).toMaster()
  audio.autostart = true // play as soon as the buffer is loaded
}

const SampleViewList = ({samples}) => (
  <List celled>
    {samples.map(s => <List.Item key={s.id}>
      <Popup
        trigger={
          <List.Icon
            size='big'
            color='violet'
            name='file audio outline'
            onClick={() => handleIconClick(s)}
            link />
        }
        content='Click to play'
      />
      <List.Content>
        <List.Header><h4>{s.filename}</h4> ({s.path})</List.Header>
        <List.Description>
              Created: {s.createdAt} — Updated: {s.updatedAt} <br />
              Label: {s.label || '~'} Group: {s.group || '~'}
        </List.Description>
      </List.Content>
    </List.Item>)}
  </List>
)

export default SampleViewList

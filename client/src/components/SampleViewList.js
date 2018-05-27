import React from 'react'

import { List } from 'semantic-ui-react'

const handleItemClick = sample => {
  console.log('handleItemClick', sample.filename)
  let audio = new Audio('http://localhost:3000/static/audio/' + sample.filename)
  console.log('audio', audio)
  audio.play().then(() => console.log('audio played'))
}

const SampleViewList = props => (
  <List celled>
    {props.samples.map(s => <List.Item key={s.id}>
      <List.Icon size='big' color='violet' name='file audio outline' onClick={() => handleItemClick(s)} link/>
      <List.Content>
        <List.Header><h4>{s.filename}</h4> ({s.path})</List.Header>
        <List.Description>
          Created: {s.createdAt} — Updated: {s.updatedAt} <br/>
          Label: {s.label || '~'} Group: {s.group || '~'}
        </List.Description>
      </List.Content>
    </List.Item>)}
  </List>
)

export default SampleViewList

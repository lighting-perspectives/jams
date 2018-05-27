import React from 'react'

import { List } from 'semantic-ui-react'

const handleItemClick = sample => {
  let audio = new Audio('http://localhost:3000/static/audio/' + sample.filename)

  audio
    .play()
    .then(() => console.log('audio played'))
}

const SampleViewList = props => {
  const { samples } = props

  return (
    <List celled>
      {samples.map(s => <List.Item key={s.id}>
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
}

export default SampleViewList

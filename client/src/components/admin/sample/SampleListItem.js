import React, { Component } from 'react'
import { Icon, Popup, Table, Button, Label } from 'semantic-ui-react'
import Tone from 'tone'

import { BASE_URL } from '../../../api'
import SampleDeleteButton from './SampleDeleteButton'
import SampleUpdateButton from './SampleUpdateButton'

class SampleListItem extends Component {
  static handleIconClick (sample) {
    let audio = new Tone.Player(`${BASE_URL}/static/audio/${sample.id}`).toMaster()
    audio.autostart = true // play as soon as the buffer is loaded
  }

  render () {
    const {sample} = this.props

    return (
      <Table.Row >
        <Table.Cell textAlign='center'>
          <Popup
            trigger={
              <Icon
                size='big'
                color='violet'
                name='file audio outline'
                onClick={() => SampleListItem.handleIconClick(sample)}
                link
              />
            }
            content='Click to play'
          />
          <br />
          <Label>{sample.filename}</Label>
        </Table.Cell>

        <Table.Cell>
          <Label><Icon name='certificate' />{sample.id}</Label>
          <br />
          <Label><Icon name='tag' />{sample.label || '~'}</Label>
          <Label><Icon name='folder' />{sample.group || '~'}</Label>
        </Table.Cell>

        <Table.Cell>
          <small><strong>Created</strong>: {sample.createdAt}</small> <br />
          — <br />
          <small><strong>Updated</strong>: {sample.updatedAt}</small> <br />
        </Table.Cell>

        <Table.Cell textAlign='center'>
          <Button.Group vertical labeled icon size='small'>
            <SampleUpdateButton sample={sample} />
            <SampleDeleteButton sample={sample} />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default SampleListItem

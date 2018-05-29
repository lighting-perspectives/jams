import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import config from '../../config/config'
import SampleViewLayout from './SampleViewLayout'

class Admin extends Component {
  constructor (props) {
    super(props)

    this.updateSampleList = this.updateSampleList.bind(this)

    this.state = {
      samples: []
    }
  }

  componentDidMount () {
    this.updateSampleList()
  }

  updateSampleList () {
    fetch(config.SERVER.BASE_URL + config.SERVER.SAMPLE_RESOURCE)
      .then(res => res.json())
      .then(samples => {
        this.setState({samples})
        console.log('sample list updated')
      })
      .catch(err => {
        console.error('Fetch Error :-S', err)
      })
  }

  render () {
    const {samples} = this.state

    return (
      <Container style={{marginTop: '7em'}}>
        <h1>Admin</h1>

        <SampleViewLayout
          samples={samples}
          updateSampleList={this.updateSampleList} />
      </Container>
    )
  }
}

export default Admin

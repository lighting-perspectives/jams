import React, {Component} from 'react'
import SampleViewLayout from './SampleViewLayout'
import { Container } from 'semantic-ui-react'

class Admin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      samples: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:3000/api/samples')
      .then(res => res.json())
      .then(samples => this.setState({samples}))
  }

  render () {
    const {samples} = this.state

    return (
      <Container style={{ marginTop: '7em' }} >
        <h1>Admin</h1>

        <SampleViewLayout samples={samples} />
      </Container>
    )
  }
}

export default Admin

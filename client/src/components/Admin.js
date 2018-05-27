import React, {Component} from 'react'
import SampleViewLayout from './SampleViewLayout'

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
      <div>
        <h1>Admin</h1>

        <SampleViewLayout samples={samples} />
      </div>
    )
  }
}

export default Admin

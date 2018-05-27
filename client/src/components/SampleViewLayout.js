import React from 'react'
import { Container, Header } from 'semantic-ui-react'

import SampleViewList from './SampleViewList'

const SampleViewLayout = props => {
  const {samples} = props

  return (
    <Container style={{marginTop: '3em'}}>
      <Header as='h2'>Sample List</Header>

      <SampleViewList samples={samples}/>
    </Container>
  )
}

export default SampleViewLayout

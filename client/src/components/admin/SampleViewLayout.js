import React from 'react'
import { Container, Header } from 'semantic-ui-react'

import SampleViewList from './SampleViewList'
import FormSampleNew from './FormSampleNew'

const SampleViewLayout = props => {
  const {samples, updateSampleList} = props

  return (
    <Container style={{marginTop: '3em'}}>
      <Header as='h2'>Sample List</Header>

      <SampleViewList
        samples={samples} />

      <FormSampleNew
        updateSampleList={updateSampleList} />
    </Container>
  )
}

export default SampleViewLayout

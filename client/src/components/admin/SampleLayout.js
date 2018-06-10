import React from 'react'
import { Header } from 'semantic-ui-react'

import SampleViewList from './SampleViewList'
import SampleForm from './SampleForm'
import SampleUpdateForm from './SampleUpdateForm'

const SampleLayout = () => (
  <div>
    <Header as='h3'>Sample List</Header>
    <SampleForm />
    <SampleUpdateForm />
    <SampleViewList />
  </div>
)

export default SampleLayout

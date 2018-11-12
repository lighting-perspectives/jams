import React from "react"
import MappingListItem from "./MappingListItem"

const MappingList = ({ mappings, sampleChoices }) => {
  return mappings.map(mapping => (
    <MappingListItem
      key={mapping.id}
      mapping={mapping}
      sampleChoices={sampleChoices}
    />
  ))
}

export default MappingList

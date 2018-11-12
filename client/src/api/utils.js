export function checkResponse(res) {
  if (res.ok) {
    return res
  }

  res.json().then(result => {
    throw Error(result.msg)
  })
}

export function serializeData(formData) {
  // eslint-disable-next-line no-undef
  if (!(formData instanceof FormData)) {
    return formData
  }

  let data = ""
  for (let entry of formData.entries()) {
    data += entry[0] + "=" + entry[1] + "&"
  }

  // remove last '&' character
  return data.substring(0, data.length - 1)
}

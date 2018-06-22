export function checkResponse (res) {
  console.log('response ok ?', res)
  if (res.ok) {
    return res
  }

  res.json().then(result => {
    throw Error(result.msg)
  })
}

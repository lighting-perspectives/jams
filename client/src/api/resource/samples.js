/* eslint-disable no-undef */
import { BASE_URL } from '../index'

export function getSamples () {
  return fetch(`${BASE_URL}/samples`)
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function postSamples (formData) {
  return fetch(`${BASE_URL}/samples`, {
    method: 'POST',
    body: formData
  })
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function putSamples (id, formData) {
  return fetch(`${BASE_URL}/samples/${id}`, {
    method: 'PUT',
    body: formData
  })
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function deleteSamples (data) {
  return fetch(`${BASE_URL}/samples/${data.id}`, {
    method: 'DELETE'
  })
    .catch(error => { throw (error) })
}

function checkResponse (res) {
  console.log('response ok ?', res)
  if (res.ok) {
    return res
  }

  res.json().then(result => {
    throw Error(result.msg)
  })
}

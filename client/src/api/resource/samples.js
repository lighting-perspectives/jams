/* eslint-disable no-undef */
import { BASE_URL } from '../index'
import { checkResponse } from '../utils'

export function getSamples () {
  return fetch(`${BASE_URL}/api/samples`)
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function postSamples (formData) {
  return fetch(`${BASE_URL}/api/samples`, {
    method: 'POST',
    body: formData
  })
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function putSamples (id, formData) {
  return fetch(`${BASE_URL}/api/samples/${id}`, {
    method: 'PUT',
    body: formData
  })
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function deleteSamples (data) {
  return fetch(`${BASE_URL}/api/samples/${data.id}`, {
    method: 'DELETE'
  })
    .catch(error => { throw (error) })
}

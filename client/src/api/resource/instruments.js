/* eslint-disable no-undef */
import { BASE_URL } from '../index'
import { checkResponse } from '../utils'

export function getInstruments () {
  return fetch(`${BASE_URL}/api/instruments`)
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function deleteInstruments (id) {
  return fetch(`${BASE_URL}/api/instruments/${id}`, {
    method: 'DELETE'
  })
    .catch(error => { throw (error) })
}

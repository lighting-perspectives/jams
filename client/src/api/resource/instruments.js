/* eslint-disable no-undef */
import { BASE_URL } from '../index'
import { checkResponse, serializeData } from '../utils'

export function getInstruments () {
  return fetch(`${BASE_URL}/api/instruments`)
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function postInstruments (formData) {
  console.log('label', formData.get('label'))
  return fetch(`${BASE_URL}/api/instruments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `label=${formData.get('label')}`
  })
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function putInstruments (id, formData) {
  return fetch(`${BASE_URL}/api/instruments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: serializeData(formData)
  })
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

export function postInstrumentsMappings (instrumentId, formData) {
  return fetch(`${BASE_URL}/api/instruments/${instrumentId}/mappings`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: serializeData(formData)
  })
    .then(res => checkResponse(res))
    .then(res => res.json())
    .catch(error => { throw (error) })
}

export function deleteMappings (id) {
  return fetch(`${BASE_URL}/api/mappings/${id}`, {
    method: 'DELETE'
  })
    .catch(error => { throw (error) })
}

import supabase from 'utils/supabase/client'
import Action from './models'

export function transformToQuery(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      if (key === '') {
        return value.join(', ')
      } else {
        return `${key} (${value.join(', ')})`
      }
    })
    .join(', ')
}

export function hierarchyTransformToQuery(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      if (key === '') {
        return value.join(', ')
      } else {
        if (typeof value === 'array') return `${key} (${value.join(', ')})`
        else if (typeof value === 'object') {
          return hierarchyTransformToQuery(value)
        }
      }
    })
    .join(', ')
}

export const getCurrentTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export const getTimestamptz = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
  return `${year}-${month}-${day} ${hour}:${minute}:${second}+00`
}

export async function createLog(table, values, id) {
  if (table === 'log_khoi_kien') {
    values.ma_khoi_kien = id
  } else {
    values.ma_thi_hanh_an = id
  }
  const { data, error } = await supabase.from(table).insert(values).select().single()
  return {
    data: data,
    error: error,
  }
}

export async function recordHistory(table, values) {
  return Action.create({ table: table, values: values })
}

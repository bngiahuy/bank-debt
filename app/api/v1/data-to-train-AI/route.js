import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'
import supabase from 'utils/supabase/client'
import { NextResponse } from 'next/server'

const sortArr = (arr) => {
  let tempArr = arr
  tempArr.sort(function (a, b) {
    var ma_ket_qua_a = a.ma_ket_qua
    var ma_ket_qua_b = b.ma_ket_qua
    if (ma_ket_qua_a < ma_ket_qua_b) {
      return -1
    }
    if (ma_ket_qua_a > ma_ket_qua_b) {
      return 1
    }
    return 0
  })
  return tempArr
}

const getActionIndex = (data) => {
  const LHKH = sortArr(data.filter((item) => item.ma_ket_qua.indexOf('LHKH') >= 0))
  const GTKH = sortArr(data.filter((item) => item.ma_ket_qua.indexOf('GTKH') >= 0))
  const LHNT = sortArr(data.filter((item) => item.ma_ket_qua.indexOf('LHNT') >= 0))
  const XMKH = sortArr(data.filter((item) => item.ma_ket_qua.indexOf('XMKH') >= 0))
  const KKTHA = sortArr(data.filter((item) => item.ma_ket_qua.indexOf('KKTHA') >= 0))
  const actionIndex = {}
  let i = 0
  LHKH.forEach((item) => {
    actionIndex[item.ma_ket_qua] = i
    i = i + 1
  })
  GTKH.forEach((item) => {
    actionIndex[item.ma_ket_qua] = i
    i = i + 1
  })
  LHNT.forEach((item) => {
    actionIndex[item.ma_ket_qua] = i
    i = i + 1
  })
  XMKH.forEach((item) => {
    actionIndex[item.ma_ket_qua] = i
    i = i + 1
  })
  KKTHA.forEach((item) => {
    actionIndex[item.ma_ket_qua] = i
    i = i + 1
  })

  return actionIndex
}

export async function GET() {
  const { data, error } = await supabase.from('ket_qua').select('*', {
    count: 'exact',
  })

  if (error) {
    return NextResponse.json(
      {
        body: JSON.stringify(error),
      },
      { status: 500 }
    )
  }

  const actionIndex = getActionIndex(data)
  const dataArr = {}
  const recordLength = data.length

  if (true) {
    const { data, error } = await supabase
      .from('ghi_chep_ls_hanh_dong')
      .select('ma_khach_hang, ma_ket_qua, danh_gia', {
        count: 'exact',
      })

    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }

    data.forEach((item) => {
      if (Object.keys(dataArr).includes(item.ma_khach_hang.toString())) {
        const tempArr = dataArr[item.ma_khach_hang]
        tempArr[actionIndex[item.ma_ket_qua]] = item.danh_gia
        dataArr[item.ma_khach_hang] = tempArr
      } else {
        const tempArr = Array(recordLength).fill(0)
        tempArr[actionIndex[item.ma_ket_qua]] = item.danh_gia
        dataArr[item.ma_khach_hang] = tempArr
      }
    })
  }

  let xTrain = [],
    yTrain = []
  Object.keys(dataArr).forEach((item) => {
    const tempRecord = dataArr[item]
    xTrain.push(tempRecord.slice(0, recordLength - 1))
    yTrain.push(tempRecord[recordLength - 1])
  })

  const newYTrain = yTrain.map((item) => {
    if (item == 0 || item == 2) {
      return 0
    } else return 1
  })

  return NextResponse.json({ xTrain: xTrain, yTrain: newYTrain }, { status: 200 })
}

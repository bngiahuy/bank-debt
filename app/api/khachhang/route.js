import { supabase } from 'utils/supabaseClient'
import { NextResponse, NextRequest } from 'next/server'
import checkLogicParams from './helpers'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 20 // Limit default = 20
  const ma_nhan_vien = obj['ma_nhan_vien']

  if (obj['offset'] && obj['limit']) {
    const { data, error } = await supabase
      .from('khach_hang')
      .select('*, du_no_the_td(id, nhom_no, ngay_chuyen_nhom_3, tong_du_no, da_thanh_toan)')
      .range(offset, limit)
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }
    data.sort((a, b) => -a.ma_khach_hang + b.ma_khach_hang)
    return NextResponse.json(
      { count: data.length, next: null, previous: null, results: data },
      { status: 200 }
    )
  } else {
    let apiQuery = supabase
      .from('khach_hang')
      .select('*, du_no_the_td(id, nhom_no, ngay_chuyen_nhom_3, tong_du_no, da_thanh_toan)', {
        count: 'exact',
      })
    if (ma_nhan_vien && ma_nhan_vien.indexOf('SHB') >= 0) {
      apiQuery = apiQuery.eq('nhan_vien_phu_trach_1', ma_nhan_vien)
    }
    const { count, data, error } = await apiQuery
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }
    data.sort((a, b) => -a.ma_khach_hang + b.ma_khach_hang)

    return NextResponse.json(
      { count: count, next: null, previous: null, results: data },
      { status: 200 }
    )
  }
}

export async function POST(request) {
  try {
    const res = await request.json()
    const dataToCreate = res.body
    /* 
    res.body sent from FE and we have
    dataToCreate = {
      IDKhachHang: '',
      Ho_ten: '', 
      CCCD: '', 
      Email: '',
      SDT: '', 
      DiaChiThuongTru: '',
      DiaChiTamTru: '',
      TenCongTy: '',
      DiaChiCongTy: ''
    }
    */
    const objLength = Object.keys(dataToCreate).length
    // If object has no params
    if (objLength <= 1) {
      return NextResponse.json({ body: 'Invalid or missing parameters' }, { status: 400 })
    }

    // // Check logic IDKhachHang
    // if (!dataToCreate['IDKhachHang'] || isNaN(parseInt(dataToCreate['ma_khach_hang']))) {
    //   return NextResponse.json(
    //     { body: 'Invalid or missing "ma_khach_hang" parameter' },
    //     { status: 400 }
    //   )
    // }

    try {
      const checkLogic = checkLogicParams(dataToCreate)
    } catch (error) {
      return error
    }

    let nguoi_than = []
    if (dataToCreate.nguoi_than_khach_hang) {
      nguoi_than = dataToCreate.nguoi_than_khach_hang
      delete dataToCreate.nguoi_than_khach_hang
    }

    const { error } = await supabase.from('khach_hang').insert(dataToCreate)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    // Add relatives
    if (nguoi_than.length > 0) {
      const addedCustomerIdArr = nguoi_than.map((item) => {
        return {
          ...item,
          ma_khach_hang: dataToCreate.ma_khach_hang,
        }
      })
      const { error } = await supabase.from('nguoi_than_khach_hang').insert(addedCustomerIdArr)
      if (error) {
        return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
      }
    }

    return NextResponse.json({ body: 'Inserted' }, { status: 200 })
  } catch (error) {
    let error_response = {
      body: error.message,
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500,
    })
  }
}

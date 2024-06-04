import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'
import { getCurrentTime } from '../v1/helpers'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  // const id = obj['IDKhachHang'] ? obj['IDKhachHang'] : ''
  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10

  if (obj['offset'] && obj['limit']) {
    const { data, error } = await supabase
      .from('tien_do_thi_hanh_an')
      .select(`*, KhachHang (Ho_ten, CCCD), NhanVien (HoTen)`)
      .range(offset, limit)
      .order('last_edited_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { count: data.length, next: null, previous: null, results: data },
      { status: 200 }
    )
  } else {
    const { count, data, error } = await supabase
      .from('tien_do_thi_hanh_an')
      .select(`*, KhachHang (Ho_ten, CCCD), NhanVien (HoTen)`, { count: 'exact' })
      .order('last_edited_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { count: count, next: null, previous: null, results: data },
      { status: 200 }
    )
  }
}

export async function POST(request) {
  const res = await request.json()
  const dataToCreate = res.body
  /* 
      res.body sent from FE and we have
      dataToCreate = {
      "IDKhachHang" = '',
      "tinh_tp" = '',
      "quan_huyen" = '',
      "id_nguoi_duoc_uq" = '',
      "nguoi_thuc_hien" = '',
      }
      */
  // Check params

  if (!dataToCreate['IDKhachHang'] || isNaN(parseInt(dataToCreate['IDKhachHang']))) {
    return NextResponse.json(
      { body: 'Invalid or missing "IDKhachHang" parameter' },
      { status: 400 }
    )
  }

  if (!dataToCreate['tinh_tp']) {
    return NextResponse.json({ body: 'Missing "tinh_tp" parameter' }, { status: 400 })
  }

  if (!dataToCreate['quan_huyen']) {
    return NextResponse.json({ body: 'Missing "quan_huyen" parameter' }, { status: 400 })
  }

  if (!dataToCreate['id_nguoi_duoc_uq'] || isNaN(parseInt(dataToCreate['id_nguoi_duoc_uq']))) {
    return NextResponse.json(
      { body: 'Invalid or missing "id_nguoi_duoc_uq" parameter' },
      { status: 400 }
    )
  }
  if (!dataToCreate['nguoi_thuc_hien']) {
    return NextResponse.json({ body: 'Missing "nguoi_thuc_hien" parameter' }, { status: 400 })
  }

  const nguoi_thuc_hien = dataToCreate['nguoi_thuc_hien']
  delete dataToCreate.nguoi_thuc_hien

  dataToCreate.trang_thai_tha = 'Tạo hồ sơ THA'
  dataToCreate.last_edited_at = getCurrentTime()

  const { data, error } = await supabase.from('tien_do_thi_hanh_an').insert(dataToCreate).select()

  if (error) {
    return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
  }

  const id = data[0].id

  //   Tạo thông tin log thi hành án
  if (!error) {
    const log = {
      thao_tac: 'Tạo hồ sơ THA',
      trang_thai: 'Tạo hồ sơ THA',
      nguoi_thuc_hien: nguoi_thuc_hien,
      id_thi_hanh_an: id,
    }
    const { error } = await supabase.from('thong_tin_log_thi_hanh_an').insert(log)
    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }
  }
  return NextResponse.json({ body: 'Inserted' }, { status: 200 })
}

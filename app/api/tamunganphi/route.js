import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'
import { getDateTime } from './helpers'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  // const id = obj['IDKhachHang'] ? obj['IDKhachHang'] : ''
  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10

  if (obj['offset'] && obj['limit']) {
    const { data, error } = await supabase
      .from('tam_ung_an_phi')
      .select(`*, tien_do_khoi_kien (*, NhanVien (HoTen), KhachHang (Ho_ten, CCCD))`)
      .order('thoi_gian_thuc_hien', { ascending: false })
      .range(offset, limit)
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
      .from('tam_ung_an_phi')
      .select(`*, tien_do_khoi_kien (*, NhanVien (HoTen), KhachHang (Ho_ten, CCCD))`)
      .order('thoi_gian_thuc_hien', { ascending: false })
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
      dataToCreate = [{
      "id_khoi_kien" = '',
      "trang_thai_tuap" = '',
      "ngay_tb_tuap" = '',
      "so_tien_tuap" = '',
      "so_tien_dong_tuap" = '',
      "ngay_dong_tuap" = '',
      "so_bien_lai" = '',
      "so_tien_hoan_tuap" = '',
      "ngay_hoan_tuap" = '',
      "nguoi_thuc_hien" = ''
      }]
      */
  // Check params
  dataToCreate.map((item) => {
    if (!item['id_khoi_kien']) {
      return NextResponse.json({ body: 'Missing "id_khoi_kien" parameter' }, { status: 400 })
    }
    if (!item['trang_thai_tuap']) {
      return NextResponse.json({ body: 'Missing "trang_thai_tuap" parameter' }, { status: 400 })
    }
    if (!item['ngay_tb_tuap']) {
      return NextResponse.json({ body: 'Missing "ngay_tb_tuap" parameter' }, { status: 400 })
    }
    if (!item['so_tien_tuap']) {
      return NextResponse.json({ body: 'Missing "so_tien_tuap" parameter' }, { status: 400 })
    }
    if (!item['nguoi_thuc_hien']) {
      return NextResponse.json({ body: 'Missing "nguoi_thuc_hien" parameter' }, { status: 400 })
    }
  })

  const newDataToCreate = dataToCreate.map((item) => {
    item.thoi_gian_thuc_hien = getDateTime()
    return item
  })

  const { error } = await supabase.from('tam_ung_an_phi').insert(newDataToCreate)
  if (error) {
    return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
  }
  return NextResponse.json({ body: 'Inserted' }, { status: 200 })
}

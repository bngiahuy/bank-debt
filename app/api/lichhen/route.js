import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'
import { getDateTime } from './helpers'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10
  // const fields = obj['fields'] ? obj['fields'] : '*'

  if (obj['offset'] && obj['limit']) {
    // const { data, error } = await supabase
    //   .from('lich_hen')
    //   .select(`*, khach_hang (ho_ten, can_cuoc), khoi_kien (*, NhanVien (HoTen))`)
    //   .order('thoi_gian_cap_nhat', { ascending: false })
    //   .range(offset, limit)
    const { data, error } = await supabase
      .from('lich_hen')
      .select(`*, khach_hang(ho_ten, can_cuoc), khoi_kien(*, nhan_vien(ho_ten))`)
      .order('created_at', { ascending: false })
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
    // const { count, data, error } = await supabase
    //   .from('lich_hen')
    //   .select(`*, KhachHang (Ho_ten, CCCD), tien_do_khoi_kien (*)`)
    //   .order('created_at', { ascending: false })
    const { count, data, error } = await supabase
      .from('lich_hen')
      .select(`*`)
      .order('created_at', { ascending: false })
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
      "trang_thai_ho_so" = '',
      "ngay_hen" = '',
      "noi_dung_hen" = '',
      "nguoi_tao_lich_hen" = '',
      "ma_khoi_kien" = '',
      "ma_thi_hanh_an" = '',
      "ma_khach_hang" = '',
      }]
      */
  // Check params
  if (!isValidTimestamp(dataToCreate['ngay_hen'])) {
    return NextResponse.json(
      {
        body: 'Invalid "ngay_hen" parameter, must be timestamp type',
      },
      { status: 400 }
    )
  }
  if (!checkStringIsCharacters(dataToCreate['nguoi_tao_lich_hen'])) {
    return NextResponse.json(
      {
        body: 'Invalid "nguoi_tao_lich_hen" parameter, must be a valid name',
      },
      { status: 400 }
    )
  }
  const { error } = await supabase.from('lich_hen').insert(dataToCreate)
  if (error) {
    return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
  }
  return NextResponse.json({ body: 'Inserted' }, { status: 200 })
}

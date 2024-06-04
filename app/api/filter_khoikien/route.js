import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const res = await request.json()
  const filter = res.filter

  let query = supabase.from('khoi_kien_filter').select(`*`, { count: 'exact' })

  // Condition chaining for filters
  if (filter['ma_nv_uy_quyen']) {
    query = query.eq('ma_nv_uy_quyen', filter['ma_nv_uy_quyen'])
  }
  if (filter['ma_khoi_kien']) {
    query = query.eq('ma_khoi_kien', filter['ma_khoi_kien'])
  }
  if (filter['ma_khach_hang']) {
    query = query.eq('ma_khach_hang', filter['ma_khach_hang'])
  }
  if (filter['ho_ten']) {
    query = query.like('ho_ten', '%' + filter['ho_ten'] + '%')
  }
  if (filter['can_cuoc']) {
    query = query.eq('can_cuoc', filter['can_cuoc'])
  }
  if (filter['trang_thai']) {
    query = query.eq('trang_thai', filter['trang_thai'])
  }
  if (filter['tinh_tp']) {
    query = query.eq('tinh_tp', filter['tinh_tp'])
  }
  if (filter['quan_huyen']) {
    query = query.eq('quan_huyen', filter['quan_huyen'])
  }
  if (filter['so_tien_kk']) {
    query = query.eq('so_tien_kk', filter['so_tien_kk'])
  }
  if (filter['ma_nhan_vien']) {
    query = query.eq('ma_nhan_vien', filter['ma_nhan_vien'])
  }
  if (filter['tu_ngay'] && filter['den_ngay']) {
    const tu_ngay = filter['tu_ngay'] + 'T00:00:00.000Z'
    const den_ngay = filter['den_ngay'] + 'T23:59:59.999Z'
    query = query.gte('created_at', tu_ngay).lte('created_at', den_ngay)
  }

  const { count, data, error } = await query

  if (error) {
    return NextResponse.json(
      {
        body: JSON.stringify(error),
      },
      { status: 500 }
    )
  }
  return NextResponse.json({ count: count, next: null, prev: null, result: data }, { status: 200 })
}

import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const res = await request.json()
  const filter = res.filter

  let query = supabase.from('lich_hen_filter').select(`*`, { count: 'exact' })

  // Condition chaining for filters
  if (filter['ma_khach_hang']) {
    query = query.eq('ma_khach_hang', filter['ma_khach_hang'])
  }
  if (filter['ten_khach_hang']) {
    query = query.like('ten_khach_hang', '%' + filter['ten_khach_hang'] + '%')
  }
  if (filter['can_cuoc']) {
    query = query.eq('can_cuoc', filter['can_cuoc'])
  }
  if (filter['trang_thai_kk']) {
    query = query.eq('trang_thai_kk', filter['trang_thai_kk'])
  }

  if (filter['trang_thai_tha']) {
    query = query.eq('trang_thai_tha', filter['trang_thai_tha'])
  }
  if (filter['id_nguoi_uy_quyen']) {
    query = query.eq('id_nguoi_uy_quyen', filter['id_nguoi_uy_quyen'])
  }
  if (filter['tinh_tp']) {
    query = query.eq('tinh_tp', filter['tinh_tp'])
  }
  if (filter['quan_huyen']) {
    query = query.eq('quan_huyen', filter['quan_huyen'])
  }
  if (filter['tu_ngay'] && filter['den_ngay']) {
    // const tu_ngay = filter['tu_ngay'] + 'T00:00:00.000Z'
    // const den_ngay = filter['den_ngay'] + 'T23:59:59.999Z'
    const tu_ngay = filter['tu_ngay']
    const den_ngay = filter['den_ngay']
    query = query.gte('ngay_tao_lich_hen', tu_ngay).lte('ngay_tao_lich_hen', den_ngay)
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

import supabase from 'utils/supabase/client'
import { NextResponse } from 'next/server'
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
  const limit = obj['limit'] ? parseInt(obj['limit']) : 20 // Limit default = 20
  const from = obj['from'] ? obj['from'] : ''
  const to = obj['to'] ? obj['to'] : ''

  if (obj['offset'] && obj['limit']) {
    let query = supabase
      .from('ghi_chep_ls_hanh_dong')
      .select(
        `tong_ty_trong:ty_trong.sum(), ma_nhan_vien, nhan_vien(ho_ten, chuc_danh, phong_ban)`,
        { count: 'exact' }
      )
    if (from) query = query.gte('created_at', from)
    if (to) query = query.lte('created_at', to)

    const { count, data, error } = await query.range(offset, limit)
    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { count: count, next: null, previous: null, results: data },
      { status: 200 }
    )
  } else {
    let query = supabase
      .from('ghi_chep_ls_hanh_dong')
      .select(
        `tong_ty_trong:ty_trong.sum(), ma_nhan_vien, nhan_vien(ho_ten, chuc_danh, phong_ban)`,
        { count: 'exact' }
      )
    if (from) query = query.gte('created_at', from)
    if (to) query = query.lte('created_at', to)
    const { count, data, error } = await query

    if (error) {
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { count: count, next: null, previous: null, results: data },
      { status: 200 }
    )
  }
}

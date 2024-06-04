import supabase from 'utils/supabase/client'
import { NextResponse } from 'next/server'
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())

  const ma_nhan_vien = obj['ma_nv'] ? obj['ma_nv'] : ''
  const from = obj['from'] ? obj['from'] : ''
  const to = obj['to'] ? obj['to'] : ''

  if (!ma_nhan_vien) {
    return NextResponse.json({ body: 'Missing filter ma_nhan_vien' }, { status: 400 })
  }

  let query = supabase
    .from('ghi_chep_ls_hanh_dong')
    .select(`count:ma_hanh_dong.count(), hanh_dong (ma_hanh_dong, ten_hanh_dong, loai_hanh_dong)`, {
      count: 'exact',
    })

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

import { NextResponse } from 'next/server'
import supabase from 'utils/supabase/client'

export async function GET(request) {
  const result = {}
  let ttdgkks
  let ttmgs

  // Get list ttdgkk
  if (true) {
    const { data, error } = await supabase
      .from('to_trinh_khoi_kien')
      .select(
        'ma_to_trinh, created_at, updated_at, trang_thai, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)'
      )
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    ttdgkks = data
  }

  // Get list ttmg
  if (true) {
    const { data, error } = await supabase
      .from('to_trinh_mien_giam')
      .select(
        'ma_to_trinh, created_at, updated_at, trang_thai, khach_hang (ho_ten, ma_khach_hang), nhan_vien (ho_ten, ma_nhan_vien)'
      )
    if (error)
      return NextResponse.json(
        {
          body: JSON.stringify(error),
        },
        { status: 500 }
      )
    ttmgs = data
  }

  // Get ttmgs which aren't approved
  result.ttmgNotApproved = ttmgs.filter((item) => item.trang_thai === 'Chưa duyệt')

  // Get ttdgkks which aren't approved
  result.ttdgkkNotApproved = ttdgkks.filter((item) => item.trang_thai === 'Chưa duyệt')

  return NextResponse.json({ result: result }, { status: 200 })
}

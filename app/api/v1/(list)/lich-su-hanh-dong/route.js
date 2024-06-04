import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'
import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['id', 'ghi_chu', 'ngay_thuc_hien', 'ngay_cap_nhat', 'danh_gia'],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc'],
    hanh_dong: ['ma_hanh_dong', 'loai_hanh_dong', 'ten_hanh_dong'],
    ket_qua: ['ma_ket_qua', 'ghi_chu_ket_qua'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten'],
  }

  if (query) {
    return Action.read({
      table: 'lich_su_hanh_dong',
      query: transformToQuery(data),
      column: 'ma_nhan_vien',
      value: query,
      sortField: 'ngay_cap_nhat',
    })
  }

  return Action.read({
    table: 'lich_su_hanh_dong',
    query: transformToQuery(data),
    sortField: 'ngay_cap_nhat',
  })
}

export async function POST(request) {
  const res = await request.json()

  const ma_khach_hang = res.ma_khach_hang
  const { data, error } = await supabase
    .from('lich_su_hanh_dong')
    .select('*')
    .eq('ma_khach_hang', ma_khach_hang.toString())
  if (data.length > 0) {
    return NextResponse.json(
      {
        body: 'Khách hàng này đã được thực hiện thu hồi nợ',
      },
      { status: 404 }
    )
  }

  return Action.createAndRecord({ table: 'lich_su_hanh_dong', values: res })
}

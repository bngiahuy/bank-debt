import Action from '@/api/v1/models'
import { transformToQuery, getCurrentTime } from '@/api/v1/helpers'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const ma_nhan_vien = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['*'],
    khach_hang: ['ho_ten', 'can_cuoc', 'ma_khach_hang'],
    nhan_vien: ['ho_ten', 'ma_nhan_vien'],
    khoi_kien: ['*', 'nhan_vien (ma_nhan_vien, ho_ten)'],
    thi_hanh_an: ['*', 'nhan_vien (ma_nhan_vien, ho_ten)'],
  }

  if (ma_nhan_vien) {
    return Action.read({
      table: 'lich_hen',
      query: transformToQuery(data),
      column: 'ma_nhan_vien',
      value: ma_nhan_vien,
    })
  }

  return Action.read({
    table: 'lich_hen',
    query: transformToQuery(data),
  })
}

export async function POST(request) {
  const res = await request.json()

  const newData = res.map((item) => {
    item.updated_at = getCurrentTime()
    return item
  })

  return Action.create({
    table: 'lich_hen',
    values: newData,
  })
}

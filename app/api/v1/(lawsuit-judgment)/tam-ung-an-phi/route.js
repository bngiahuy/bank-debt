import Action from '@/api/v1/models'
import { transformToQuery, getCurrentTime } from '@/api/v1/helpers'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')

  const data = {
    '': ['*'],
    khach_hang: ['ho_ten', 'can_cuoc', 'ma_khach_hang'],
    khoi_kien: ['*', 'nhan_vien (ma_nhan_vien, ho_ten)'],
  }

  return Action.read({
    table: 'tam_ung_an_phi',
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
    table: 'tam_ung_an_phi',
    values: newData,
  })
}

import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'

export function GET(request) {
  // const searchParams = request.nextUrl.searchParams
  // const query = searchParams.get('ma_nhan_vien')

  const data = {
    '': ['ma_khach_hang', 'ho_ten', 'can_cuoc'],
    du_no_the_td: [
      'so_the',
      'the_tin_dung (so_tai_khoan_the)',
      'da_thanh_toan',
      'tong_du_no_con_lai',
    ],
    nhan_vien: ['ma_nhan_vien, ho_ten'],
  }

  //   if (query) {
  //     return Action.read({
  //       table: 'khach_hang',
  //       query: transformToQuery(data),
  //       column: 'ma_nhan_vien',
  //       value: query,
  //     })
  //   }

  return Action.read({
    table: 'khach_hang',
    query: transformToQuery(data),
  })
}

export async function POST(request) {
  const res = await request.json()
  return Action.create({ table: 'khach_hang', values: res })
}

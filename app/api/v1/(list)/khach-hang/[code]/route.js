import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'

export async function GET(_, { params }) {
  const data = {
    '': ['*'],
    du_no_the_td: ['*', 'the_tin_dung (so_tai_khoan_the)'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten'],
  }

  return Action.read(
    {
      table: 'khach_hang',
      query: transformToQuery(data),
      column: 'ma_khach_hang',
      value: params.code,
    },
    true
  )
}

export async function PATCH(request, { params }) {
  const res = await request.json()

  const { type, ...other } = res

  return Action.update({
    table: type,
    values: { ...other },
    column: 'ma_khach_hang',
    value: params.code,
  })
}

export function DELETE(_, { params }) {
  return Action.delete({ table: 'khach_hang', column: 'ma_khach_hang', value: params.code })
}

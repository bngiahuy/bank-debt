import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'
import { getTimestamptz } from '@/api/v1/helpers'

export async function GET(_, { params }) {
  const data = {
    '': ['*'],
    khach_hang: ['ma_khach_hang', 'ho_ten', 'can_cuoc', 'thuong_tru', 'tam_tru'],
    nhan_vien: ['ma_nhan_vien', 'ho_ten'],
  }

  return Action.read(
    {
      table: 'to_trinh_khoi_kien',
      query: transformToQuery(data),
      column: 'ma_to_trinh',
      value: params.code,
    },
    true
  )
}

export async function PATCH(request, { params }) {
  const res = await request.json()

  if (res.action === 'approve') {
    res.trang_thai = 'Đã duyệt'
    delete res.action
  } else if (res.action === 'decline') {
    res.trang_thai = 'Đã từ chối'
    delete res.action
  }
  res.updated_at = getTimestamptz()

  return Action.update({
    table: 'to_trinh_khoi_kien',
    values: res,
    column: 'ma_to_trinh',
    value: params.code,
  })
}

export function DELETE(_, { params }) {
  return Action.delete({ table: 'to_trinh_khoi_kien', column: 'ma_to_trinh', value: params.code })
}

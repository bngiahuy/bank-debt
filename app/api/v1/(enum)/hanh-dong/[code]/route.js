import Action from '@/api/v1/models'

export async function PATCH(request, { params }) {
  const res = await request.json()
  return Action.update({
    table: 'hanh_dong',
    values: res,
    column: 'ma_hanh_dong',
    value: params.code,
  })
}

export function DELETE(_, { params }) {
  return Action.delete({ table: 'hanh_dong', column: 'ma_hanh_dong', value: params.code })
}

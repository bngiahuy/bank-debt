import Action from '@/api/v1/models'

export async function PATCH(request, { params }) {
  const res = await request.json()
  return Action.updateAndRecord({
    table: 'lich_su_hanh_dong',
    values: res,
    column: 'id',
    value: params.id,
  })
}

export function DELETE(_, { params }) {
  return Action.delete({ table: 'lich_su_hanh_dong', column: 'id', value: params.id })
}

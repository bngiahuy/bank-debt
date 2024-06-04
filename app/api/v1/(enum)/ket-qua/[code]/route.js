import Action from '@/api/v1/models'

export async function PATCH(request, { params }) {
  const res = await request.json()
  return Action.update({
    table: 'ket_qua',
    values: res,
    column: 'ma_ket_qua',
    value: params.code,
  })
}

export function DELETE(_, { params }) {
  return Action.delete({ table: 'ket_qua', column: 'ma_ket_qua', value: params.code })
}

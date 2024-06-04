import Action from '@/api/v1/models'
import { transformToQuery } from '@/api/v1/helpers'

export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('ma_hanh_dong')

  if (query) {
    return Action.read({ table: 'ket_qua', query: '*', column: 'ma_hanh_dong', value: query })
  }

  return Action.read({
    table: 'ket_qua',
    query: transformToQuery({
      '': ['*'],
      hanh_dong: ['ten_hanh_dong', 'loai_hanh_dong'],
    }),
  })
}

export async function POST(request) {
  const res = await request.json()
  return Action.create({ table: 'ket_qua', values: res })
}

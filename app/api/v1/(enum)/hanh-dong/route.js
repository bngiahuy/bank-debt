import Action from '@/api/v1/models'

export function GET() {
  return Action.read({ table: 'hanh_dong', query: '*' })
}

export async function POST(request) {
  const res = await request.json()
  return Action.create({ table: 'hanh_dong', values: res })
}

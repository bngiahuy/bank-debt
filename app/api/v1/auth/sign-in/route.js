import supabase from 'utils/supabase/client'

export async function POST(request) {
  const res = await request.json()

  const { data, error } = await supabase.auth.signInWithPassword(res)

  if (error) return Response.json(error, { status: error.status || 400 })

  return Response.json(data)
}

import { supabase } from 'utils/supabaseClient'
import { NextResponse } from 'next/server'
import checkLogicParams from '../../helpers'

export async function GET(request, { params }) {
  const so_the = params.so_the
  if (!so_the || isNaN(parseInt(so_the))) {
    return NextResponse.json(
      {
        body: 'Invalid or missing "so_the" parameter',
      },
      {
        status: 400,
      }
    )
  }
  const { count, data, error } = await supabase
    .from('the_tin_dung')
    .select('*, khach_hang(*)', { count: 'exact' })
    .eq('so_the', so_the)
  if (error) {
    return NextResponse.json(
      {
        body: JSON.stringify(error),
      },
      {
        status: 500,
      }
    )
  }
  return NextResponse.json({ count: count, results: data }, { status: 200 })
}

export async function PATCH(request, { params }) {
  try {
    const so_the = params.so_the
    if (!so_the || isNaN(parseInt(so_the))) {
      return NextResponse.json(
        {
          body: 'Invalid or missing "so_the" parameter',
        },
        {
          status: 400,
        }
      )
    }
    const res = await request.json()
    /* 
      request.json() = {
        body: {}
      }
    */
    const dataToUpdate = res.body

    try {
      const checkLogic = checkLogicParams(dataToUpdate)
    } catch (error) {
      return error
    }
    const { error } = await supabase.from('the_tin_dung').update(dataToUpdate).eq('so_the', so_the)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ body: 'Updated' }, { status: 200 })
  } catch (error) {
    let error_response = {
      body: error.message,
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500,
    })
  }
}

export async function PUT(request, { params }) {
  try {
    const so_the = params.so_the
    if (!so_the || isNaN(parseInt(so_the))) {
      return NextResponse.json(
        {
          body: 'Invalid or missing "so_the" parameter',
        },
        {
          status: 400,
        }
      )
    }
    const res = await request.json()
    const dataToUpdate = res.body
    try {
      const checkLogic = checkLogicParams(dataToUpdate)
    } catch (error) {
      return error
    }
    const { error } = await supabase.from('the_tin_dung').update(dataToUpdate).eq('so_the', so_the)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ body: 'Updated' }, { status: 200 })
  } catch (error) {
    let error_response = {
      body: error.message,
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500,
    })
  }
}

export async function DELETE(request, { params }) {
  try {
    const idToDelete = params.so_the

    if (!idToDelete || isNaN(parseInt(idToDelete))) {
      return NextResponse.json({ body: 'Invalid or missing "so_the" parameter' }, { status: 400 })
    }
    // Construct and execute the Supabase delete query
    const { error } = await supabase.from('the_tin_dung').delete().eq('so_the', idToDelete)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json(
      { body: 'Record deleted successfully' },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { body: JSON.stringify({ error: 'Internal server error' }) },
      { status: 500 }
    )
  }
}

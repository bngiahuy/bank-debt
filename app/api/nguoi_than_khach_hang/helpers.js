import { NextResponse } from 'next/server'

function checkCCCD(string) {
  // check for only numbers (0-9) and has exactly 12 characters
  const regex = /^\d{12}$/
  return regex.test(string)
}
function checkStringIsCharacters(string) {
  // check for only letters (a-zA-Z) and whitespace
  const regex = /^[\p{L}\s]+$/u
  return regex.test(string)
}

function checkPhoneNumber(x) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return regex.test(x)
}

function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return mailformat.test(inputText) ? true : false
}

const checkLogicParams = (obj) => {
  const { ho_ten, sdt, can_cuoc, email } = obj
  if (ho_ten) {
    if (!checkStringIsCharacters(ho_ten)) {
      throw NextResponse.json(
        {
          body: 'Invalid "ho_ten" parameter',
        },
        { status: 400 }
      )
    }
  }

  if (sdt && !checkPhoneNumber(sdt)) {
    throw NextResponse.json(
      {
        body: 'Invalid "sdt" parameter',
      },
      { status: 400 }
    )
  }

  if (can_cuoc && !checkCCCD(can_cuoc)) {
    throw NextResponse.json(
      {
        body: 'Invalid "can_cuoc" parameter',
      },
      { status: 400 }
    )
  }

  if (email && !validateEmail(email)) {
    throw NextResponse.json(
      {
        body: 'Invalid "email" parameter',
      },
      { status: 400 }
    )
  }
}

export default checkLogicParams

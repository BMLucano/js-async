"use strict";

let favoriteNumber = 16
const NUMBERS_API_URL = "http://numbersapi.com"
//1.
/** Makes request to Numbers API for trivia about a number. Console logs trivia*/
async function showNumberTrivia(){
  const response = await fetch(`${NUMBERS_API_URL}/${favoriteNumber}?json`)
  const data = await response.json()

  console.log(data.text)
}
showNumberTrivia()
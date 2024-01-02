"use strict";

let favoriteNumber = 16;
const NUMBERS_API_URL = "http://numbersapi.com";
//1.
/** Makes request to Numbers API for trivia about a number. Console logs trivia*/
async function showNumberTrivia() {
  const response = await fetch(`${NUMBERS_API_URL}/${favoriteNumber}?json`);
  const data = await response.json();

  console.log(data.text);
}

// showNumberTrivia()

//2.
/** Makes 4 requests to Numbers API, console logs trivia that returns first. */
async function showNumberRace() {
  const n1 = fetch(`${NUMBERS_API_URL}/1?json`);
  const n2 = fetch(`${NUMBERS_API_URL}/2?json`);
  const n3 = fetch(`${NUMBERS_API_URL}/3?json`);
  const n4 = fetch(`${NUMBERS_API_URL}/4?json`);

  const response = await Promise.race([n1, n2, n3, n4]);
  const data = await response.json();

  console.log(data.text);
}

// showNumberRace()

//3.
/** Makes requests for different numbers, with at least one invalid number str
 * Log to console the array of trivia for successful responses
 */
async function showNumberAll() {
  const n1 = fetch(`${NUMBERS_API_URL}/1?json`);
  const n2 = fetch(`${NUMBERS_API_URL}/2?json`);
  const n3 = fetch(`${NUMBERS_API_URL}/WRONG?json`);
  const n4 = fetch(`${NUMBERS_API_URL}/4?json`);

  const outcomes = await Promise.allSettled([n1, n2, n3, n4]);

  const fulfilled = [];
  const rejected = [];

  for (const outcome of outcomes) {

    const response = await outcome.value;

    if (response.status === 200) {
      const data = await response.json();
      fulfilled.push(data.text);
    }
    else if (response.status === 404) {
      rejected.push('Request failed with status code 404');
    }
  }

  console.log('fulfilled:', fulfilled);
  console.log('rejected:', rejected);

}

showNumberAll();
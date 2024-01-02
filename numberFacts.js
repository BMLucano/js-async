"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";
//1.
/** Makes request to Numbers API for trivia about a number. Console logs trivia*/
//pass in number instead of global var
async function showNumberTrivia(favoriteNumber) {
  const response = await fetch(`${NUMBERS_API_BASE_URL}/${favoriteNumber}?json`);
  const data = await response.json();

  console.log('showNumberTrivia:', data.text);
}

//2.
/** Makes 4 requests to Numbers API, console logs trivia that returns first. */
async function showNumberRace(numbers) {

  const promises = numbers.map(n => fetch(`${NUMBERS_API_BASE_URL}/${n}?json`));

  const winningResponse = await Promise.race(promises);
  const winningData = await winningResponse.json();

  console.log('showNumbersRace:', winningData.text);
}


//3.
/** Makes requests for different numbers, with at least one invalid number str
 * Log to console the array of trivia for successful responses
 */
async function showNumberAll(numbers) {

  const promises = numbers.map(n => fetch(`${NUMBERS_API_BASE_URL}/${n}?json`));

  const outcomes = await Promise.allSettled(promises);

  const fulfilled = [];
  const rejected = [];

  for (const outcome of outcomes) {

    if (outcome.status === 'rejected') {
      rejected.push('Request was rejected');
    }

    else if (outcome.status === 'fulfilled') {
      const response = await outcome.value;

      if (response.status === 200) {
        const data = await response.json();
        fulfilled.push(data.text);
      }
      else if (response.status === 404) {
        rejected.push('Request failed with status code 404');
      }
    }

  }

  console.log('showNumberAll fulfilled:', fulfilled);
  console.log('showNumberAll rejected:', rejected);

}


//4.
/**Calls three other functions one at a time only after current function completes. */
async function main(){
  await showNumberTrivia(16);
  await showNumberRace([1, 2, 3]);
  await showNumberAll([1, 2, 'WRONG', 4]);
}

main();
'use strict';

const mockData = require('./mockData.js').data;
const userProfile = {};
let matchCount = 0;

// Display a welcome message to the user
console.log('Welcome to the Dating App!');

// Prompt the user to provide their details for finding potential matches
console.log('Please provide your details to find potential matches.');

// Prompt and validate first name
userProfile.first_name = '';
while (userProfile.first_name.trim() === '') {
  userProfile.first_name = prompt('What is your first name? ');
}

// Prompt and validate last name
userProfile.last_name = '';
while (userProfile.last_name.trim() === '') {
  userProfile.last_name = prompt('What is your last name? ');
}

// Prompt and validate age
userProfile.age = -1;
while (isNaN(userProfile.age) || userProfile.age < 18) {
  const userInput = prompt('What is your age? ');
  userProfile.age = parseInt(userInput);
}

// Prompt and validate minimum interested age
userProfile.min_age_interest = -1;
while (isNaN(userProfile.min_age_interest) || userProfile.min_age_interest < 18) {
  const userInput = prompt('What is your minimum interested age? ');
  userProfile.min_age_interest = parseInt(userInput);
}

// Prompt and validate maximum interested age
userProfile.max_age_interest = -1;
while (isNaN(userProfile.max_age_interest) || userProfile.max_age_interest < 18 || userProfile.max_age_interest < userProfile.min_age_interest) {
  const userInput = prompt('What is your maximum interested age? ');
  userProfile.max_age_interest = parseInt(userInput);
}

// Prompt and validate gender
userProfile.gender = '';
while (!['M', 'F', 'X'].includes(userProfile.gender.toUpperCase())) {
  userProfile.gender = prompt('What is your gender? (M/F/X) ').toUpperCase();
}

// Prompt and validate gender interest
userProfile.gender_interest = '';
while (!['M', 'F', 'X'].includes(userProfile.gender_interest.toUpperCase())) {
  userProfile.gender_interest = prompt('What gender are you interested in dating? (M/F/X) ').toUpperCase();
}

// Prompt and validate location
userProfile.location = '';
while (!['rural', 'city'].includes(userProfile.location.toLowerCase())) {
  userProfile.location = prompt('What is your location? (rural/city) ').toLowerCase();
}

// Iterate through mockData and count matches
for (const candidate of mockData) {
  const { age: candidateAge, min_age_interest: candidateMinAgeInterest, max_age_interest: candidateMaxAgeInterest,
    gender: candidateGender, gender_interest: candidateGenderInterest, location: candidateLocation } = candidate;

  // Check if the candidate matches the user's criteria
  if (userProfile.age >= candidateMinAgeInterest && userProfile.age <= candidateMaxAgeInterest) {
    if (candidateAge >= userProfile.min_age_interest && candidateAge <= userProfile.max_age_interest) {
      if (userProfile.gender_interest === candidateGender || candidateGenderInterest === userProfile.gender) {
        if (userProfile.location === candidateLocation) {
          matchCount++;
          console.log(`Match found: ${candidate.first_name} ${candidate.last_name} (Age: ${candidateAge}, Location: ${candidateLocation})`);
        }
      }
    }
  }
}

console.log(`Total Matches: ${matchCount}`);








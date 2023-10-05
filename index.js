'use strict';

const mockData = require('./mockData.js').data;
const userProfile = {};
const prompt = require('prompt-sync')();

let userInput, matchCount = 0;

console.log('Welcome to the Dating App!');
console.log('Please provide your details to find potential matches.');

// Validate and set first name
userInput = '';
while (userInput.trim() === '') {
  userInput = prompt('What is your first name? ');
}
userProfile.first_name = userInput.trim();

// Validate and set last name
userInput = '';
while (userInput.trim() === '') {
  userInput = prompt('What is your last name? ');
}
userProfile.last_name = userInput.trim();

userInput = prompt('What is your age? ');
userProfile.age = !isNaN(userInput) && parseInt(userInput) >= 18 ? parseInt(userInput) : -1;

userInput = prompt('What is your minimum interested age? ');
userProfile.min_age_interest = !isNaN(userInput) && parseInt(userInput) >= 18 ? parseInt(userInput) : -1;

userInput = prompt('What is your maximum interested age? ');
userProfile.max_age_interest = !isNaN(userInput) && parseInt(userInput) >= 18 ? parseInt(userInput) : -1;

userInput = prompt('What is your gender? (M/F/X) ');
userProfile.gender = ['M', 'F', 'X'].includes(userInput.toUpperCase()) ? userInput.toUpperCase() : '';

userInput = prompt('What gender are you interested in dating? (M/F/X) ');
userProfile.gender_interest = ['M', 'F', 'X'].includes(userInput.toUpperCase()) ? userInput.toUpperCase() : '';

userInput = prompt('What is your location? (rural/city) ');
userProfile.location = ['rural', 'city'].includes(userInput.toLowerCase()) ? userInput.toLowerCase() : '';

for (const candidate of mockData) {
  const { age: candidateAge, min_age_interest: candidateMinAgeInterest, max_age_interest: candidateMaxAgeInterest,
    gender: candidateGender, gender_interest: candidateGenderInterest, location: candidateLocation } = candidate;

  if ((userProfile.age >= candidateMinAgeInterest && userProfile.age <= candidateMaxAgeInterest) ||
      (candidateAge >= userProfile.min_age_interest && candidateAge <= userProfile.max_age_interest)) {
    if (userProfile.gender_interest === candidateGender || candidateGenderInterest === userProfile.gender) {
      if (userProfile.location === candidateLocation) {
        matchCount++;
        console.log(`Match found: ${candidate.first_name} ${candidate.last_name} (Age: ${candidateAge}, Location: ${candidateLocation})`);
      }
    }
  }
}

console.log(`Total Matches: ${matchCount}`);









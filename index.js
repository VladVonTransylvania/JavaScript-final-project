'use strict';

const mockData = require('./mockData.js').data;
const userProfile = {};
const prompt = require('prompt-sync')();

let userInput, matchCount = 0;

console.log('Welcome to the Dating App!');
console.log('Please provide your details to find potential matches.');



const validateInput = (input, validationFn) => {
  userInput = prompt(input);
  while (!validationFn(userInput)) {
    console.log('Invalid input. Please try again.');
    userInput = prompt(input);
  }
  return userInput;
};

const validateName = (name) => /^[a-zA-Z]+$/.test(name) && name.length > 0;
const validateNumber = (num) => !isNaN(num);
const validateAge = (age) => age >= 18;
const validateAgeRange = (minAge, maxAge) => minAge >= 18 && maxAge >= 18 && maxAge > minAge;
const validateGender = (gender) => ['M', 'F', 'X'].includes(gender.toUpperCase());
const validateLocation = (location) => ['rural', 'city'].includes(location.toLowerCase());

userProfile.first_name = validateInput('What is your first name? ', validateName);
userProfile.last_name = validateInput('What is your last name? ', validateName);
userProfile.age = Number(validateInput('What is your age? ', validateNumber));
userProfile.min_age_interest = Number(validateInput('What is your minimum interested age? ', validateNumber));
userProfile.max_age_interest = Number(validateInput('What is your maximum interested age? ', validateNumber));
userProfile.gender = validateInput('What is your gender? (M/F/X) ', validateGender).toUpperCase();
userProfile.gender_interest = validateInput('What gender are you interested in dating? (M/F/X) ', validateGender).toUpperCase();
userProfile.location = validateInput('What is your location? (rural/city) ', validateLocation).toLowerCase();

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


# Day 1 - Challenge

For both tasks, you should create your tests files under the `__tests__/` directory.

## Task 1

Test the following behaviors for the `NinjaNameGeneratorPage` component:

- When the component is rendered, the form inputs start empty and the generate button is disabled
- When any of the fields is empty or invalid, the generate button is disabled
- When we fill all the fields correctly, the generate button gets enabled
- When we click the generate button, the page shows our generated ninja name
- When we generate a ninja name and click the back button, it should show the empty form again

## Task 2

Test the following behaviors for the `useCardForm` hook:

- When the hook is rendered, it starts with empty values for the three fields
- When setting the card number, it should filter out all non-digit characters
- When setting the card number, it should limit it's size to 16 characters
- When setting the card verification value, it should filter out non-digit characters
- When setting the card verification value, it should limit it's size to 3 characters
- When we set the three fields to valid values, it returns `isValid` as true
- When we set any of the fields is invalid, it returns `isValid` as false

## How to run the tests

Run `npm run test`.

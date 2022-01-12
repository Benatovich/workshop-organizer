// IMPORT MODULES under test here:
import { renderParticipant } from '../fetch-utils.js';

const { test, skip } = QUnit;

const participant = [
    { name: 'steve', workshop_id: 1 }
];

test('should return a DOM node for a participant', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = [{ name: 'steve', workshop_id: 1 }];
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
});

// IMPORT MODULES under test here:
import { 
    renderParticipant,
} from '../render-utils.js';

const test = QUnit.test;

test('should return a DOM node for a participant', (expect) => {
    //Arrange
    const participant = {
        name: 'steve',
        workshop_id: 1
    };
    // Set up your arguments and expectations
    const expected = `<div><p>steve</p></div>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});


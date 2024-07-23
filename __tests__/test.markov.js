const {MarkovMachine} = require('../markov');

let mm;
beforeEach(function() {
    mm = new MarkovMachine("the cat in the hat");
});

describe("test the Markov object's chains", function() {
    test("test identity of the chains", function() {
        expect(mm.chains["the"]).toContain("cat");
        expect(mm.chains["the"]).toContain("hat");
        expect(mm.chains["cat"]).toContain("in");
        expect(mm.chains["in"]).toContain("the");
        expect(mm.chains["the"]).not.toContain("in");
    });
    test("ensure the chains only contain original words", function() {
        const keys = Object.keys(mm.chains);
        expect(keys.length).toEqual(4);
    });
});

describe("test the makeText function", function() {
    let textArray;
    beforeEach(function() {
        let text = mm.makeText();
        textArray = text.split(" ");
    });
    test("Ensure length of the text is appropriate", function() {
        expect(textArray.length).toBeLessThanOrEqual(100);
    });
    test("Ensure text consists of all words", function() {
        const selectedWord = textArray[Math.floor(Math.random() * textArray.length)];
        expect(selectedWord).toEqual(expect.any(String));
    });
});
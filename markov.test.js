const { MarkovMachine } = require("./markov")

describe("Testing Markov Class", function() {
    let content, MarkovTest;

    beforeAll(function() {
        content = "The best test data is the line written here"
        MarkovTest = new MarkovMachine(content)
    })

    test('test that testing works', function() {
        expect('hi').toEqual('hi')
    });

    test('testing makeChains function', function() {
        expect(MarkovTest.words.length).toEqual(9)
        expect(MarkovTest.wordMap['is'][0]).toEqual('the')
        expect(typeof MarkovTest.wordMap == 'object').toBe(true)
    });

    test('testing makeText function', function() {
        expect(MarkovTest.makeText().length).toBeGreaterThan(8)
    });
})
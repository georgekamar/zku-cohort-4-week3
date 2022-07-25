// // [bonus] implement an example game from part d

// pragma circom 2.0.0;

// // [assignment] implement a variation of mastermind from https://en.wikipedia.org/wiki/Mastermind_(board_game)#Variation as a circuit

// // Implementing Guess Who
// // 5 traits, 8 questions

// include "../../node_modules/circomlib/circuits/comparators.circom";
// include "../../node_modules/circomlib/circuits/bitify.circom";
// include "../../node_modules/circomlib/circuits/poseidon.circom";


// // calculate total and quin selector reference taken from: https://github.com/darkforest-eth/circuits/blob/master/perlin/

// template CalculateTotal(n) {
//     signal input in[n];
//     signal output out;

//     signal sums[n];

//     sums[0] <== in[0];

//     for (var i = 1; i < n; i++) {
//         sums[i] <== sums[i-1] + in[i]
//     }

//     out <== sums[n-1];
// }

// template QuinSelector(choices) {
//     signal input in[choices];
//     signal input index;
//     signal output out;

//     // Ensure that index < choices
//     component lessThan = LessThan(4);
//     lessThan.in[0] <== index;
//     lessThan.in[1] <== choices;
//     lessThan.out === 1;

//     component calcTotal = CalculateTotal(choices);
//     component eqs[choices];

//     // For each item, check whether its index equals the input index.
//     for (var i = 0; i < choices; i ++) {
//         eqs[i] = IsEqual();
//         eqs[i].in[0] <== i;
//         eqs[i].in[1] <== index;

//         // eqs[i].out is 1 if the index matches. As such, at most one input to
//         // calcTotal is not 0.
//         calcTotal.in[i] <== eqs[i].out * in[i];
//     }

//     // Returns 0 + 0 + 0 + item
//     out <== calcTotal.out;
// }


// template GuessWho() {


//   // Public inputs
//   signal input traitIndexQuestion;
//   signal input traitIndexAnswer;
//   signal input characterGuessNameIndex;
//   signal input characterGuessAnswer;
//   signal input pubSolnHash;

//   // Private inputs
//   signal input privCharacterNameIndex;
//   signal input privTraitA;
//   signal input privTraitB;
//   signal input privTraitC;
//   signal input privTraitD;
//   signal input privTraitE;
//   signal input privSalt;

//   // Output
//   signal output solnHashOut;

//   var soln[5] = [privTraitA, privTraitB, privTraitC, privTraitD, privTraitE];
//   var j = 0;

//   // Create a constraint that the solution traits 0 or more (more being "has the trait", 0 being "does not have the trait")
//   // and that questioned trait index is less than 5

//   component lessThan = LessThan(3);
//   lessThan.in[0] <== traitIndexQuestion;
//   lessThan.in[1] <== 5;
//   lessThan.out === 1;

//   component greaterEqThan[5];

//   for (j=0; j<5; j++) {
//       greaterEqThan[j] = GreaterEqThan(32);
//       greaterEqThan[j].in[0] <== soln[j];
//       greaterEqThan[j].in[1] <== 0;
//       greaterEqThan[j].out === 1;
//   }

//   // Create a constraint the the answer to the character's guessed
//   // name (if there is one != -1) is correct
//   // Answer: 1 for correct guessed name, 0 for incorrect guessed name

//   component isEqual0 = IsEqual();
//   isEqual0.in[0] <== characterGuessName;
//   isEqual0.in[1] <== -1;

//   component isEqual1 = IsEqual();
//   isEqual1.in[0] <== characterGuessAnswer;
//   isEqual1.in[1] <== -1;

//   component isEqual2 = IsEqual();

//   component quinSelector = QuinSelector(5);

//   if(isEqual1.out == 0){

//     // Create a contraint that the index answer is incorrect

//     quinSelector.in <== soln;
//     quinSelector.index <== traitIndexQuestion;
//     quinSelector.out === traitIndexAnswer;

//   }

//   // Verify that the hash of the private solution matches pubSolnHash
//   component poseidon = Poseidon(7);
//   poseidon.inputs[0] <== privSalt;
//   poseidon.inputs[1] <== privTraitA;
//   poseidon.inputs[2] <== privTraitB;
//   poseidon.inputs[3] <== privTraitC;
//   poseidon.inputs[4] <== privTraitD;
//   poseidon.inputs[5] <== privTraitE;
//   poseidon.inputs[6] <== privCharacterName;

//   solnHashOut <== poseidon.out;
// //  pubSolnHash === solnHashOut;

// }

// component main = GuessWho();

// /*

// INPUT = {
//     "privTraitA": "1",
//     "privTraitB": "0",
//     "privTraitC": "0",
//     "privTraitD": "1",
//     "privTraitE": "0",
//     "privSalt": "123",
//     "traitIndexQuestion": "0",
//     "traitIndexAnswer": "1",
//     "characterGuessName": "-1",
//     "characterGuessAnswer": "-1",
//     "pubSolnHash": "3157727679588526826632910333096458056600411126500422373775748430124589368926"
// }

// */

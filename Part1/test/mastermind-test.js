//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const { expect, assert } = require("chai");
// const { ethers } = require("hardhat");
const { groth16, plonk } = require("snarkjs");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

describe("MastermindVariation", function () {
    this.timeout(100000000);

    it("Circuit should not throw an error: public solution hash is correct using poseidon with the private inputs, number of hits and blows are correct", async function () {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const INPUT = {
            "pubSolnHash": "3157727679588526826632910333096458056600411126500422373775748430124589368926",
            "pubGuessA": 2,
            "pubGuessB": 3,
            "pubGuessC": 1,
            "pubGuessD": 7,
            "pubGuessE": 6,
            "pubNumHit": 0,
            "pubNumBlow": 3,
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 123
        }

        try{

          const witness = await circuit.calculateWitness(INPUT, true);

          assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
          assert(Fr.eq(Fr.e(witness[1]),Fr.e("3157727679588526826632910333096458056600411126500422373775748430124589368926")));
          assert(Fr.eq(Fr.e(witness[2]),Fr.e(2)));
          assert(Fr.eq(Fr.e(witness[3]),Fr.e(3)));
          assert(Fr.eq(Fr.e(witness[4]),Fr.e(1)));
          assert(Fr.eq(Fr.e(witness[5]),Fr.e(7)));
          assert(Fr.eq(Fr.e(witness[6]),Fr.e(6)));
          assert(Fr.eq(Fr.e(witness[7]),Fr.e(0)));
          assert(Fr.eq(Fr.e(witness[8]),Fr.e(3)));
          assert(Fr.eq(Fr.e(witness[9]),Fr.e(1)));
          assert(Fr.eq(Fr.e(witness[10]),Fr.e(2)));
          assert(Fr.eq(Fr.e(witness[11]),Fr.e(3)));
          assert(Fr.eq(Fr.e(witness[12]),Fr.e(4)));
          assert(Fr.eq(Fr.e(witness[13]),Fr.e(5)));
          assert(Fr.eq(Fr.e(witness[14]),Fr.e(123)));


        }catch(e){
          console.log('ERROR');
          console.log(e);
          assert(false);
        }


    });


    it("Circuit should throw an error: public solution hash is correct using poseidon with the private inputs, but the number of blows is inaccurate", async function () {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const INPUT = {
            "pubSolnHash": "3157727679588526826632910333096458056600411126500422373775748430124589368926",
            "pubGuessA": 2,
            "pubGuessB": 3,
            "pubGuessC": 1,
            "pubGuessD": 7,
            "pubGuessE": 6,
            "pubNumHit": 0,
            "pubNumBlow": 2,
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 123
        }

        try{

          const witness = await circuit.calculateWitness(INPUT, true);
          assert(false);

        }catch(e){
          assert(true)
        }


    });

    it("Circuit should throw an error: public solution hash is incorrect using poseidon with the private inputs even though the number of hits and blows are accurate", async function () {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const INPUT = {
            "pubSolnHash": "1157727679588526826632910333096458056600411126500422373775748430124589368926",
            "pubGuessA": 2,
            "pubGuessB": 3,
            "pubGuessC": 1,
            "pubGuessD": 7,
            "pubGuessE": 6,
            "pubNumHit": 0,
            "pubNumBlow": 3,
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 123
        }

        try{

          const witness = await circuit.calculateWitness(INPUT, true);
          assert(false);

        }catch(e){
          assert(true)
        }


    });

    it("Circuit should throw an error: public solution hash is incorrect using poseidon with the private inputs even though the number of hits and blows are accurate", async function () {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const INPUT = {
            "pubSolnHash": "3157727679588526826632910333096458056600411126500422373775748430124589368926",
            "pubGuessA": 2,
            "pubGuessB": 3,
            "pubGuessC": 1,
            "pubGuessD": 7,
            "pubGuessE": 6,
            "pubNumHit": 0,
            "pubNumBlow": 3,
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 1234
        }

        try{

          const witness = await circuit.calculateWitness(INPUT, true);
          assert(false);

        }catch(e){
          assert(true)
        }


    });


    it("Circuit should throw an error: there are duplicate colors in the breaker's guess", async function () {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const INPUT = {
            "pubSolnHash": "3157727679588526826632910333096458056600411126500422373775748430124589368926",
            "pubGuessA": 2,
            "pubGuessB": 3,
            "pubGuessC": 1,
            "pubGuessD": 6,
            "pubGuessE": 6,
            "pubNumHit": 0,
            "pubNumBlow": 2,
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSolnE": 5,
            "privSalt": 123
        }

        try{

          const witness = await circuit.calculateWitness(INPUT, true);
          assert(false);

        }catch(e){
          assert(true)
        }


    });

});

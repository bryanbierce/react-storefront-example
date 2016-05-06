/*        eslint-env mocha     */
const { expect } = require('chai');
const React = require('react');
const {Map, List} = require('immutable');
const axios = require('axios');
const reducer = require('../client/redux/reducers');
const { getInitialState } = require('./helpers/stateConstructors');


describe('reducer', () => {
  it('should take the state and an action and return a new state', () => {
    expect(reducer({ random: true }, { filler: true })).to.be(true);
  });

  describe('ADD_TO_PRODUCTS_NEXT', () => {
    it('should take a list of products and add it to the productsNext queue', () => {
      const state = getInitialState();
    });

  });

  describe('ADD_TO_PRODUCTS_VIEWING', () => {
    it('should ', () => {

    });
  })

  describe('DONE_LOADING', () => {
    it('should call the doneLoading function', () => {
      const doneLoading = () => true;
      const state = getInitialState();
      const changedState = reducer(state, { type: 'DONE_LOADING' });
      expect(changedState.get('isLoading')).to.equal(false);
    });
  })

  describe('default', () => {
    it("should catch all undefined cases and return state unchanged", () => {
      const state = getInitialState();
      expect(reducer(state, { type: "I_DON'T_DO_ANYTHING"})).to.equal(state);
    });
  });

});

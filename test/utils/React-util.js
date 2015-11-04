import _ from 'lodash';
import {findDOMNode} from 'react-dom';
import {
  createRenderer,
  findAllInRenderedTree,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  isDOMComponent,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
//
// RenderTree
//

/**
 * Render a ReactElement and use helpful test utility methods against it.
 * @param {ReactElement} reactElement The element to render.
 * @returns {RenderedTree}
 */
class RenderedTree {
  constructor(reactElement) {
    this._root = renderIntoDocument(reactElement);
    this.all = findAllInRenderedTree(this._root, _.isObject);
  }

  /**
   * Return all the children of the rendered element.  Excludes the element itself.
   * @returns {ReactElement[]} An array of elements that are children of the rendered element.
   */
  children() {
    return this.all.slice(1);
  }

  /**
   * Find first ReactElement anywhere in the tree with matching className.
   * @param {string} className The className property to search on.
   * @returns {ReactComponent} first React component anywhere in the tree with matching className.
   */
  findClass(className) {
    return findRenderedDOMComponentWithClass(this._root, className);
  }

  /**
   * Find first React element anywhere in the tree with matching html tag.
   * @param {string} elementType The html tag to search on.
   * @returns {ReactComponent} first React component anywhere in the tree with matching html tag.
   */
  findTag(elementType) {
    return findRenderedDOMComponentWithTag(this._root, elementType);
  }

  /**
   * Find first React element anywhere in the tree with matching html tag.
   * @param {ReactComponent} componentClass The ReactComponent tag to search on.
   * @returns {ReactComponent} first React component anywhere in the tree with matching React Element Type.
   */
  findType(componentClass) {
    return findRenderedComponentWithType(this._root, componentClass);
  }

  /**
   * Find first React element in the rendered tree.
   * @returns {ReactComponent} first React component in rendered tree.
   */
  first() {
    return _.first(this.all);
  }

  /**
   * Find last React element in the rendered tree.
   * @returns {ReactComponent} last React component in rendered tree.
   */
  last() {
    return _.last(this.all);
  }

  /**
   * Find all React elements anywhere in the tree with matching className.
   * @param {string} className The className property to search on.
   * @returns {ReactComponent[]} array of React components in the tree with matching className.
   */
  scryClass(className) {
    return scryRenderedDOMComponentsWithClass(this._root, className);
  }

  /**
   * Find all React elements in the tree with matching html tag.
   * @param {string} elementType The html tag to search on.
   * @returns {ReactComponent[]} array of React components in the tree with matching html tag.
   */
  scryTag(elementType) {
    return scryRenderedDOMComponentsWithTag(this._root, elementType);
  }

  /**
   * Find all React elements in the tree with matching html tag.
   * @param {ReactComponent} componentClass The ReactComponent type to search on.
   * @returns {ReactComponent[]} all React components in the tree with matching React Element Type.
   */
  scryType(componentClass) {
    return scryRenderedComponentsWithType(this._root, componentClass);
  }

  /**
   * Expects there to be one result or throws exception if there is any other number of matches besides one.
   * @param {string} text The element containing this text will be returned.
   * @return {boolean} Indicating the text was found.
   */
  assertText(text) {
    const re = new RegExp(text, 'g');
    const first = this.first();
    const textContent = isDOMComponent(first) ? first.textContent : findDOMNode(first).textContent;
    const all = _.words(textContent, re);
    if (all.length !== 1) {
      throw new Error(`Did not find exactly one match (found: ${all.length}) for text: "${text}"`);
    }
    return true;
  }
}

//
// Shallow Renderer
//

/**
 * Shallow render a ReactElement and get the result back.
 * @param {ReactElement} reactElement The element to render.
 * @returns {*} Tree rendered one level deep.
 */
global.shallowRender = (reactElement) => {
  const shallowRenderer = createRenderer();
  shallowRenderer.render(reactElement);
  return shallowRenderer.getRenderOutput();
};

//
// Render
//

/**
 * Render a ReactElement and get back the root DOM node with helper methods to make assertions on.
 * @param {ReactElement|XML} reactElement The element to render.
 * @returns {RenderedTree} RenderedTree test utils.
 */
global.render = (reactElement) => {
  return new RenderedTree(reactElement);
};

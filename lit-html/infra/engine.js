import {render} from '../../lib/lit-html/lit-html.js';

class UiEngine {
  constructor(element, template) {
    this._template = template;
    this._element = element;
  }

  initialRender(state) {
    return new View({ ...state }, this._element, this._template);
  }
}

class View {
  constructor(state, element, template) {
    this._state = Object.freeze(state);
    this._element = element;
    this._template = template;
    render(template(this._state), element);
  }

  update(updater) {
    const newState = { ...this._state };
    updater(newState);
    return new View(newState, this._element, this._template);
  }
}

export { UiEngine };

/**
 * @param {String} el
 * @param {String} classNames
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 * @param  {...array} dataAttr
 */
// dataAttr = [['id', 'name'], ['data-key', 'key']]
export default function create({ el }, { className }, child, parent, dataAttr) {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('unable to create  HTMLElement! Give a proper tag name');
  }

  if (className) element.classList.add(...className.split(' '));

  if (child && Array.isArray(child.child)) {
    child.child.forEach((childElement) => {
      if (childElement && typeof childElement === 'string') {
        element.innerHTML = childElement;
      } else if (childElement) {
        element.appendChild(childElement);
      }
    });
  } else if (child && typeof child.child === 'object' && child.child !== null) {
    element.appendChild(child.child);
  } else if (child && typeof child.child === 'string') {
    element.innerHTML = child.child;
  }

  if (parent && parent.parent !== null) {
    parent.parent.appendChild(element);
  }

  if (dataAttr && dataAttr.dataAttr.length) {
    dataAttr.dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrValue, '');
      } else if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck|for|type|style|src/)) {
        element.setAttribute(attrName, attrValue);
      } else {
        element.dataset[attrName] = attrValue;
      }
    });
  }

  return element;
}

export function computeStyle(className: string, styleName: string) {
  const rootElement = document.createElement('div');
  rootElement.style.display = 'none';

  const element = document.createElement('div');
  element.className = className;
  rootElement.appendChild(element);

  document.body.appendChild(rootElement);

  const computedStyle = window.getComputedStyle(element);
  const result = computedStyle.getPropertyValue(styleName);

  document.body.removeChild(rootElement);

  return result;
}

export function computeNumberStyle(className: string, styleName: string) {
  return parseInt(computeStyle(className, styleName), 10);
}

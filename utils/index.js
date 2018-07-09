export function isSameNodeType( dom, vDom ) {
  if ( typeof vDom === 'string' || typeof vDom === 'number' ) {
    return dom.nodeType === 3;
  }
  
  if ( typeof vDom.type === 'string' ) {
    return dom.nodeName.toLowerCase() === vDom.type.toLowerCase();
  }
  
  return dom && dom._component && dom._component.constructor === vDom.type;
}


export function removeNode(dom) {
  if(dom && dom.parentNode) {
    dom.parentNode.removeChild(dom)
  }
}

export function replaceNode(newDom, old) {
  if(old && old.parentNode) {
    old.parentNode.replaceChild(newDom, old)
  }
}

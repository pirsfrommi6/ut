export default class Header {
  static render() {
    const documentBody = document.getElementById('body');
    const documentHeader = document.createElement('header');
    const documentDiv = document.createElement('div');
    const documentInput = document.createElement('input');
    const documentButton = document.createElement('button');
    documentBody.appendChild(documentHeader);
    documentHeader.appendChild(documentDiv);
    documentDiv.appendChild(documentInput);
    documentDiv.appendChild(documentButton);
    documentHeader.className = 'header';
    documentDiv.className = 'search';
    documentInput.className = 'search-input';
    documentInput.type = 'text';
    documentInput.placeholder = 'Search!';
    documentInput.id = 'headerInput';
    documentButton.className = 'search-button';
    documentButton.type = 'submit';
    documentButton.innerHTML = 'Search!';
    documentButton.id = 'headerButton';
    return documentHeader;
  }
}

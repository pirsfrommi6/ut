export default class Footer {
  static render() {
    const documentBody = document.getElementById('body');
    const documentDiv = document.createElement('div');
    const documentUl = document.createElement('ul');
    documentBody.appendChild(documentDiv);
    documentDiv.appendChild(documentUl);
    documentDiv.className = 'pagination';
    documentUl.className = 'pagination-items';
    documentUl.id = 'pagination';
    Footer.addHtmllLi(documentUl, '1');
    Footer.addHtmllLi(documentUl, '2');
    Footer.addHtmllLi(documentUl, '3');
    Footer.addHtmllLi(documentUl, '4');
    return documentDiv;
  }

  static addHtmllLi(parent, innerHTML) {
    const documentLi = document.createElement('li');
    parent.appendChild(documentLi);
    documentLi.className = 'pagination-item';
    documentLi.innerHTML = innerHTML;
  }
}

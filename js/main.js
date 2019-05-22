export default class Main {
  static renderMain() {
    const documentBody = document.getElementById('body');
    const documentMain = document.createElement('main');
    const documentUl = document.createElement('ul');
    const documentWrapper = document.createElement('div');
    Main.addHtmlTag(documentBody, documentWrapper, 'wrapper');
    Main.addHtmlTag(documentWrapper, documentMain, 'main');
    Main.addHtmlTag(documentMain, documentUl, 'clips');
    documentUl.id = 'mainID';
    documentUl.classList.add('clip-novisibile');
  }

  static renderItem(author, date, description, nameOfClip, imgSrc, urlOfClip) {
    const documentUl = document.getElementById('mainID');
    const documentLi = document.createElement('li');
    const documentDivPreview = document.createElement('div');
    const documentH2 = document.createElement('h2');
    const documentA = document.createElement('a');
    const documentImg = document.createElement('img');
    const documentDivInfo = document.createElement('div');
    const documentPAuthor = document.createElement('p');
    const documentPDate = document.createElement('p');
    const documentPDescription = document.createElement('p');
    Main.addHtmlTag(documentUl, documentLi, 'clip');
    Main.addHtmlTag(documentLi, documentDivPreview, 'clip-preview');
    Main.addHtmlTag(documentDivPreview, documentH2, 'clip-title');
    Main.addHtmlTag(documentH2, documentA, 'clip-link');
    Main.addHtmlTag(documentDivPreview, documentImg, 'clip-img');
    Main.addHtmlTag(documentLi, documentDivInfo, 'clip-info');
    Main.addHtmlTag(documentDivInfo, documentPAuthor, 'clip-author');
    Main.addHtmlTag(documentDivInfo, documentPDate, 'clip-date');
    Main.addHtmlTag(documentLi, documentPDescription, 'clip-description');
    documentPAuthor.innerHTML = author;
    documentPDate.innerHTML = date.slice(0, -14);
    documentPDescription.innerHTML = description;
    documentA.href = urlOfClip;
    documentA.innerHTML = nameOfClip;
    documentImg.src = imgSrc;
    documentImg.width = '320';
  }

  static addHtmlTag(parent, child, className) {
    parent.appendChild(child);
    child.classList.add(className);
  }
}

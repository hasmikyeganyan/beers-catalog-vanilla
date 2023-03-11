const API_URL = 'https://api.punkapi.com/v2/beers';

const loadingEl = document.getElementsByTagName('h2')[0];

const contentEl = document.getElementById('content');

class Beer {
  constructor(id, name, description, imageUrl, firstBrewed) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.firstBrewed = firstBrewed;
  }

  getUrl() {
    return `single.html?id=${this.id}`;
  }
}

const renderBeerItemElement = (beer) => {
  const cardWrapper = document.createElement('a');
  cardWrapper.setAttribute('class', 'card-wrapper');
  cardWrapper.setAttribute('href', beer.getUrl());

  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const img = document.createElement('img');
  img.setAttribute('src', beer.imageUrl);

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  const h4 = document.createElement('h4');
  h4.innerText = beer.name;

  const p = document.createElement('p');
  p.innerText = beer.description;

  const small = document.createElement('small');
  small.innerText = `| ${beer.firstBrewed} | `;

  container.appendChild(h4);
  container.appendChild(p);
  container.appendChild(small);

  card.appendChild(img);
  card.appendChild(container);

  cardWrapper.appendChild(card);

  contentEl.appendChild(cardWrapper);
};

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    loadingEl.innerText = '';
    const beers = data;

    beers.forEach((item) => {
      const beer = new Beer(item.id, item.name, item.description, item.image_url, item.first_brewed);
      renderBeerItemElement(beer);
    });
  })
  .catch((error) => {
    console.log(error);
    alert('Error occured');
  });


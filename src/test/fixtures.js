export const authorsFixture = [
  {
    id: 1,
    name: 'Gabriel',
    surname: 'Garcia Marquez',
    nationality: 'Colombiana',
    birthYear: 1927,
    alive: false,
    image: '',
  },
  {
    id: 2,
    name: 'George',
    surname: 'Orwell',
    nationality: 'Britanica',
    birthYear: 1903,
    alive: false,
    image: 'https://example.com/george-orwell.jpg',
  },
]

export const booksFixture = [
  {
    id: 1,
    title: 'Cien anos de soledad',
    isbn: '9780307474728',
    publicationYear: 1967,
    image: '',
    author: authorsFixture[0],
  },
  {
    id: 2,
    title: '1984',
    isbn: '9780451524935',
    publicationYear: 1949,
    image: 'https://example.com/1984.jpg',
    author: authorsFixture[1],
  },
]

export const authorDetailFixture = {
  id: 7,
  name: 'Isabel',
  surname: 'Allende',
  nationality: 'Chilena',
  birthYear: 1942,
  alive: true,
  image: 'https://example.com/isabel.jpg',
}

export const bookDetailFixture = {
  id: 8,
  title: 'La casa de los espiritus',
  isbn: '9780553383805',
  publicationYear: 1982,
  image: 'https://example.com/casa.jpg',
  author: {
    id: 7,
    name: 'Isabel',
    surname: 'Allende',
  },
}

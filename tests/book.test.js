/* tests/book.test.js */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Brief Answers To The Big Questions',
          // author: 'Stephen Hawking',
          // genre: 'Autobiography',
          ISBN: '9781473695993',
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal(
          'Brief Answers To The Big Questions'
        );
        // expect(newBookRecord.author).to.equal('Stephen Hawking');
        // expect(newBookRecord.genre).to.equal('Autobiography');
        expect(newBookRecord.ISBN).to.equal('9781473695993');
      });

      it('return 400 and validation error message if it does not pass the validation', async () => {
        const response = await request(app).post('/books').send({
          title: '',
          author: '',
        });

        const newBook = await Book.findByPk(response.body.id, { raw: true });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        // expect(newBook).to.equal(null);
      });
    });
  });
});

describe('with records in the database', () => {
  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  let books;
  beforeEach(async () => {
    books = await Promise.all([
      Book.create({
        title: 'Brief Answers To The Big Questions',
        // author: 'Stephen Hawking',
        // genre: 'Autobiography',
        ISBN: '9781473695993',
      }),
      Book.create({
        title: 'The courage to be disliked',
        // author: 'Ichiro Kishimi and Fumitake Koga',
        // genre: 'Psychoanalysis',
        ISBN: '9781501197277',
      }),
      Book.create({
        title: 'Why Has Nobody Told Me This Before?',
        // author: 'Julie Smith',
        // genre: 'Self-help',
        ISBN: '9780241529713',
      }),
    ]);
  });

  describe('GET /books', () => {
    it('gets all books records', async () => {
      const response = await request(app).get('/books');

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((book) => {
        const expected = books.find((a) => a.id === book.id);

        expect(book.title).to.equal(expected.title);
        // expect(book.author).to.equal(expected.author);
        // expect(book.genre).to.equal(expected.genre);
        expect(book.ISBN).to.equal(expected.ISBN);
      });
    });
  });

  describe('gets books record by id', () => {
    it('gets books record by id', async () => {
      const book = books[0];
      const response = await request(app).get(`/books/${book.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal(book.title);
      // expect(response.body.author).to.equal(book.author);
      // expect(response.body.genre).to.equal(book.genre);
      expect(response.body.ISBN).to.equal(book.ISBN);
    });

    it('returns a 404 if the reader does not exist', async () => {
      const response = await request(app).get(`/books/12345`);

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The book could not be found.');
    });
  });

  describe('PATCH /books/:id', () => {
    it('updates books ISBN by id', async () => {
      const book = books[0];
      const response = await request(app)
        .patch(`/books/${book.id}`)
        .send({ ISBN: '9837403842' });

      const updatedBookRecord = await Book.findByPk(book.id, { raw: true });

      expect(response.status).to.equal(200);
      expect(updatedBookRecord.ISBN).to.equal('9837403842');
    });

    it('returns a 404 if the book does not exist', async () => {
      const response = await request(app)
        .patch(`/books/12345`)
        .send({ ISBN: '9837403842' });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The book could not be found.');
    });
  });

  describe('DELETE /books/:id', () => {
    it('deletes book record by id', async () => {
      const book = books[0];
      const response = await request(app).delete(`/books/${book.id}`);

      const deletedBook = await Book.findByPk(book.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedBook).to.equal(null);
    });

    it('returns a 404 if the book does not exist', async () => {
      const response = await request(app).delete('/books/12345');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The book could not be found.');
    });
  });
});

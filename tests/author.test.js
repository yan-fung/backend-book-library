const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe('/authors', () => {
  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });
  describe('with no author in the database', () => {
    describe('POST /authors', () => {
      it('creates a new author in the database', async () => {
        const response = await request(app).post('/authors').send({
          author: 'Anne Boden',
        });

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(newAuthorRecord.author).to.equal('Anne Boden');
      });

      it('return a 400 and error message if it does not pass the validation.', async () => {
        const response = await request(app).post('/authors').send({
          author: '',
        });
        const newAuthor = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthor).to.equal(null);
      });
    });
  });
});

describe('with records in the database', () => {
  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  let authors;
  beforeEach(async () => {
    authors = await Promise.all([
      Author.create({
        author: 'Stephen Hawking',
      }),
      Author.create({
        author: 'Ichiro Kishimi and Fumitake Koga',
      }),
      Author.create({
        author: 'Julie Smith',
      }),
    ]);
  });

  describe('GET /authors', () => {
    it('gets all author records', async () => {
      const response = await request(app).get('/authors');

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((author) => {
        const expected = authors.find((a) => a.id === author.id);

        expect(author.author).to.equal(expected.author);
      });
    });
  });

  describe('gets author record by id', () => {
    it('get author record by id', async () => {
      const author = authors[0];
      const response = await request(app).get(`/authors/${author.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.author).to.equal('Stephen Hawking');
    });

    it('return 404 if the author does not exist', async () => {
      const response = await request(app).get('/authors/12345');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The author could not be found.');
    });
  });

  describe('PATCH /authors/:id', () => {
    it('update author record by id', async () => {
      const author = authors[0];
      const response = await request(app).patch(`/authors/${author.id}`).send({
        author: 'Eileen Chang',
      });

      const updatedAuthorRecord = await Author.findByPk(author.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedAuthorRecord.author).to.equal('Eileen Chang');
    });

    it('return 404 if the author does not exist', async () => {
      const response = await request(app).patch('/authors/12345').send({
        author: 'Eileen Chang',
      });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The author could not be found.');
    });
  });

  describe('DELETE /authors/:id', () => {
    it('delete author record by id', async () => {
      const author = authors[0];
      const response = await request(app).delete(`/authors/${author.id}`);

      const updatedAuthorRecord = await Author.findByPk(author.id, {
        raw: true,
      });

      expect(response.status).to.equal(204);
      expect(updatedAuthorRecord).to.equal(null);
    });

    it('return 404 if the author does not exist', async () => {
      const response = await request(app).delete('/authors/12345');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The author could not be found.');
    });
  });
});

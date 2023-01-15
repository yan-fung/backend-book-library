const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');

describe('/genres', () => {
  before(async () => Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /genres', () => {
      it('create a new genre in the database', async () => {
        const response = await request(app).post('/genres').send({
          genre: 'Biography',
        });

        const newGenre = await Genre.findByPk(response.body.id, { raw: true });

        expect(response.status).to.equal(201);
        expect(newGenre.genre).to.equal('Biography');
      });

      it('return 400 and validation error message if it does not pass the validation', async () => {
        const response = await request(app).post('/genres').send({
          genre: '',
        });

        const newGenre = await Genre.findByPk(response.body.id, { raw: true });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newGenre).to.equal(null);
      });
    });
  });
});

describe('with records in the database', () => {
  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  let genres;
  beforeEach(async () => {
    genres = await Promise.all([
      Genre.create({
        genre: 'Autobiography',
      }),
      Genre.create({
        genre: 'Psychoanalysis',
      }),
      Genre.create({
        genre: 'Self-help',
      }),
    ]);
  });

  describe('GET /genres', () => {
    it('gets all genre records', async () => {
      const response = await request(app).get('/genres');

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((genre) => {
        const expected = genres.find((a) => a.id === genre.id);

        expect(genre.genre).to.equal(expected.genre);
      });
    });
  });

  describe('get genre record by id', () => {
    it('get genre record by id', async () => {
      const genre = genres[0];
      const response = await request(app).get(`/genres/${genre.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.genre).to.equal('Autobiography');
    });

    it('return a 404 if the genre does not exist', async () => {
      const response = await request(app).get('/genres/12345');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The genre could not be found.');
    });
  });

  describe('PATCH /genres/:id', () => {
    it('updates genre by id', async () => {
      const genre = genres[0];
      const response = await request(app)
        .patch(`/genres/${genre.id}`)
        .send({ genre: 'Mystery' });

      const newGenreRecord = await Genre.findByPk(genre.id, { raw: true });

      expect(response.status).to.equal(200);
      expect(newGenreRecord.genre).to.equal('Mystery');
    });

    it('returns a 404 if the genre does not exist', async () => {
      const response = await request(app).patch('/genres/12345').send({
        genre: 'Fiction',
      });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The genre could not be found.');
    });
  });

  describe('DELETE /genres/:id', () => {
    it('deletes genre record by id', async () => {
      const genre = genres[0];
      const response = await request(app).delete(`/genres/${genre.id}`);

      const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedGenre).to.equal(null);
    });

    it('returns a 404 if the genre does not exist.', async () => {
      const response = await request(app).delete('/genres/12345');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('The genre could not be found.');
    });
  });
});

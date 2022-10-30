const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model')
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({_id: '5d9f1140f10a81216cfd4408', day: 1, performer: 'performer1', genre: 'genre1', price: 10, image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertOne.save();
        const testConcertTwo = new Concert({day: 1, performer: 'performer1', genre: 'genre1', price: 15, image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertTwo.save();
        const testConcertThree = new Concert({day: 1, performer: 'performer3', genre: 'genre1', price: 20, image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertThree.save();
        const testConcertFour = new Concert({day: 2, performer: 'performer4', genre: 'genre2', price: 25, image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertFour.save();
    });
    after(async () => {
        await Concert.deleteMany();
    });
    it('should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(4);
    });

    it(':id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.performer).to.be.equal('performer1');
    });

    it('random should return one random concert', async () => {
        const res = await request(server).get('/api/concerts/random');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('should return concerts selected by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/performer1')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    })
    it('should return concerts selected by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/genre1')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    })
    it('should return concerts in a price range', async () => {
        const res = await request(server).get('/api/concerts/price/19/21')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
        const resSecond = await request(server).get('/api/concerts/price/5/30')
        expect(resSecond.status).to.be.equal(200);
        expect(resSecond.body).to.be.an('array');
        expect(resSecond.body.length).to.be.equal(4);
    })
    it('should return error when non of the concerts match the range', async () => {
        const res = await request(server).get('/api/concerts/price/40/60')
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Not found');
    })
    it('should return concerts in specified day', async () => {
        const res = await request(server).get('/api/concerts/day/1')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
        const resSecond = await request(server).get('/api/concerts/day/2')
        expect(resSecond.status).to.be.equal(200);
        expect(resSecond.body).to.be.an('array');
        expect(resSecond.body.length).to.be.equal(1);
    })
    it('should return error in specified day not exist', async () => {
        const resSecond = await request(server).get('/api/concerts/day/7')
        expect(resSecond.status).to.be.equal(404);
        expect(resSecond.body).to.be.an('object');
        expect(resSecond.body.message).to.be.equal('Not found');
    });
});

const chai = require('chai');

const chaiHttp = require('chai-http');

const request = require('request');

const sinon = require('sinon');



const base = 'http://localhost:8000';

chai.use(chaiHttp);
chai.should();

describe('Categories Part', () => {
    beforeEach(() => {
        this.get = sinon.stub(request, 'get');
        this.post = sinon.stub(request, 'post');
    });

    afterEach(() => {
        request.get.restore();
        request.post.restore();
    });
    it('It should add category if not exist', (done) => {
        const postResponse = {
            res: {
                statusCode: 201,
                headers: {
                    'content-type': 'application/json',
                },
            },
            body: { message: 'category added' },
        };
        const options = {
            body: {
                name: 'Reels',
            },
            json: true,
            url: `${base}/add-category`,
        };

        this.post.yields(null, postResponse.res, JSON.stringify(postResponse.body));

        request.post(options, (err, res, body) => {
            res.statusCode.should.equal(201);
            res.headers['content-type'].should.contain('application/json');
            // eslint-disable-next-line no-param-reassign
            body = JSON.parse(body);
            body.message.should.eql('category added');

            done();
        });
    });

    const responseObject = {
        statusCode: 201,
        headers: {
            'content-type': 'application/json',
        },
    };
    const responseBody = [{
            id: 20,
            name: 'MOVIE TRAILER',
            tag: 'movie-trailer',
            createdAt: '2021-12-11T03:18:20.854Z',
            updatedAt: '2021-12-11T03:18:20.854Z',
        },
        {
            id: 21,
            name: 'FUNNY',
            tag: 'funny',
            createdAt: '2021-12-11T14:19:48.712Z',
            updatedAt: '2021-12-11T14:19:48.712Z',
        },
        {
            id: 22,
            name: 'TIK TOK',
            tag: 'tik-tok',
            createdAt: '2021-12-21T07:00:17.692Z',
            updatedAt: '2021-12-21T07:00:17.692Z',
        },
    ];

    describe('GET /all-category', () => {
        it('It should show all the category', (done) => {
            this.get.yields(null, responseObject, JSON.stringify(responseBody));

            request.get(`${base}/api/all-category`, (err, res, body) => {
                res.headers['content-type'].should.contain('application/json');
                body = JSON.parse(body);
                body.length.should.eql(3);
                body[0].should.include.keys(
                    'id',
                    'name',
                    'tag',
                    'createdAt',
                    'updatedAt'
                );

                done();
            });
        });
    });
});
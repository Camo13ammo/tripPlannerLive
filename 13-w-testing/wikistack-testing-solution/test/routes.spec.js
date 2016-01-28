var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app)
var Page = require('../models').Page;
var chai = require('chai');
var expect = chai.expect;
var User = require('../models').User;
var Bluebird = require('bluebird');


describe('http requests', function() {

    afterEach(function (done) {
      Bluebird.all([
        Page.remove({}), 
        User.remove({})
      ])
      .then(function(){
        done()
      })
      .then(null, function(err){
        done(err)
      })
    });

    beforeEach(function (done) {
      Page.create({
          title: 'Nimit Maru',
          content: '1601 is the best',
          tags: ['fullstack']
      }).then(function () {
          done();
      }, done);
    });

    describe('GET /', function() {
      it('gets 200', function (done) {
        agent
        .get('/')
        .expect(200, done);
      });
    });

    describe('GET /wiki/add', function() {
      it('gets 200', function (done) {
        agent
          .get('/wiki/add')
          .expect(200, done);
      });
    });


    describe('GET /wiki/:urlTitle', function() {
      it('gets 404 on page that doesnt exist', function (done) {
        agent
        .get('/wiki/This_Doesnt_Exist')
        .expect(404, done);
      });
      it('gets 200 on page that does exist', function (done) {
        agent
        .get('/wiki/Nimit_Maru')
        .expect(200, done);
      });
    });

    describe('GET /wiki/search', function() {
      it('gets 200', function (done) {
        agent
        .get('/wiki/search?search=javascript')
        .expect(200, done);
      });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
      it('gets 404 for page that doesn\'t exist', function (done) {
        agent
        .get('/wiki/Doesnt_Exist/similar')
        .expect(404, done);
      });

      it('gets 200 for similar page', function (done) {
        agent
          .get('/wiki/Nimit_Maru/similar')
          .expect(200, done);
      });
    });


    describe('POST /wiki', function() {
      it('creates a page in db', function (done) {
        agent
        .post('/wiki')
        .send({
            title: '1601', 
            content: '1601', 
            name: '1601', 
            email: '1601@1601.1601', 
            tags: '1601'
        })
        .end(function (err, response) {
            if (err) return done(err);
            // MUST ACCESS REPONSE IN END VIA BODY PROPERTY
            expect(response.body.title).to.equal('1601')
            done()
        });

      });
    });
});
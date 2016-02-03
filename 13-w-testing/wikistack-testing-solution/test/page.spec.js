
var chai = require('chai');
chai.should();
var expect = chai.expect;
var chaiThings = require('chai-things');
chai.use(chaiThings);
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)
var models = require('../models');
var Page = models.Page;

describe('Page model', function() {

    afterEach(function (done) {
      Page.remove({}).then(function () {
          done();
      }, done);
    });

    describe('Validations', function() {

      var page;
      beforeEach(function () {
          page = new Page();
      });

      it('errors without title', function (done) {
        page.validate(function (err) {
          err.errors.title.should.be.an('object')
          done();
        });
      });

      it('errors without content', function (done) {
        page.validate(function (err) {
          expect(err.errors.content).to.be.an('object');
          done();
        });
      });

    });

    describe('Statics', function() {

        beforeEach('Create a page and save it', function () {
          var page1; 

          return Page.create({
              title: 'Javascript',
              content: 'Is real cool',
              tags: ['javascript']
          })
          .then(function(page){
              page1 = page;
          })
        });

        describe('findByTag', function() {
          it('gets pages with the search tag', function () {
             return Page.findByTag('javascript').should.eventually.have.length(1)
                   // Page.findByTag('javascript')
                   // .then(function (pages) {
                   //      expect(pages.length).to.be.equal(1);
                   //      done();
                   //  }).then(null, done);
          });


          it('does not get pages without the search tag', function () {
            return Page.findByTag('meerrrrrrr').should.eventually.have.length(0)


                // Page.findByTag('falafel').then(function (pages) {
                //     expect(pages.length).to.be.equal(0);
                //     done();
                // }).then(null, done);
          });
        });
    });

    describe('Methods', function() {

        var cohortPage;
        beforeEach(function () {
            return Page.create([
                {
                    title: '1511',
                    content: 'Awesome 36 people',
                    tags: ['fullstack','javascript']
                },
                {
                    title: 'Nugget',
                    content: 'Joe\'s mom\'s dog',
                    tags: ['joe', 'dogs']
                },
                {
                    title: 'Nimit Maru',
                    content: 'Javascript wizard',
                    tags: ['fullstack', 'nimit']
                }
            ]).then(function (pages) {
                cohortPage = pages[0];
            });

        });

        describe('findSimilar', function() {
            it('never gets itself', function () {
                return cohortPage.findSimilar().should.eventually.contain.an.item.with.property('title', 'Nimit Maru');
            
                //    cohortPage.findSimilar().then(function (otherPages) {
                //     otherPages.should.not.contain.an.item.with.property('title', 'Nimit Maru');
                //     done();
                // }).then(null, done);
            });
            it('gets other pages with any common tags', function (done) {
                cohortPage.findSimilar().then(function (otherPages) {
                    otherPages.should.contain.an.item.with.property('title', 'Nimit Maru');
                    done();
                }).then(null, done);
            });
            it('does not get other pages without any common tags', function (done) {
                cohortPage.findSimilar().then(function (otherPages) {
                    otherPages.should.not.contain.an.item.with.property('title', 'Nugget');
                    done();
                }).then(null, done);
            });
        });
    });


    describe('Virtuals', function() {

        var fullstackPage;
        beforeEach(function (done) {
            Page.create({
                title: 'Fullstack Academy',
                content: 'A bootcamp for Javascript'
            }).then(function (createdPage) {
                fullstackPage = createdPage;
                done();
            }, done);
        });

        describe('route', function() {
            it('returns the url_name prepended by "/wiki/"', function () {
                expect(fullstackPage.route).to.be.equal('/wiki/Fullstack_Academy');
            });
        });
    });

    describe('Hooks', function() {

        var fullStackPage;
        beforeEach(function () {
            fullStackPage = new Page({
                title: 'Fullstack Academy',
                content: 'A bootcamp'
            });
        });

        it('sets urlTitle based on title before validating', function (done) {
            fullStackPage.validate().then(function () {
                expect(fullStackPage.urlTitle).to.be.equal('Fullstack_Academy');
                done();
            }).then(null, done);

        });


    });

});
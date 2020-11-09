var assert = require('chai').assert;
var VideoStore = require('./video-store.js');
var FilmFan = require('./film-fan.js');

describe('Video Store', function() {
  it.skip('should be a function', function() {
    assert.isFunction(VideoStore);
  });

  it.skip('should have a name', function() {
    var videoStore1 = new VideoStore({name:'Blockbuster'});
    var videoStore2 = new VideoStore({name:'Redbox'});
    assert.equal(videoStore1.name, 'Blockbuster');
    assert.equal(videoStore2.name, 'Redbox');
  })

  it.skip('should have late fees', function() {
    var videoStore1 = new VideoStore({name:'Blockbuster'});

    assert.equal(videoStore1.hasLateFees, true);
  })

  it.skip('should have a list of movie genres', function() {
    var genres1 = ['horror', 'comedy', 'nerd']
    var genres2 = ['anime', 'comedy', 'documentary', 'drama']

    var videoStore1 = new VideoStore({name: 'Blockbuster', genres: genres1});
    var videoStore2 = new VideoStore({name: 'Redbox', genres: genres2});
    assert.deepEqual(videoStore1.genres, genres1);
    assert.deepEqual(videoStore2.genres, genres2);
  })
  
  it.skip('should start with an empty array of movies checked out', function() {
    var genres1 = ['horror', 'comedy', 'nerd']
    var videoStore1 = new VideoStore({name: 'Blockbuster', genres: genres1});
    assert.deepEqual(videoStore1.moviesOut, []);
  })

  it.skip('should have hours', function() {
    var genres1 = ['horror', 'comedy', 'nerd']

    var videoStore1 = new VideoStore({name: 'Blockbuster', genres: genres1, openTime: 0800, closeTime: 1700});

    assert.equal(videoStore1.openTime, 0800);
    assert.equal(videoStore1.closeTime, 1700);
  })

  it.skip('should be able to tell us if it is openTime when given a time', function() {
    var genres1 = ['horror', 'comedy', 'nerd']
    var videoStore1 = new VideoStore({name: 'Blockbuster', genres: genres1, openTime: 0800, closeTime: 1700});

    assert.equal(videoStore1.checkIfOpenAt(1000), true)
    assert.equal(videoStore1.checkIfOpenAt(0200), false)
  })
})

describe('FilmFan', function() {
  it.skip('should have a name', function() {
    var filmFan1 = new FilmFan({name: 'Cam'});
    var filmFan2 = new FilmFan({name: 'Martin Scorsese'})

    assert.equal(filmFan1.name, 'Cam');
    assert.equal(filmFan2.name, 'Martin Scorsese');
  })

  it.skip('should have genres they like', function() {
    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']
    var martinsGenres = ['drama', 'overly long', 'boston accents', 'comic books']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});
    var filmFan2 = new FilmFan({name: 'Martin Scorsese', genres: martinsGenres})

    assert.equal(filmFan1.genres, camsGenres);
    assert.equal(filmFan2.genres, martinsGenres);
  })

  it.skip('should be picky if they like fewer than four genres', function() {
    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']
    var martinsGenres = ['drama', 'overly long', 'boston accents', 'comic books']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});
    var filmFan2 = new FilmFan({name: 'Martin Scorsese', genres: martinsGenres})

    assert.equal(filmFan1.isPicky, true);
    assert.equal(filmFan2.isPicky, false);
  })

  it.skip('should hate late fees', function() {
    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});

    assert.equal(filmFan1.hatesLateFees, true);
  })

  it.skip('should start off with no rentals', function() {
    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});

    assert.deepEqual(filmFan1.rentals, []);
  })

  it.skip('should be able to look at a video store and see if it has at least one genre they like', function() {
    var genres1 = ['horror', 'comedy', 'nerd']
    var genres2 = ['anime', 'comedy', 'documentary', 'drama']

    var videoStore1 = new VideoStore({name: 'Blockbuster', genres: genres1});
    var videoStore2 = new VideoStore({name: 'Redbox', genres: genres2});

    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});

    assert.equal(filmFan1.likesThisStore(videoStore1), 'Yeah, I totally like Blockbuster\'s selection');
    assert.equal(filmFan1.likesThisStore(videoStore2), 'Uh no, I wouldn\'t be caught dead at Redbox');
  })

  it.skip('should be able to check out movies, and keep track of who rented what', function() {
    var genres = ['anime', 'comedy', 'documentary', 'drama']

    var videoStore = new VideoStore({name: 'Blockbuster', genres: genres});

    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']
    var martinsGenres = ['drama', 'overly long', 'boston accents', 'comic books']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});
    var filmFan2 = new FilmFan({name: 'Martin Scorsese', genres: martinsGenres})

    filmFan1.checkOutMovie('thomas goes to the gym', videoStore)
    filmFan2.checkOutMovie('iron man 2', videoStore)

    assert.deepEqual(filmFan1.rentals, ['thomas goes to the gym'])
    assert.deepEqual(filmFan2.rentals, ['iron man 2'])

    assert.deepEqual(videoStore.moviesOut, [
      {
        name: 'thomas goes to the gym',
        renter: 'Cam',
      },
      {
        name: 'iron man 2',
        renter: 'Martin Scorsese',
      }
    ])
  })

  it.skip('should be able to return a movie', function() {
    var genres = ['anime', 'comedy', 'documentary', 'drama']

    var videoStore = new VideoStore({name: 'Blockbuster', genres: genres});

    var camsGenres = ['horror', 'nerd', 'thomas the tank engine']
    var martinsGenres = ['drama', 'overly long', 'boston accents', 'comic books']

    var filmFan1 = new FilmFan({name: 'Cam', genres: camsGenres});
    var filmFan2 = new FilmFan({name: 'Martin Scorsese', genres: martinsGenres})

    filmFan1.checkOutMovie('thomas goes to the gym', videoStore)
    filmFan2.checkOutMovie('iron man 2', videoStore)

    assert.deepEqual(filmFan1.rentals, ['thomas goes to the gym'])
    assert.deepEqual(videoStore.moviesOut, [
      {
        name: 'thomas goes to the gym',
        renter: 'Cam',
      },
      {
        name: 'iron man 2',
        renter: 'Martin Scorsese',
      }
    ])

    filmFan1.returnMovie('thomas goes to the gym', videoStore)

    assert.deepEqual(filmFan1.rentals, [])
    assert.deepEqual(videoStore.moviesOut, [
      {
        name: 'iron man 2',
        renter: 'Martin Scorsese',
      }
    ])
  })
})
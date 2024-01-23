const createError = require('http-errors')
const uuid = require('uuid');
const beers = []
const jokeAPIKEY = process.env.JOKES_KEY;
console.log(jokeAPIKEY)
//API code
const axios = require('axios');




const getRandom = async () => {
    
  const options = {
    method: 'GET',
    url: 'https://dad-jokes.p.rapidapi.com/random/joke/png',
  headers: {
    'X-RapidAPI-Key': jokeAPIKEY,
    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    // const beerJokes = response.filter(x => x.body.data.type === 'drug')
    return `${response.data.body.setup} ${response.data.body.punchline}`;
  } catch (error) {
    throw error;
  }
  
};


//API code





exports.getAllBeers =(req, res, next) => {
    
    res.send(beers)
}

exports.createBeer = async (req, res, next) => {
    const isMissingInformation = !req.body.name || !req.body.type || !req.body.alcohol || !req.body.origin || !req.body.rating;
    if (isMissingInformation) return next(createError(400, 'Please fill out all of the fields.'));
  
    const beerId = uuid.v4();
    req.body.id = beerId;
  
    try {
      // Call the getRandom function to get a random beer
      const randomBeer = await getRandom();
  
      // Add the random beer data to the beers array
      beers.push({ ...req.body, random_joke: randomBeer });
  
      // Send the updated beers array in the response
      res.send(beers);
    } catch (error) {
      next(createError(500, 'Error creating beer.'));
    }
  };

exports.deleteBeer = (req, res, next) => {
    const beerId = String(req.params.id);
    const beerIndex = beers.findIndex(beer => beer.id === beerId)
    console.log(beerIndex)
    if (beerIndex === -1) return next(createError(404, 'Beer not found.'))
    beers.splice(beerIndex, 1),
    res.send(beers)
}

exports.editBeer = (req, res, next) => {
    const beerId = String(req.params.id);
    const beerIndex = beers.findIndex(beer => beer.id === beerId)
   
    if (beerIndex === -1) return next(createError(404, 'Beer not found.'))

    const updatedBeer = {
        name: req.body.name || beers[beerIndex].name,
        type: req.body.type || beers[beerIndex].type,
        alcohol: req.body.alcohol || beers[beerIndex].alcohol,
        origin: req.body.origin || beers[beerIndex].origin,
        rating: req.body.rating || beers[beerIndex].rating,
        id: beerId,
        
    };
    beers[beerIndex] = updatedBeer;
    res.send(beers)
}

exports.findBeer = (req, res, next) => {
    const beerId = String(req.params.id);
    const beerIndex = beers.findIndex(beer => beer.id === beerId);

    const beerName = String(req.params.name).toLowerCase();
    const beerN = beers.find(beer => beer.name.toLowerCase() === beerName);

    const beerType = String(req.params.type).toLowerCase();
    const beerT = beers.find(beer => beer.type.toLowerCase() === beerType);

    const beerOrigin = String(req.params.origin).toLowerCase();
    const beerO = beers.find(beer => beer.origin.toLowerCase() === beerOrigin);
    
    const beerAlcohol = String(req.params.alcohol).toLowerCase();
    const beerA = beers.find(beer => beer.alcohol.toLowerCase() === beerAlcohol)

    const beerRating = String(req.params.rating).toLowerCase();
    const beerR = beers.find(beer => beer.rating.toLowerCase() === beerRating)
    
    const filteredBeers = beers.filter (beer => {
        return (
            beer.name.toLowerCase() === beerName || beer.type.toLowerCase() === beerType || beer.origin.toLowerCase() === beerOrigin || beer.alcohol.toLowerCase() === beerAlcohol || beer.rating.toLowerCase() === beerRating)});

    
    if (filteredBeers.length === 0) {
        return next(createError(404, 'Cannot find the beer.'));
    }


    res.send(filteredBeers)
};





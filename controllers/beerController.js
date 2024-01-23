const createError = require('http-errors')
const uuid = require('uuid');
const beers = []

//API code
const axios = require('axios');

const getRandom = async () => {
  const options = {
    method: 'GET',
    url: 'https://beers-list.p.rapidapi.com/beers/italy',
    headers: {
        'X-RapidAPI-Key': '430d779416msh14041268c4b055ap189d6fjsnc7968c742819',
        'X-RapidAPI-Host': 'beers-list.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};


//API code




exports.getAllBeers =(req, res, next) => {
    res.send(beers)
}

exports.createBeer = (req, res, next) => {
    // if (req.headers?.secretstring !== 'password123') return next(createError(401, 'You are not authorised to create a beer'))
    const isMissingInformation = !req.body.name || !req.body.type || !req.body.alcohol || !req.body.origin || !req.body.rating
    if (isMissingInformation) return next(createError(400, 'Please fill out all of the fields.'));

    const beerId = uuid.v4();
    req.body.id = beerId;
    // const beerJoke = getBeerJoke()

    beers.push(req.body)
    res.send(beers)
}

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

    // Choose the beer based on the first match found
    // const foundBeer = beerIndex !== -1 ? beers[beerIndex] : beerN || beerT || beerO || beerA || beerR

    res.send(filteredBeers)
};




// axios.post("http://localhostL3000/create", {
//     name: "Learn Node",
//     type: "2021-12-31",
//     alcohol "Easy"
//      
// })



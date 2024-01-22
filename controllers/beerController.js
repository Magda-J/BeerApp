const createError = require('http-errors')
const uuid = require('uuid');
const beers = []

exports.getAllBeers =(req, res, next) => {
    res.send(beers)
}

exports.createBeer = (req, res, next) => {
    // if (req.headers?.secretstring !== 'password123') return next(createError(401, 'You are not authorised to create a beer'))
    const isMissingInformation = !req.body.name || !req.body.type || !req.body.alcohol || !req.body.origin || !req.body.rating
    if (isMissingInformation) return next(createError(400, 'Please fill out all of the fields.'));

    const beerId = uuid.v4();
    req.body.id = beerId;
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
    console.log(beerIndex);

    if (beerIndex === -1) {
    return next(createError(404, 'Beer not found 2.'))
    }
    const foundBeer = beers[beerIndex]
    res.send(foundBeer);
};

// axios.post("http://localhostL3000/create", {
//     name: "Learn Node",
//     type: "2021-12-31",
//     alcohol "Easy"
//      
// })



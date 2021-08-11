var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require("../middleware/checkAuth");

/* GET home page. */
router.get('/', ensureAuthenticated, async function  (req, res, next) {
  const gallery = await req.app.locals.db.find({status: "A"}).toArray() 
  res.render('index', { title: 'Gallery', gallery, hero: gallery[0], user: req.user.username}); 
});
router.get('/purchase', ensureAuthenticated, async function  (req, res, next) {
  const gallery = await req.app.locals.db.find({}).toArray() 
  res.render('purchase', { title: 'Purchase', gallery, hero: gallery[0], user: req.user.username}); 
});
router.post('/purchase', ensureAuthenticated, async function  (req, res, next) {
  await req.app.locals.db.update({filename: req.body.selectedName},  {$set: {
    status: "S"
   }})
  const gallery = await req.app.locals.db.find({}).toArray()
  res.render('purchase', { title: 'Purchase', gallery, hero: gallery[0], user: req.user.username}); 
});

router.post('/image', ensureAuthenticated, async function  (req, res, next) {
  const gallery = await req.app.locals.db.find({}).toArray()
  const hero = await req.app.locals.db.find({filename: req.body['selectedName']}).toArray()
  res.render('index', { title: 'Gallery', gallery, hero: hero[0], user: req.user.username}); 
});

module.exports = router;
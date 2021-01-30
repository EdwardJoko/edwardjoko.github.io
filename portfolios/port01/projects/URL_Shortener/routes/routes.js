const express = require('express');
const router  = express.Router();

const Url    = require('../models/Url');
const Clicks = require('../models/helloClick');

router.get('/', async (req, res) => {
  const Urls   = await Url.find();
  const clicks = await Clicks.findOne({ short: "hello" });

  res.render('index', { Urls: Urls, Clicks: clicks });
});

router.post('/shortUrls', async (req, res) => {
  await Url.create({ full: req.body.fullUrl });

  res.redirect('/');
});

router.get('/hello', async (req, res) => {
  const clicks = await Clicks.findOne({ short: "hello" });
  
  clicks.clicks++;
  clicks.save();

  res.render('hello');
});

router.get('/:shortUrl', async (req, res) => {
  const shrinkedUrl = await Url.findOne({ short: req.params.shortUrl });
  if (shrinkedUrl !== null) {
    shrinkedUrl.clicks++;
    shrinkedUrl.save();
    
    res.redirect(shrinkedUrl.full);
  } else {
    res.render('404');
  }
});

module.exports = router;

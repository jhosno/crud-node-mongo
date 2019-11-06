const {
  Router
} = require('express');

const router = Router();

//index page
router.get('/', (req, res) => {
  res.render('index.ejs', {
    title: 'Home'
  });
});

//New entry
router.post('/add', (req, res) => {
  res.send('done!');
  console.log(req);
})

//404 handle 
router.use((req, res, next) => {
  res.status(404).send('error: 404');
})


module.exports = router
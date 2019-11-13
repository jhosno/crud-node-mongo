const {
  Router
} = require('express');

const router = Router();
const Task = require('../models/task')

//index page
//57mins -> muesta datos de mongoDB 
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index.ejs', {
    title: 'Home',
    action: 'Nueva tarea',
    task: false,
    tasks
  });
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id)
  res.render('edit.ejs', {
    title: 'Editar',
    action : 'Editar nota',
    task
  })
});

router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  await Task.update({_id : id}, req.body);
  res.redirect('/');
});

router.get('/change/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  task.save();
  res.redirect('/');
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Task.deleteOne({ _id : id });
  res.redirect('/');
});

//New entry
//async 
router.post('/add', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/')
})

//404 handle 
router.use((req, res, next) => {
  res.status(404).send('error: 404');
})


module.exports = router
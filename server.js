const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const dal = require('./dal');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (req, res) =>{
  const robots = dal.getRobots();
  console.log('robots', robots);
  res.render('home', {robots, robots});
});

app.get('/:id', (req, res) =>{
  const robot = dal.getRobot(parseInt(req.params.id, 10));
  res.render("profile", robot);
})

app.get('/robots/unemployed', (req,res)=>{
  const unemployedRobots = dal.getUnemployed();
  console.log('unemployedRobots', unemployedRobots)
  res.render('unemployed', {unemployedRobots, unemployedRobots});
})

app.get('/robots/employed',(res, req)=>{
  const employedRobots = dal.getEmployed();
  console.log('employedRobots', employedRobots);
  req.render('employed', {employedRobots: employedRobots});
})

app.set('port', 3000);
app.listen(3000, function(){
  console.log('application is running');
});

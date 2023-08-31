const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const encodeUrl = bodyParser.urlencoded({ extended: false });
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();
const port = 5000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(encodeUrl)

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'myprojects',
	port: 3306,
});

app.use(session({
  secret: 'secret key',
  cookie :{maxAge: 90000},
  saveUninitialized: false
}));


app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const usertoken = req.sessionID;
  const maxAge = req.session.cookie.maxAge;
  const expiredDate = new Date(Date.now() + maxAge);



  connection.query(`SELECT * FROM users WHERE email = ? `, [email], function(err, rows) {
    if (err) throw err;

    if (rows.length > 0 && rows[0].password === password && rows[0].user_type === '(1)admin') {
      req.session.isAuthenticated = true; 
      req.session.email = email; 

      connection.query(`INSERT INTO sessions (email, session_token, expiredDate, CookiemaxAge) VALUES (?, ?, ?, ?)`, [email, usertoken, expiredDate, maxAge], function(err) {
        if (err) throw err;
        res.redirect('/dashboard');
      });
    } else {
      res.redirect('/login');
	  
    }
  });
});





app.get('/dashboard', (req, res) => {
  const userSession = req.session;
  const userToken = req.sessionID;

  if (userSession && userSession.isAuthenticated) {
    connection.query(`SELECT * FROM sessions WHERE session_token = '${userToken}'`, function(err, sessions) {
      if (err) {
        res.send('Database error');
        return;
      }

      if (sessions.length > 0) {
        const Email = sessions[0].email;

        connection.query(`SELECT * FROM users WHERE email = '${Email}'`, function(err, users) {
		const userEmail = users[0].email
          if (err) {
            res.send('Database error');
            return;
          }

          const userData = users.map(user => ({ id: user.id, email: user.email }));
          const userSessionData = sessions.map(session => ({
            email: session.email,
            session_token: session.session_token,
            expiredDate: session.expiredDate,
            CookiemaxAge: session.CookiemaxAge,
            id: session.id
          }));

          const responseData = {
            userData: userData,
            userSession: userSessionData
          };

          res.send(responseData);
        });
      } else {
        res.send('Session not found');
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
  });









app.post('/', (req, res) => {
	
  var password = req.body.password;
  var email = req.body.email;
  var userFname = req.body.userFname;
  var userLname = req.body.userLname;
  var user_type = req.body.user_type;

  connection.connect(function (err) {
    if (err) {
      console.log(err);
      res.send('Error connecting to the database.');
      return;
    }

    
    connection.query('SELECT * FROM users WHERE email = ?', [email], function (err, result) {
      if (err) {
        console.log(err);
        res.send('An error occurred while checking user data.');
        return;
      } if (!password || !email) {
    res.send(`<html><h1>All fields are required.</h1> <a href="/"><button>Go back</button></a></html>`);
    return;
  }
	  if (result.length > 0) {
        res.send('Fail register!');
      } else {
        
        const sql = 'INSERT INTO users (password, email, userLname, userFname, user_type) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [password, email, userLname, userFname, user_type], function (err, result) {
          if (err) {
            console.log(err);
            res.send('Error while registering user.');
            return;
          }
          
          res.send(`<html><h1>User Registerd successfuly!</h1> <a href="/"><button>Go back</button></a></html>`); // User registered
        });
      }
    });
  });
});
   
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;

  connection.query(`DELETE FROM sessions WHERE session_token = '${id}'`, function(err, result) {
    if (err) {
      res.status(500).send('Error deleting session');
    } else {
      res.send('Session deleted successfully');
    }
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
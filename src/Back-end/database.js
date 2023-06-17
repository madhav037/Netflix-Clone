const mysql = require('mysql2');
const { resolveHostname } = require('nodemailer/lib/shared');
const { promises } = require('nodemailer/lib/xoauth2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'madhav123',
  database: 'netflixclone'
});

function connectToDatabase() {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to the database (line 16):', err);
          reject(err);
        } else {
          console.log('Connected to the MySQL server');
          resolve();
        }
      });
    });
  }

function disconnectFromDatabase() {
    connection.end((err) => {
      if (err) {
        console.error('Error disconnecting from the database (line 29):', err);
      } else {
        console.log('Disconnected from the MySQL server');
      }
    });
  }

  const saveEmailToDatabase = (email,password) => {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
  
        const sql = 'INSERT INTO users (email,userPassword) VALUES (?,?)';
        connection.query(sql, [email,password], (err, result) => {
          if (err) {
            console.error('Error:', err);
            reject(err);
          } else {
            if (result.affectedRows > 0) {
              console.log('Data saved successfully');
              resolve(result);
            } else {
              console.log('Duplicate entry ignored');
              resolve(result);
            }
          }
          disconnectFromDatabase()
        });
      } catch (error) {
        reject(error);
      }
    });
  };

const checkLoginCredentials = (email,password) => {
    return new Promise( async (resolve,reject) => {
        try {
            await connectToDatabase();
            const sql = `
                SELECT * FROM users WHERE email = ? AND userPassword = ?
            `;

            connection.query(sql, [email, password], (err, results) => {
                if (err) {
                    console.error('Error:', err);
                    reject(err);
                    return;
                }

                if (results.length > 0) {
                    const user = results[0];
                    console.log(`User found. UserId: ${user.userId}, Password: ${user.userPassword}, Email: ${user.email}`);
                    resolve(true)
                } 
                else {
                    console.log('No user found with the provided email and password.');
                    resolve(false)
                }
            })
        } catch (error) {
            reject(error);
        } 
    })
}

module.exports ={ 
    saveEmailToDatabase,
    checkLoginCredentials,
} ;
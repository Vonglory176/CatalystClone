/* Create User Accounts: Use the Admin SDK to create user accounts. You can create a new Netlify 
function that listens for POST requests to create new users.*/

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  
    try {
      const { email, password } = JSON.parse(event.body);
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify({ userId: userRecord.uid }),
      };
    } catch (error) {
      return { statusCode: 500, body: error.message };
    }
  };
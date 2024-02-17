/* Manage User Data: For tracking order history and owned files, you can use Firestore or the 
Realtime Database. When a user places an order, you can create or update their order history in the 
database.*/

const db = admin.firestore(); //Change to use realtime database

const updateOrders = async (userId, orderData) => {
  const userRef = db.collection('users').doc(userId);
  await userRef.set({
    orders: admin.firestore.FieldValue.arrayUnion(orderData),
  }, { merge: true });
};
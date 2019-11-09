###Backend:

How to make it up and running: <br />
1- `cd backend`

2- create .env in the backend directory

3- copy the following to it:
```dotenv
 MONGODB_URL=mongodb://mongo_service:27017/tenderd
 JWT_KEY=WinterIsComingGOT2019
 REQUEST_EXPIRATION_IN_MINIUTES=4

```
4-
``  
docker-compose up --build 
`` 


Db schema:
I used MongoDb, with 3 collections:

1- contractor_requests

2- supplier_bidding

3-users (has both contractor and supplier)

https://imgur.com/uY9bqiP

https://imgur.com/x4GYGCt

https://imgur.com/GfAQB57

I used mongoose as an ODM in the ndoe js backend


###Requests:
Please refer to the postman json collection: https://api.myjson.com/bins/19eatg


The Api Journey:
1- register/login to get a token (it can be contractror token or supplier token)

2- send this token in the contractor/supplier requests in the headers to authorize them

3- logout the user



===============
#####

for processing the expired requests i used cronjob (file:cronjob.js) which is running every second to check on the requests...
if the request got expired , i search for the lowest price for that request in the collection `supplier_bidding`, once i find it i attach that document to the
 request in `contractor_requests`


===============


###Frontend 

How to make it up and running: <br/>

``
cd frontend
npm install
yarn start or npm start
``

What i achieved:

Login/register is done (backend part also doen)

The Contractor part is done (backend part also done)

Supplier Part (still not done)  (but the backend part for it is done...)



I used Redux and redux thunk for the state management...
 
 

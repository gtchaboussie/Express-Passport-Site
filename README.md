# My first project
This is my first project, wich i made to get some practice with backend concepts.
This was built from scratch and took me 3 days.
I used Express framework for Node JS, with Mongoose and Passport as main modules.
I used basic Bootstrap for visuals, and EJS as view engine.
And a banana favicon, because why not. 🍌


## Requirements
This project requires npm ( node package manager ) and node installed.
Also requires MongoDB installed.

MongoDB 
https://www.mongodb.com/try/download/community

Node js:
https://nodejs.org/en/


## Installation
Open a terminal pointing to the projet folder and type the followings commands :

```bash
npm install
```
```bash
npm start
```

then open a browser to this adress :
http://localhost:3000/

Please use Firefox or Google Chrome, the date part with Safari or Edge is a bit.. funky ~

If everithing works you should see a line in terminal saying : "-: Mongoose connection open :-"
If not, check your installation of mongo.


## What does this do ?
This project simulates a registering process, and then authentification using a Passport local strategy.
Only authentificated users can make adjustemts to article list.
Unauthenticated users only have the read option.
You should be able to register and add items to the article section using local mongoDB database.

Please node that the "Contact me" button is fake.
It only goes into my Mailtrap inbox.


## Contributing
If you want to contribute this project, please do.
I'm only learning at this point, and every help is welcome.


## License
[MIT](https://choosealicense.com/licenses/mit/)
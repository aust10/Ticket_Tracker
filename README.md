# Ticket Tracker

This is a personal project where I created a internal company tool I call Ticket Desk. It's main functionality is to maintain a running active ticket thread where anyone within the company can submit a ticket with a 1-5 priority level and a write an custom comment in addition to the title of the ticket.
<p align='center'>
  <image src='ticket_tracker/src/Images/demo.gif' alt='main page' height='300px' width='90%' style='border:1px solid black'/>
</p>
Once a user is registered by signing up with the registration page, they will be able to pull tickets from the active board and put them in their que. 
An aditional feature is a project based "Trello" like board where a user can take tickets put them in working, compleated, and delete, all by mouse or finger click and drag. When a user moves it from completed to delete It will delete on page reload from the database. 

<p align='center'>
<image src='/ticket_tracker/src/Images/userPage.png' alt='main page' height='400px' width='400px' style='border:1px solid black' /> <image src='ticket_tracker/src/Images/kanban1.png' alt='main page' height='400px' width='600px' style='border:1px solid black' />
</p>

## To run this application 
***Visit***
<br/>
<a href='http://209.151.144.62/'> Ticket Desk</a> 

***OR***
- Clone this repository 
- In order to get all the applications dependencies run npm i or npm install in the root directory "Ticket_Tracker" and in the sub directory "ticket_tracker".
- In your terminal navigate to the root "Ticket_Tracker" and run npm start, this will start your server located in Index.js
- Next you will navigate to the 'ticket_tracker" directory and run npm start, this will start your React app and display your application
- Lastly this application uses Mongo.db so if you do not have it installed you will need to do so and then run the command mongod in a seperate termianl window in the root directory

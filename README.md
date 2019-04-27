# Family-Dashboard

#### http://www.family-dashboard.site
<br />

### Overview
Family-Dashboard was created to participate in the Scholar Jet's Seeing Home challenge by Wayfair. It is a Ruby on Rails app with a React.js front-end and PostgreSQL as backend. The app uses Ruby version 2.4.5 and React 16.8.1. The purpose of Family-Dashboard is to help families facilitate communications between each other. It features a family chat room, to do list, invitation system, and a wall to post photos or messages.
<br />
All 3 features pulls data from a self built backend API. The chatroom was built through Action Cable, which allows WebSockets to integrate with the application. This allows users to communicate in real time and create a snappy user experience. The invitation system allows users to invite other users to join their family dashboard. It utilizes ActionMailer to send emails to invitees with a link to sign up for Family-Dashboard if they are not a member already. Existing Family-Dashboard members that are invited will also receive an email to notify that they have been added to the family. Family Dashboard also utilizes many other tools such as Dropzone, Carrierwave, Devise, Foundation, AWS, etc. I hope that Family-Dashboard can help your family/house stay in touch with each other.


##How to use the app

1. Create an account by clicking "Sign Up" on the navigation bar.

2. Create a family dashboard by clicking "Create" on the navigation bar.

3. Invite other family members by clicking "Invite" on the navigation bar.

4. Utilize the chat to communicate with other family members.

5. Coordinate tasks and keep notes with the to do list.

6. Post photos or messages on the wall and write comments.



### Getting Started locally

1. Clone the repository to your machine

2. Navigate to the cloned repository

3. Run the following from the command line to install all necessary dependencies:

  `$ bundle install`
  `$ yarn install`

4. Create the database and run migrations

  `$ bundle exec rake db:create`
  `$ bundle exec rake db:migrate`

5. Start the rails server

  `$ rails s`

6. Navigate to localhost:3000 in your web browser. Google Chrome is recommended.

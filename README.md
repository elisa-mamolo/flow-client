### Flow

#### Description of the project

Flow is an app for supporting users in tracking their acquariums nutrient values by having the possibility to input those values in a form of a log. Moreover, specific charts allow to visualize data and present them in another form to the user.

#### Screenshot

![screenshot of the app](https://github.com/ElisaMamolo/flow-client/blob/master/public/images/screnshoot.PNG)

#### Wireframes

Before starting developing some wireframes have been created to have a clear structure to follow during the development phase.

- Landing page and acquarium page.
  ![Wireframe landingpage and acquariums](https://github.com/ElisaMamolo/flow-client/blob/master/public/images/landingpage.PNG)
- Acquarium details, log table and the charts page.
  ![Wireframe if logged in](https://github.com/ElisaMamolo/flow-client/blob/master/public/images/wireframe2.PNG)

#### User Stories

- As a user visiting Flow I would like to view all my acquariums

- As a user visiting Flow I would like to see acquariums logs

- As a user visiting Flow I would like to be able to Signup

- As a user visiting Flow I would like to be able to Login/Logout

- As a loggedin user visiting Flow I will have access to charts, logs and acquariums

- As a logged out user visiting Flow I will be informed that i don't have access to the specific content

- As a user visiting Flow I would like to be able to CRUD on logs

- As a user visiting Flow I would like to be able to CRUD on acquariums

- As a user visiting Flow I would like to see charts

#### Technologies Used

:computer:

- Express
- MongoDB & Mongoose
- MongoDB Atlas - db deployment
- Heroku - server deployment
- Netlify - client deployment
- Bootstrap
- Recharts

#### Components and page structure

Pages:

- HomePage -> 3 cards for navigating in the app
- AcquariumPage -> list of acquarium cards and button for adding acquarium
- LogPage -> table with logs
- EditAcquariumPage -> form for editing
- EditLogPage -> form for editing
- LoginPage -> form for login
- SignupPage -> form for signup
- Charts -> List of charts

Components:

- AddAcquarium -> form for adding acquarium
- LogRow -> display logs into row of a table
- NavBar -> Links and Login/Logout

#### Project Link

https://flow-reeflog.netlify.app/

#### Future Work

:wrench:

This is only an mvp, there are many areas that could be improved, here is a list of improvements and bugs:

- Make routes more readable for the users
- Log route can be called "acquarium details"
- Edit acquarium, date is not prepopulated
- Image for navbar missing
- When ddeleting acquarium the table logs is visible for a fraction of a second
- Navbar could show logged in user, it is creating issues so has been removed
- Charts, data could be ordered by timestamp
- Route for error page if route not found
- Possibility to upload pictures of the acquarium
- A quick refactoring round has been made, but some elements could be transformed in components

:wrench:

#### Resources

- Recharts for creating charts
- Bootstrap for styling
- Codepen for acquarium cards and wave effect

#### Team members

Elisa

#### This is a learning project, if anything needs to be removed please reach out and it will be removed right away.

# LostThreads
### Project: 
A server-side API app using the MVC paradigm, user authentication, and connected to a database. <br>

### Idea: 
A forum-based website catering to abandoned locations throughout Virginia. Users can register, create a profile with login credentials, search/browse/follow/create forum threads about abandoned sites. Each thread will allow users to upload pictures of the site(s) and give a description, location and the date it was visited.

# Table of Contents
* [User Story](#userstory)
* [Acceptance Criteria](#acceptancecriteria)
* [Usage](#usage)
* [Installation](#installation)
* [Credits](#credits)

## User Story
> AS a registered forum user, <br>
> I WANT to be able to easily search for and view posts based on location and attraction, <br>
> SO that I can quickly find relevant discussions and new locations to explore regarding abandoned places. <br>
> AS an explorer, <br>
> I WANT to be able to connect with others who are also interested in this hobby, <br>
> SO that I can learn and share about new places to explore. <br>

## Acceptance Criteria

> GIVEN I am a new or existing user, when I visit the site I am directed to a login page with an option to login or sign-up. <br>
> WHEN I choose to sign up, I am directed to a sign-up page where I can add my account information (e.g. email, name, username). <br>
> THE new account information should be stored in a database. <br>
> GIVEN that I am logged-in, when I visit the homepage, I should see a button to browse threads or create one. <br>
> WHEN I choose the "browse" button, I am taken to a page which includes a tab menu for attraction or site type. <br>
> THE results page should display a list of relevant posts, showing the post titles, authors, image(s) (optional), and a brief snippet describing the location. <br>
> EACH result should include a clickable title that takes me to the full post. <br>
> THE search results should be sorted by date, with the most recent posts displayed at the top. <br>
> THE search results page should provide an option to filter results based on various criteria (e.g., date,author, attraction).<br>
> WHEN I choose the "create" button, I am directed to a page where I can enter in the relevant information for my thread post and upload an image. <br>
> THE information needed to create a post should include a title, location, date visited, description, and image(s) (optional). <br>

## Usage
> Deployed page: https://young-earth-25624-6d7322590ac2.herokuapp.com/ <br>
Sign up and create or browse posts.

![Lost threads logo](https://i.ibb.co/7NmHsPg/logo.jpg)


## Installation
Requires the following dependencies: <br>
1. Sequelize
2. Dotenv
3. Mysql2
4. Express.js
5. Node.js
6. Handlebars.js
7. Bcrypt
8. path


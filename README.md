# File Export Module
This module simplifies importation of data into a database. As of the current version, only xls and xlsx file formats are supported. CSV and JSON file formats will be supported in the future. :)

## Dependencies
This module assumes that the database to be used is a MySQL database.
1. MySQL Database and Server
2. NodeJS
3. Bootstrap
4. JQuery and Ajax

## Local Setup
1. Clone this repository
2. Setup the .env file with the following values:
	- PORT=
	- DB_HOST=""
	- DB_PORT=
	- DB_USER=""
	- DB_PASSWORD=""
	- DB_DATABASE=""
	- SESSION_SECRET=""
3. Navigate to the folder directory and open cmd
4. Run `npm run dev`
5. Click the button

## External App Setup
1. Navigate to the public directory inside the project directory
2. Copy and insert the following files to your directory:
	* JS Files
		- api_dynamicdb.js
		- file_module.js
	* CSS Files
		- api_style.css
3. Create an element to use as a trigger for the dialog box i.e:
	- `<button type="button" onclick="create_modal([id], [data], [action], [method])" data-target="#[id]">Button</button>`
	where:
	* id  = ID used to identify the modal
	* data = table columns from the database
	* action = form action link
	* method = form method ('GET'/'POST')

## How It Works
![alt text](public/graphics/demo1.png 'Actual implementation')
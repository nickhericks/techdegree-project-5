# Project 5 - Full Stack JavaScript Techdegree

### Public API Requests

This project uses JavaScript to create an employee directory by communicating with a third-party API - [Random User Generator API](https://randomuser.me/).

---

<img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1553282635/portfolio/publicApiRequest.png" width="899px">

## View project

:mag: Live version available at [nickhericks.github.io/techdegree-project-5/](https://nickhericks.github.io/techdegree-project-5/)

## Project objective

This project required me to build an app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They are in need of a smart way for employees to share contact information with each other.

I used the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees,” and used that data to build a prototype for an Awesome Startup employee directory.

I requested a JSON object from the API and parsed the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name opens a modal window with more detailed information, such as the employee’s birthday and address.

## Techniques and concepts

- AJAX (Fetch request)
- Third-party API
- JSON objects
- Array iteration methods

## Additional features

In addition to completing the basic requirements for this techdegree project, I also added additional features including:

- [x] Added live search filtering for employee cards on the page
- [x] Added 'Prev' and 'Next' buttons for navigating cards within modal
- [x] Personalized CSS styling (colors, fonts, etc.)

## Code example

This lesson was all about AJAX, so it seems fitting to show the fetch request used:

```javascript
// Request data for 12 random users from the Random User Generator API
fetch('https://randomuser.me/api/?results=12&nat=us')
	.then(response => response.json())
	.then(data => displayEmployees(data.results));
```

## Acknowledgements

This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:

Also, a big thank you to the creators and maintainers of the [Random User Generator API](https://randomuser.me/) 👍
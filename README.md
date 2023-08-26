# Exoplanet hunt

## Working link
[Visit here...](https://exoplanethunt.netlify.app/)

## Features
1. The query input panel displays dropdowns, enabling users to query based on the year of discovery, discovery method, hostname, and discovery facility.
2. Within the query input panel, users can easily spot the 'Clear' and 'Search' buttons.
3. Users have the flexibility to select a single value from any of the query dropdowns, or from all of them.
4. By clicking the 'Search' button, users initiate a search for exoplanets that match all the selected query values.
5. In the event that the 'Search' button is clicked without selecting any query values, users are presented with an error message.
6. The results panel below the query panel presents the matching exoplanet data in a tabular format. Only fields that are queryable are shown.
7. To reset their query selections and clear displayed data in the results panel (in case of a prior search), users can click the 'Clear' button.
8. The hostname is presented as a hyperlink, directing users to NASA's Confirmed Planet Overview Page for that specific planet.
9. Clicking on the hostname hyperlink opens the Confirmed Planet Overview Page in a new browser tab.
10. Icons, such as up and down symbols, are visibly integrated into the column headers.
11. By selecting the up symbol icon, users trigger the sorting of rows in ascending order based on the values in that column.
12. Conversely, by clicking on the down symbol icon, users prompt the sorting of rows in descending order based on the values in the column.

## Tech stack and tools used
`javaScript`, `React.js`,`materialUI`,` VITE`, `webstorm`, `git`

## Installation guide
1. Clone the git repository using the link ```https://github.com/mechXsteam/planetary_system.git``` or simply download
   the zip file.
2. Navigate to the root directory and run command `npm run dev` in the terminal, it will fire off a development server at port:3000
   on your local machine, simply click the link in the terminal. Navigate to http://localhost:3000 to view the project.
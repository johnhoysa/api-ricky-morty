Site to do:
- Content edits
- Set up lint to make all quotes the same

~~

Steps to build and preview site:
npm i
npm run build
  This is being ran in watch mode by default
Within VS Code install Live Server plugin. 
Open the index.html file with live server and away you go. 
The page is refreshed after a file is saved and the build is ran.

JS, CSS and back ground images sued by tailfin are moved moved dist folder on build. 
assets folder is for images and icons
For production just drag the dist, asset, folder to the server as well as index.html

~~

Vite has been added to site:
"npm run build": "vite build", // build for production

Vite is used to compile JS and CSS only.

~~

Tailwind is now compiled with PostCSS and is built with the build command within Vite.

Config notes:
text-2xl I did up change up the line-height but not the font-size

~~
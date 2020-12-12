# Qlip 1.0

Qlip is a video sharing website catered for gamers wanting to share their awesome one minute gaming clips!.

The application uses Asp.Net core v 3.1 on the back-end and ReactJs, typescript and Mobx for the frontend. it is a small still in development web app, that i hope with feedback i get from users will in time grow into something worthwhile.
### Features 🚀
1. The app includes authentication and authorization by using aspNet identity and jwt tokens
2. secure and fast uploading files using cloudinary upload widget and the cloudinary dotnet sdk
3. Uses gravatar for register images
4. Features real-time connection for video comment sections
5. Uses mobx for state-managment
6. channels
7. A robust database for games gotten from the rawg api that you can attach to your video uploads for better searching
8. Likes and dislikes on videos
9. sorting & pagination
10. Alerts 
11. video preview before final upload
and many more...

# Quick start 🏎
### Create an account and add your cloudinary connection string and a jwt token key in the appSettings.json file
example:
```
"Cloudinary": {
"CloudinaryConnectionString": <Your cloudinary connection string found in your managment console>
},
"jwtKey": <A strong jwt key>
```
### cd into the folder named "client" to access the fontend code and run the following command to install all the necessary dependencies:
```
npm install
```
### Head back to the root of the application and run the following commands:
```
// restore all server dependencies
dotnet restore

// build the application
dotnet build

// run the server code
dotnet run

```
### To deploy the application to azure you will need a valid subscription, please follow the guide [here](https://azure.microsoft.com/en-us/campaigns/developer-guide/)

If any errors come up or you are stuck on a step please feel free to raise an issue or contact me on github

# App Info
## Author
Hundeyin Oluwadamilola Todeyon
## Version
1.0
## Lisence
This project is licensed under the MIT License

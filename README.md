# Udacity Keep Clone

This application is an MVP of a Google Keep clone. For this application I chose option #2; to build a serverless application. I believe going route for building a POC is a great way to prototype, and fail fast when it comes to discovering value in a software product. Given that the rubric instructions mentioned that I could use the code I wrote from any of the courses, including the serverless course, a lot of the code in this project is re-used. I chose to focus on the serverless configuration itself as this was my interest. I have accomplished all 4 of the different areas: Functionality, Codebase, Best Practices, and Architecture. I've attached screenshots showcasing successful deployment and have attached a postman collection for testing.

# Testing

Currently, the application is live so given you have authenticated and set your JWT credential in the parent's bearer auth header, you should be able to test the API directly. You can also change directories into the frontend, and test the app from the frontend by running npm run start. Prior to running the client application, make sure to run **npm install** as the dependencies aren't installed in the repo intentionally.

Pertaining to deploying the serverless application, some of the plugins used require a specific version of the serverless framework in order to properly function. Therefore, I've installed serverless locally to prevent any failures caused by your global serverless cli being on a version that doesn't support some of the plugins required in the project.
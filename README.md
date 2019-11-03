# JSON web tokens & OAuth2 example

This is a simple application to see how to use JWTs in Node.js and OAuth2 by using the Github API.

Run the server with nodemon with:

```
npm run dev
```

The API routes are the following:

- GET `localhost:3000/api`: just returns a message "My message".
- POST `localhost:3000/api/login`: returns a JWT that expires in 20 seconds.
- POST `localhost:3000/api/posts`: with the JWT in the Authorization header. If the token is valid returns an arbitrary JSON, else an HTTP 403 code
- GET `localhost:3000/oauth/redirect`: this route is for the OAuth part, when a client requests a token to the Github OAuth API (by going to `localhost:3000` and clicking "Login with Github") it will be sent to this route. From here we ask the Github API the access token and finally redirect the user to the welcome page where we use this access token to access public information of the user's Github account and display it (name and number of followers).

**For the OAuth part to work a client and secret ID are needed**. These are given when we register a new OAuth application in [github.com/settings/applications/new](https://github.com/settings/applications/new). For this to work with this project, "Homepage URL" has to be `http://localhost:3000` and the "Authorization callback URL" has to be `http://localhost:3000/oauth/redirect`. 

The client ID has to be replaced in `src/index.js` and `src/public/index.html`. And the secret has to be written to `/src/GithubOauthClientSecret.secret`. More information about how the Github OAuth API works can be found in the [Github guide](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/).

The OAuth part was done following this article: ["Implementing OAuth 2.0 with Node.js" by Soham Kamani](https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The App has been deployed via heroku, here is the demo: https://thawing-earth-47588.herokuapp.com/

## note:

  Search users result is only showing the first 30 users so please be specific on on search terms.
  Number of Repos: it shows users with public repos of more than userinput (for example: if you enter 0, it will show result of users with more than 0 repo)

  Number of Followers: it shows users with followers of more than userinput (for example: if you enter 0, it will show result of users with more than 0 follower)
  
  ## To run the app locally
  Simply clone/download the repo
  Once you have the code on your computer,cd to the app and run:
  ### `npm start`

## There is a 60 requests/hour rate limit on the fetch request if you don't have a authorization.
## Let's use a token to get up to 5000reuqest/hour
If you already have a personal token that you've been using to make API requests, you can keep using that one. Otherwise, you'll need to generate a new one.

To start, go to [github.com/settings/tokens](https://github.com/settings/tokens) and click "Generate new token." Name it something like "test the app", and check `repo` scope. Once you generate the token, make sure to copy and paste it somewhere, because once you leave that page, you won't be able to see it again.

Using the token to [access the API](https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/#3-use-the-access-token-to-access-the-api) is a simple matter of creating an `Authorization` header with our request.

We need to provide our authorization token in order to list our own repositories with this API, so let's add our `Authorization` header (don't forget to assign your token to `const token`).

You can simply open your chrome console and run the following scripts:

```js
const token = 'YOUR_TOKEN_HERE';

fetch('https://api.github.com/users/steven0608', {
  headers: {
    Authorization: `token ${token}`
  }
}).then(res => res.json()).then(json => console.log(json));
```

## once you used the token, now you upgrade the rate limit!





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

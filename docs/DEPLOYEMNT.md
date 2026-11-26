# React Vite Netlify Deployment

Instructions online:  
https://docs.google.com/document/d/1fj057G7XyGvAfkk-bqxy-TsaAYZHf9_OhMoEZQ_ijVQ/edit?usp=sharing


## Table of Contents

- [Install netlify-cli](#install-netlify-cli)
- [Set up a brand new site](#set-up-a-brand-new-site)
- [Update an existing site](#update-an-existing-site)


## Install netlify-cli

Follow the instructions at:  
https://docs.netlify.com/cli/get-started/.

Install netlify-cli and login to Netlify:

```bash
npm install -g netlify-cli
netlify login
```


## Set up a brand new site


**Step 1**

Create a `netlify.toml` file in the root of your app and paste in the content from:  
https://gist.github.com/drblue/78f807a1b612db3ce70e129daf4fc092.

Also, add `.netlify/` (note the dot at the beginning) to your `.gitignore` file.


**Step 2**

Run `npm run build` from the root of your app. Open the same folder in Finder/File Explorer and verify 
that a `dist` folder has been created.

```bash
npm run build
```


**Step 3**

Run `netlify deploy` from the root of your app. Select "Create & configure a new site" and enter a name for 
your site (or simply press Enter to have a random name assigned). Netlify will then deploy your site and provide 
 a "Website draft URL" that you can visit to verify that everything is working as expected.

```bash
netlify deploy
```

If you are satisfied, you can publish it live by running `netlify deploy --prod`; you will then be able to 
access the site via the new URL provided.

```bash
netlify deploy --prod
```


## Update an existing site


**Step**

Run `npm run build` from the root of your app.

```bash
npm run build
```


**Step 2**

Run `netlify deploy` from the root of your app. Verify that everything is working correctly via the "Website draft URL," then run `netlify deploy --prod`.

```bash
netlify deploy
```

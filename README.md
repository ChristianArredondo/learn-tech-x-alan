# Teamups Technical Exercise

## Intro
Built with `create-next-app`, this is a NextJS ecommerce-related app that uses MongoDB for the database and is containerized to run using Docker compose.

## Quick start
1. Clone the repo: `git clone {REPO_URL}`

2. CD into the repo: `cd /path/to/repo`

3. Start via docker compose: `docker-compose up`

4. Once running, visit `http://localhost:3000/` to load the app--the first load might be slow. You should see the following page if everything is successful:
<img width="1483" alt="Screenshot 2023-09-12 at 3 56 19 AM" src="https://github.com/teamups-inc/learn-corp-base-tech-exercise-2023/assets/24460948/3ebe9307-ef5d-4049-bcad-c96559ec4e3b">

## Sample git workflow
Sample flow for making changes and submitting a PR after getting the app up and running.
```
// check out a new branch for your changes
git checkout -b {BRANCH_NAME}

// make changes and commit them
git add --all
git commit

// push new branch up to GitHub
git push origin {BRANCH_NAME}

// use GitHub to make PR
```

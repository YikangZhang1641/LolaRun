# Web
Go to "web" folder

Run "npm install" in command-line window

Run "npm start" in command-line window

Open browser and go to http://localhost:3000/

# Firebase info
Account: packageprojectflag@gmail.com

Password: packageprojectflag!1

https://console.firebase.google.com/

# Git workflow

Make sure you're on master

git checkout master

git fetch origin

<img width="941" alt="Screen Shot 2019-06-22 at 11 53 49 AM" src="https://user-images.githubusercontent.com/50416980/59967950-d34df000-94e6-11e9-9aa0-c925887ab5ba.png">


Create a new branch to work on your issue, ideally your branch name should be the same as the topic of your issue
<img width="1175" alt="Screen Shot 2019-06-22 at 12 03 01 PM" src="https://user-images.githubusercontent.com/50416980/59967927-69cde180-94e6-11e9-8c13-fa080154ca58.png">

git checkout -b issue-topic

Use git branch to make sure you're on the right branch
<img width="941" alt="Screen Shot 2019-06-22 at 11 55 53 AM" src="https://user-images.githubusercontent.com/50416980/59967926-69cde180-94e6-11e9-8a17-5e802f780ea3.png">

Make your changes


Add and commit

git add changed_files

git commit -m "description of your commit"
<img width="941" alt="Screen Shot 2019-06-22 at 12 07 41 PM" src="https://user-images.githubusercontent.com/50416980/59967928-69cde180-94e6-11e9-9d16-9da116870c38.png">

Push the branch

git push -u origin issue-topic

Open a pull request to merge to master

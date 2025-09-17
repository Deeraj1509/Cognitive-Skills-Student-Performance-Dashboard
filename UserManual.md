User Manual - Student Performance Dashboard
Table of Contents

How to Run the Website
Using the Dashboard
Features Guide
Navigation Guide
Understanding the Data
Common Issues and Solutions

1. How to Run the Website
Prerequisites
Before running the website, make sure you have installed:

Python 3.8 or higher
Node.js 14 or higher
All required dependencies

Step 1: Start the Backend First

Open your terminal or command prompt
Navigate to your project folder:

   cd student-performance-dashboard

Go to the backend folder:

   cd backend

Start Jupyter Notebook:

   jupyter notebook

In the Jupyter interface that opens in your browser:

Click on student_analysis.ipynb
Run all cells by clicking "Cell" → "Run All"
Wait for all cells to complete (this processes the data and creates the JSON file)
Close Jupyter when finished



Step 2: Start the Frontend

Open a new terminal window (keep the first one if Jupyter is still running)
Navigate to the frontend folder:

   cd student-performance-dashboard/frontend

Start the development server:

   npm run dev

Wait for the message: "ready started server on 0.0.0.0:3000"

Step 3: Access the Website

Open your web browser
Go to: http://localhost:3000
The Student Performance Dashboard will load

2. Using the Dashboard
First Time Setup
When you first access the dashboard, you will see a single page with all the analytics. The page is organized from top to bottom:
What You Will See
Top Section - Summary Cards
Four cards showing:

Total Students in the dataset
Average Assessment Score
Score Range (lowest to highest)
Number of Learning Groups identified

Key Insights Section
Important findings from the data analysis:

Which cognitive skill best predicts student performance
How accurate the prediction model is
Information about the learning groups

Charts Section (2x2 Grid)
Four different charts:

Bar Chart (top left): Shows average cognitive skills for different student groups
Scatter Plot (top right): Shows relationship between attention and assessment scores
Radar Chart (bottom left): Shows a sample learning profile
Empty space (bottom right): Reserved for future charts

Learning Personas Section
Three boxes showing different types of learners:

How many students are in each group
What characterizes each group
Recommendations for teachers

Student Table (Bottom)
Complete list of all students with:

Search box at the top
Clickable column headers for sorting
All student information in rows

3. Features Guide
How to Search for Students

Look for the search box above the student table
Type any student name or information
The table will automatically filter to show matching results
Clear the search box to see all students again

How to Sort the Data

Click on any column header in the student table
First click sorts ascending (A to Z, low to high)
Second click sorts descending (Z to A, high to low)
You can sort by any column: name, class, scores, etc.

How to View Individual Student Profiles

In the student table, look for student names (they appear in blue)
Click on any student name
A new page opens showing that student's detailed information:

Personal information
Radar chart of their cognitive skills
Progress bars showing their skill levels
Their learning persona and recommendations


Click "Back to Dashboard" to return to the main page

Understanding the Charts
Bar Chart Usage

Shows which learning group performs better in which skills
Taller bars mean higher average scores
Compare different colored bars to see skill differences

Scatter Plot Usage

Each dot represents one student
Horizontal position shows attention level
Vertical position shows assessment score
Students in top-right corner have both high attention and high scores

Radar Chart Usage

Shows multiple skills at once in a circular format
Larger area means better overall performance
Each point on the circle represents a different cognitive skill

4. Navigation Guide
Main Dashboard Page

This is the home page you see when you first visit the website
Contains all the charts, statistics, and the student table
Everything is on one page - no need to navigate elsewhere for the overview

Individual Student Pages

Access these by clicking on student names in the table
Each student has their own page showing:

Student name, ID, and class
Personal radar chart of their cognitive skills
Detailed breakdown of each skill with progress bars
Their assigned learning persona
Specific recommendations based on their profile


Always includes a "Back to Dashboard" button to return to the main page

Browser Navigation

Use your browser's back button if needed
Refresh the page (F5) if data doesn't load properly
The website works best in Chrome, Firefox, Safari, or Edge

5. Understanding the Data
What the Numbers Mean
Cognitive Skills (All scored 0-100)

Comprehension: How well the student understands what they read or learn
Attention: How well the student can pay attention during lessons
Focus: How long the student can concentrate on one task
Retention: How well the student remembers what they learned

Other Measurements

Engagement Time: How many minutes the student actively participates in learning
Assessment Score: Overall test or assignment performance (0-100)
Class: Which grade or class level the student is in

Learning Personas Explained
The system groups students into three types:
Developing Learners

Students who are making steady progress
Have moderate scores in most areas
Need structured learning approaches
Usually benefit from clear instructions and regular feedback

Focused Performers

Students who pay attention well and perform consistently
Have high scores in attention and focus
Can work independently
Often excel with challenging material

Support Needed

Students who may need extra help
Have lower scores in one or more areas
Benefit from additional teacher support
May need different teaching approaches or more time

6. Common Issues and Solutions
Website Not Loading
Problem: Page shows error or doesn't load
Solution:

Make sure you ran the backend first (Jupyter notebook)
Check that the frontend server is running (npm run dev)
Verify you're going to the correct address: http://localhost:3000

No Data Showing
Problem: Charts are empty or show no information
Solution:

Make sure you ran all cells in the Jupyter notebook
Check that the JSON file was created in backend/processed_data/
Verify the JSON file was copied to frontend/public/data/
Refresh your browser page

Search Not Working
Problem: Typing in search box doesn't filter students
Solution:

Make sure you're clicking in the search box first
Try typing just part of a student name
Clear the search box and try again
Refresh the page if the problem continues

Student Links Not Working
Problem: Clicking student names doesn't open their profiles
Solution:

Make sure the student names appear in blue color (indicating they're links)
Click directly on the student name text
Check that your browser allows JavaScript
Try refreshing the page

Charts Not Displaying Properly
Problem: Charts appear broken or don't show data
Solution:

Make sure your browser supports modern JavaScript
Try using a different browser (Chrome recommended)
Check that the data file loaded correctly
Refresh the page

Slow Performance
Problem: Website loads slowly or responds slowly
Solution:

Close other browser tabs to free up memory
Make sure your computer meets the requirements
Check your internet connection
Try refreshing the page

Getting Back to Main Page
Problem: Lost on individual student page and can't get back
Solution:

Look for "Back to Dashboard" button on the student profile page
Use your browser's back button
Type http://localhost:3000 in the address bar
Close and reopen your browser tab

Remember: Always run the backend first, then the frontend, then access the website through your browser.
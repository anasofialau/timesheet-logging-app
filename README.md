# README

Please describe your process for approaching the code challenge. What kind of planning
did you do? Did your plans change as you began coding?
I planned first the backend, what is the data modelling of the requirements. 
This involves:
- Creation of tables.
- What is the schema necessary in order to fulfill the requirements.
- What are gonna be the routes for each interaction to the backend.
- Plan the possible payload and contract for the responses for each API endpoint including for the ones to update/create etc.
- Plan ahead the testing scenarios and use cases in ordee to apply a TDD in order to verify the functionalities. 
After that I planned the implementation on the frontend, such as looking for external tools in order to not recreate from scratch features, like the date time picker, modals etc. What could be the possible layout of the design in order to fulfill of the requirements. 
I planned the customer journey that could cover all the user interactions from the given requirements. From the way the user could clock and clock out, the way to show error messages (alert messages were the easiest and flexible way), the way to edit entries and they way we can associate entries to multiple users. 
In overall, the design changed mostly in order to adapt the best experience, a friendly and understandable way to users, and that could be adapted to the structure of the backend. A list of things that changed for example were: the way in which the time entries are possible to be edited. We ended up having a modal, giving the user the ability to edit the time and day for the logs. and that could provide an experince more individualized for a specific time entry, this was an easier way to the frontend implementation to get the log entry data to be edited and have it stored to be used during the request to the backend. 


Describe the schema design you chose. Why did you choose this design? What other
alternatives did you consider?
I used Rails which is a very flexible MVC framework to work on and can use React embedded in the frontend. Other alternatiuves is to use ruby in the frontend, or erb, but this would not provide a lot of flexibility to reuse existing components and to make the app more maintainable, or to have the frontend separate and communicate with APIS to the rails backend.  

If you were given another day to work on this, how would you spend it? What if you were
given a month?
If I were given another day to work it, will improve the feature of supporting multiple users.
I would change the way the system is saving the username in order to use Devise which is a gem https://github.com/heartcombo/devise that provides a flexible way to authenticate users.
I will add login and signup views and will add token in order to track which user is logged in and know who is clocking in or clocking out without entering the username explicitly on the screen as it is currently.
If I were given a month, I would add features such as, the possibility of adding comments when clocking in/out, more validations to the edit feature in order to check the sequence of time logs. Also, I can improve the layout to be more user friendly, like the format of the times, and how/what data is displayed in the table. We can also add more actions to the screen like downloading a report of the time logs, and probably add a search filter to the index page in order to give the user the ability to know what are the logs entered in a range of time. And also, we can add the ability to delete time entries, and even add admin roles to the system that can have admin rights to manage all the time logs for every user and even get reports of multiple users. 

* Ruby version
ruby '2.6.6'


# TODO

3rd Release

2nd Release
+ Searching & queries
+ Implement threading of messages
+ Logins

1st Release
+ Replace banner with offical Rutgers stuff
+ Change favicon
+ Design main view controls
+ Hook up to backend + APIs
+ Make an 'empty state' feature for no message selected
+ Implement the main view form controls
	+ 'Move to'
+ Style the main view nicer
	+ Layout the form controls better

+ Forwarding - Daniel
	- A form should appear in the details view when you press the button (with controls)
	- The form should autofill with the requisit information
	- It should also display a list of suggestions as to who to forward to (select, option, etc. - look on pttrns.com for conventions)

+ Restyling - Jonnelin
	- Move the message list controls to the right
	- Add states (do should only become active when things are selected) (check out purecss.io)
	- rename text to be more desciptive but short (use pttrns.com for conventions)


# CHANGED

**2.4.2016**
__JC__
+ Completely redesigned the login page
	- Much nicer looking
	- login button doesn't really log you in but it does redirect you to the messages page

**2.3.2016**
__JC__
+ Solution: After some consideration, All that really happens is that the index file is served, which then loads the other files. From that logic, i can just use the php server to serve the files instead of node.
	+ Backend & wsgi - JC, I guess
		- Figure out how to set up node with wsgi and mysql
		- Put it on the temp server

**2.2.2016**
__JC__
+ Refactor messages service to do a single http get, then emulate a backend using html5 promises - this makes changes persist through page navigation (yeh)
	+ correspondingly make some changes to controller
+ Make the message item email color a gray, for better contrast with all states
+ Reinstated the status filter

**1.29.2016**
+ Organize project directory with addition of new team members
+ Hackily fix the mesage-url-linkage
	+ Now, you can select a message and change the url without the pages acctually reloading - useful for keeping place and allowing me to keep the messages as divs and handle selection.

**1.28.2016**
+ Style the main view nicer
	+ Make the search bar prettier

**1.19.2016**
+ Implement & style the front-end of the login page
	+ Add .active class for nav items that make a triangle under it that leads to the bottom menu
+ Move a bunch of files and logic around
	- Use app for routing and messages for main app

**1.13.16**
+ Integrate list loading

**1.12.16**
+ Add list item controls
    - Not so much, bulk controls aren't useful but search is
+ Add list controls
+ Add HTML5 Boilerplate (scaffolding)

**1.11.16**
+ Basic layout done

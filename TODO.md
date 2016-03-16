# TODO

+ Implement a modal directive

+ Conversations
	+ Rename messages to this in css, JS
	+ Implement a suggestion drop down

+ Rename message-relevant things to a conversation
+ Plan registration
+ Style technical info


+ Searching & queries
+ Hook up to backend + APIs

+ Options
	+ Implement settings into options modal
	+ Add a 'reset' function to options pane when closed

+ Add a responsive horizontal scroll for message list controls

# CHANGED
**3.16.2016**
__JL__
+ Complete GUI design of options modal
+ Complete responsive functionality to modal

**2.26.2016**
__JL__
+ Style the main view nicer
	- Move the message list controls to the right
	- Add states (do should only become active when things are selected) (check out purecss.io)
	- rename text to be more descriptive but short (use pttrns.com for conventions)

**2.25.2016**
__JC__
+ Implement a contenteditable directive to use ng-model with the contenteditable divs
	+ Now grabbing and parsin the fields for the card is gonna be a lot easier and more angular

**2.23.2016**
__JC__
+ Refactor forwarding and responding
	- I was doing some pretty dumb things by not making use of angular's scope and trying to grab the message data externally
	- Also, I realized i can "send" a message just by appending to the data thread.
+ Remove message persistency


**2.18.2016**
__JC__
+ Fix tabbing
+ show footer on support messages if it's the only thing
+ change showfooter on directive to show controls
+ Use the new contenteditable cards
+ Separate the directives and fix the look of a few cards

**2.17.2016**
+ Implement the convo-card directive
	+ Implement loading and dynamic generation
	+ Replace it in messages.html


**2.16.2016**
__JC__
+ Style the conversation headers
+ Re-style cards

**2.15*2016**
__JC__
+ Fix route handling -> specific message
+ Huge overhaul of controllers.js & services.js
	- Add navbar controller
	- rewrite setCurMessage to viewMessage

**2.11.2016**
__JC__
+ Redesign Message View

**2.9.2016**
__JC__
+ Added route authorization & logouts
+ Add icon link lol
+ Merge jaya's changes

**2.8.2016**
__JC__
+ Implemented a simple (not very secure) login system
+ Move urwebsrv.rutgers.edu/webresp to urwebsrv.rutgers.edu/temp/webresp

**2.5.2016**
__JC__
+ Replace banner with official Rutgers stuff
+ Change favicon

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

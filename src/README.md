##  Project 1 :  Event Bus
This program can manage many events, emit them, and then call their callback functions:
- Take over user input like login, payment, startup,process-start
- Based on the event call out their functions 
- **Make sure it's WELL TYPED**
### Objectives : 
- Master generics in typescript
- understanding how to create intricate types
- be a better developer :O

### Input / Output : 
**emit and check-state** : type of event, as well a s event data
**output :** 
- Event started!
- OR (if state function) : status and information about the event
 
### Check Marks : 
- [x] Create two functions : emit, and check status / data, make them **type any for now**
- [x] Create a **literal type** for the different events
- [x] extend it and make an event map (this maps all the different events)
- [x] create types for each event
- [x] create return types for each event
- [x] enhance the emit/state functions
- [x] test and debug!
--- 

## Project 2 : Rick and Morty API
This is an API that returns cartoon characters from https://rickandmortyapi.com/api/

### Reasons to pick this API :
- It had a documentation
- it is well detailed, and has a lot of typing to work with
- it splits content into three categories, which practices generics

### How the program works (under developement)
**ID search :** you can search for characters using their ids, can either search a single ID or multiple IDs
**Query search :** much more complex, can use filters like `name`,`status`,`gender`,`type` to search for characters

### To-do : 
- Create the UI for the API response
- Add the option to open locations/episodes and search for them individually
- Fix typing errors

### How to run : 
inside the working directory : go to the `index.html` file and use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension from VS code, which opens the website in your browser
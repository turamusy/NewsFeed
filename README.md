# News Feed Application

## To start the application, you must: ##
 1) In the project directory, run the command "npm i" or "yarm install"
 2) For IOS - run the command "cd ios pod install", after installing all modules run the command "cd... react-native run-ios"
 3) For Android - run the command "react-native run-android"
 ## Store ##

You can see the contents of "Store" in **./src/store/initialStore.ts**

## Styles ##

The styles of the component must be either near the component file with the same name and ".styles.ts" extension, or inside the component itself in the "styles" variable

## Resources ##

All references to application resources (images, colors, text, url) must be stored in the "R" class
constants. The constants folder contains files with variables of the whole project

## File structure of the _src_ folder ##

 - actions - contains actions
    - stories.actions.ts - contains actions to work with the list on the main page
 - components - contains components used on different screens
    - Loader.tsx - contains component to display loading
    - OfflineStatus.tsx - contains a component to display the online stub
    - Navigation - contains files of navigation
        - Stacks - contains files of stacks
            - MainStack.tsx - main navigation stack
            - index.ts - file for stack export
        - Navigation.tsx - contains navigation RootStack
        - NavigationTypes.tsx - contains types for navigation
        - index.ts - export file for navigation
 - interface - contains frequently used interfaces and interfaces of actions
 - reducers - contains redux handlers
    - stories.reducer.ts - contains reducer to work with the list on the main page
 - resources - resources folder
    - R.ts - contains all the application resources (images, colors, text, url)).
    - constants - contains files with variables of the whole project
 - screens - contains screens and info about them.
    - List - main page with the list of data
 - store - contains the editor's settings.
 - utility - contains custom functions.
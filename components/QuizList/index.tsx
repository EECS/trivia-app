// We need to take a question component that will take in a QUESTION OBJECT
// Going to pass in the correct item in the questions array based off the CURRENT QUESTION/ITEM that youre on
// We set the "current question" to 1 for now, but it'll be an off-by-1 problem, so we might want to subtract 1 when we access that value (set it to 1 to avoid any '0' falsy weirdness)
// You're also going to want to use the CURRENT QUESTION NUMBER to CONDITIONALLY RENDER the quiz CONFIGURE OR the QUIZ QUESTION
// if current question exsits, then render the quiz item, and pass the question to it, else the quiz configure
    // Basically saying: Won't change page until there's an actual question to display
    
    // "React ecosystems are dumb" - Sean
    // "Components should be stupid - not a lot of logic. They should be just taking in props and not really knowing/caring waht parameters are"
    // Button doesn't care what happens when it's clicked - the USER/PARENT COMPONENTS care what happens thought
    // If you have an ABSTRACT COMPONENT (like a Button) - you do not want product-specific code in an abstract component
        // Abstract the "Select" like Sean did with the Button - Abstract the select like we did with the button (make a Select folder, make an index, import Select from react-select, put it in that component, and then have the handles + values (onChange, value, etc));
        // Should not have anything related to the actual difficulty select or quiz itself - should literally just have "onChange, options, value" ("if I saw 'difficulty' in there, that's BAD - don't do it)
        // Do it just like Sean did the button
        // ABSTRACT SELECT COMPONENT
        // Make a Card and put it in your Trello Board Backlog
            // Whats the next thing you wanna do?
                // Make cards about the next steps you want to do
                // "When you find something/know something you want to do, write it down"
                // You need to track stuff, write it down, make project boards
                // i.e., if you find a bug, don't drop everything you're doing right then - ADD IT TO THE LIST and make sure it's tracked and you're aware
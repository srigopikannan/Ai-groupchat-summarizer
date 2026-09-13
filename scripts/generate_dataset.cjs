const fs = require('fs');
const path = require('path');

const members = [
  { id: 'rahul', name: 'Rahul', color: '#53bdeb' },
  { id: 'priya', name: 'Priya', color: '#e542a3' },
  { id: 'arun', name: 'Arun', color: '#25d366' },
  { id: 'meena', name: 'Meena', color: '#e69138' },
  { id: 'karthik', name: 'Karthik', color: '#9b59b6' },
  { id: 'user', name: 'You', color: '#128c7e' }
];

// Helper to format timestamps
function getTime(hour, minute) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const m = minute < 10 ? '0' + minute : '' + minute;
  return `${h}:${m} ${ampm}`;
}

// Key milestones to anchor at specific message indexes (1-based):
// msg_68: Decision on Design Option 2
// msg_224: Priya asks unanswered question: "Are we submitting the report on Monday?"
// msg_287: Important update: Presentation venue changed from Room 101 to Room 204
// msg_305: Answered question: "Has the professor confirmed the presentation date?" -> Arun confirms March 18 at 10:00 AM
// msg_320: Decision on Presentation order
// msg_326: Other info: Presentation strictly under 10 minutes
// msg_342: Other info: Professor requested IEEE double-column format with bibliography
// msg_362: Action item: Rahul finish documentation by Sunday evening
// msg_365: Action item: Priya finish presentation slides (12 slides)
// msg_368: Action item: Arun prepare project demo & offline backup
// msg_370: Action item: Meena compile test logs & benchmark metrics
// msg_371: Action item: Karthik format final report into IEEE double-column PDF
// msg_372: Decision on Team Meeting: Friday at 4:00 PM in Room 204
// msg_390: Other info: Everyone bring laptop and charger

const realisticDayConversations = [
  // Day 1: March 12, 2026 - Project ideation & UI/UX debate (85 msgs)
  {
    date: 'Wednesday, March 12, 2026',
    topics: [
      { sender: 'arun', text: 'Hey team! Starting the official group for our Capstone Project.' },
      { sender: 'priya', text: 'Hey Arun! Glad we got this group set up. We have just 2 weeks left before reviews.' },
      { sender: 'rahul', text: 'Hey everyone! Yeah, let\'s make sure we stay coordinated here.' },
      { sender: 'meena', text: 'Hi all! Has everyone checked the project guideline PDF sent by Dr. Sharma?' },
      { sender: 'karthik', text: 'Yes, downloaded it. We need a functional demo, system architecture documentation, and final presentation.' },
      { sender: 'user', text: 'Hey guys! Ready to get started. Let\'s finalize the scope first.' },
      { sender: 'arun', text: 'Agreed. Are we going with the Smart Campus IoT idea or the AI Collaboration Assistant?' },
      { sender: 'rahul', text: 'IoT hardware is risky because if sensor delivery gets delayed, we will be stuck.' },
      { sender: 'priya', text: 'I vote for the AI Collaboration Assistant. It is purely software, high utility, and much easier to test.' },
      { sender: 'meena', text: 'Plus we already have some mockups from last semester\'s lab work.' },
      { sender: 'karthik', text: 'Software stack will be much more reliable to demo live in front of the external evaluator.' },
      { sender: 'user', text: 'Definitely. The AI Collaboration tool is a much stronger pick.' },
      { sender: 'arun', text: 'Awesome, consensus reached on topic: AI Collaboration & Intelligent Summarizer.' },
      { sender: 'priya', text: 'What tech stack are we thinking? React on frontend with Tailwind?' },
      { sender: 'rahul', text: 'Yes, React + TypeScript + Tailwind for UI. Fast, reactive, and looks great.' },
      { sender: 'karthik', text: 'For backend, FastAPI or Node.js Express?' },
      { sender: 'rahul', text: 'FastAPI with async endpoints handles streaming responses nicely.' },
      { sender: 'arun', text: 'Sounds solid. I will set up the GitHub organization and repo structure.' },
      { sender: 'meena', text: 'Make sure to add branch protection rules on main so nobody accidentally overwrites.' },
      { sender: 'arun', text: 'Done, invite links sent to everyone\'s university email.' },
      { sender: 'priya', text: 'Received and accepted! Setting up Figma workspace now.' },
      { sender: 'rahul', text: 'I am starting on the database schema. Users, channels, messages, and summary vectors.' },
      { sender: 'karthik', text: 'Should we support SQLite for local dev and Postgres for production demo?' },
      { sender: 'rahul', text: 'Yes, SQLAlchemy ORM will allow seamless switching between both.' },
      { sender: 'user', text: 'Great. What about the UI layout? WhatsApp-inspired or Slack-inspired?' },
      { sender: 'priya', text: 'WhatsApp style is familiar to everyone and makes group chat summarization immediately intuitive.' },
      { sender: 'meena', text: 'True, people struggle with WhatsApp groups that have hundreds of unread messages.' },
      { sender: 'arun', text: 'Priya, can you prepare two quick design prototypes in Figma?' },
      { sender: 'priya', text: 'Working on it right now. Giving Option 1 (compact classic) and Option 2 (modern dark-mode card-based with AI panel).' },
      { sender: 'rahul', text: 'Option 2 sounds much more impactful for presentation.' },
      { sender: 'karthik', text: 'How are we handling message parsing speed for 400+ messages?' },
      { sender: 'arun', text: 'We can optimize the client-side rendering with virtualized lists and memoized bubble components.' },
      { sender: 'meena', text: 'That will keep frame rates at 60 FPS even on low-end laptops.' },
      { sender: 'user', text: 'Good point. Stuttering during live demo will cost us points.' },
      { sender: 'priya', text: 'Figma prototypes are live! Check the shared link.' },
      { sender: 'arun', text: 'Looking at Option 1 and Option 2 now.' },
      { sender: 'meena', text: 'Option 2 has much clearer contrast on the AI action buttons.' },
      { sender: 'karthik', text: 'Yes, the rounded chat bubbles and the emerald accent in Option 2 look very clean.' },
      { sender: 'rahul', text: 'Option 2 is cleaner and supports dark mode natively. Let\'s lock in Design Option 2.' }, // anchor msg_68 will be near here
      { sender: 'priya', text: 'Agreed, Option 2 it is! I will export all CSS tokens and color palettes.' },
      { sender: 'user', text: 'Design Option 2 approved by all. Moving forward with that.' },
      { sender: 'arun', text: 'Great! Milestone 1 completed on Day 1.' },
      { sender: 'meena', text: 'I will start preparing the test plan document based on Option 2 specifications.' },
      { sender: 'rahul', text: 'Pushing initial FastAPI boilerplate to the dev branch.' },
      { sender: 'karthik', text: 'Cloning and running docker-compose now.' },
      { sender: 'arun', text: 'Good progress today everyone. Let\'s rest and start coding sprints tomorrow morning.' }
    ]
  },
  // Day 2: March 13, 2026 - Architecture, coding & database (90 msgs)
  {
    date: 'Thursday, March 13, 2026',
    topics: [
      { sender: 'karthik', text: 'Morning team! Anyone online? Running into a Postgres connection pool error on local docker.' },
      { sender: 'rahul', text: 'Morning Karthik. Did you set `pool_pre_ping=True` in the engine config?' },
      { sender: 'karthik', text: 'Ah, let me check... that fixed it! Thanks Rahul.' },
      { sender: 'priya', text: 'Morning! Pushed the UI layout components for the chat list and header.' },
      { sender: 'user', text: 'Checking the frontend build. Looks really crisp Priya.' },
      { sender: 'arun', text: 'I am integrating the AI extraction pipeline today. Testing how it handles large conversation chunks.' },
      { sender: 'meena', text: 'What is the token limit if someone pastes 500 messages?' },
      { sender: 'arun', text: 'We chunk messages chronologically and extract structured JSON with strict schema validation.' },
      { sender: 'rahul', text: 'Schema validation is crucial. We must ensure every extracted point links back to its exact source message ID.' },
      { sender: 'priya', text: 'Yes! The "View Source" button will be the killer feature. Users want to verify AI claims.' },
      { sender: 'meena', text: 'Exactly. In court or business contexts, you cannot trust an unverified AI hallucination.' },
      { sender: 'karthik', text: 'So every summary card will have a `source_message_ids` array.' },
      { sender: 'arun', text: 'Yes, when clicked, the chat view will auto-scroll to that exact message bubble and trigger a highlight animation.' },
      { sender: 'user', text: 'Love that. That makes the demo super interactive and credible.' },
      { sender: 'rahul', text: 'I noticed some lag when loading 400 messages at once. Let\'s make sure React renders smoothly.' },
      { sender: 'priya', text: 'Already on it! Using efficient key props and keeping bubble DOM nodes lightweight.' },
      { sender: 'karthik', text: 'Added message timestamp formatting helper. Handles AM/PM and grouping by date.' },
      { sender: 'meena', text: 'Testing cross-browser compatibility on Chrome, Edge, and Firefox.' },
      { sender: 'arun', text: 'Pushed the AI summary prompt template to `/prompts/summarizer.ts`.' },
      { sender: 'user', text: 'Reviewed PR #4. Merged into staging branch.' },
      { sender: 'priya', text: 'We also need empty states for chats without messages.' },
      { sender: 'rahul', text: 'Good catch. Added placeholder text and illustration.' }
    ]
  },
  // Day 3: March 14, 2026 - Feature polish, questions & testing (90 msgs)
  {
    date: 'Friday, March 14, 2026',
    topics: [
      { sender: 'arun', text: 'Hey team, we are making great time. Backend and frontend integrations are 80% done.' },
      { sender: 'priya', text: 'Are we submitting the report on Monday?' }, // UNANSWERED QUESTION!
      { sender: 'karthik', text: 'Wait guys, check the staging server! WebSockets just disconnected unexpectedly.' }, // Karthik interrupts, question ignored!
      { sender: 'rahul', text: 'Looking at the server logs right now... looks like an unhandled ping timeout.' },
      { sender: 'arun', text: 'Checking nginx proxy config. It was missing `proxy_read_timeout 3600;`.' },
      { sender: 'user', text: 'Deployed the proxy fix to staging. Reconnection works smoothly now.' },
      { sender: 'meena', text: 'Tested sending 50 rapid messages. No drops or duplicate key errors.' },
      { sender: 'priya', text: 'Pushed the new modal styling for the AI summary view.' },
      { sender: 'rahul', text: 'It has 10 tabs/sections right?' },
      { sender: 'arun', text: 'Yes: Overview, Topics, Dates, Venues, Important Info, Questions, Decisions, Action Items, Upcoming, and Other Info.' },
      { sender: 'karthik', text: 'The questions tab should separate answered questions from unanswered ones.' },
      { sender: 'meena', text: 'That is such a useful feature for busy team leads.' },
      { sender: 'user', text: 'Agreed. Knowing what is still pending answer saves hours of scrolling.' }
    ]
  },
  // Day 4: March 15, 2026 - Critical updates, venue change & presentation plan (85 msgs)
  {
    date: 'Saturday, March 15, 2026',
    topics: [
      { sender: 'arun', text: 'Guys, urgent update from department notice board: the presentation venue has changed from Room 101 to Room 204 because of projector maintenance in 101.' }, // VENUE CHANGE
      { sender: 'priya', text: 'Oh wow, thanks for letting us know Arun! Room 204 has better seating anyway.' },
      { sender: 'rahul', text: 'Does Room 204 have HDMI or Type-C adapter?' },
      { sender: 'karthik', text: 'I checked yesterday, they have standard HDMI, but I will bring a Type-C dongle just in case.' },
      { sender: 'priya', text: 'Has the professor confirmed the presentation date?' }, // ANSWERED QUESTION
      { sender: 'arun', text: 'Yes, Dr. Sharma confirmed Tuesday, March 18 at 10:00 AM.' },
      { sender: 'meena', text: 'Got it. Tuesday, March 18 at 10:00 AM marked on calendar.' },
      { sender: 'user', text: 'What is our presentation order? Who presents what?' },
      { sender: 'arun', text: 'Let\'s fix the presentation order: Priya does the Intro, I\'ll do the live demo, Rahul & Karthik walk through the architecture and backend, and Meena wraps up with testing and conclusion.' },
      { sender: 'priya', text: 'Sounds perfect to me. I will introduce the problem statement and motivation.' },
      { sender: 'meena', text: 'Remember the professor said each team strictly has under 10 minutes. If we exceed 10 mins, they cut off the demo.' },
      { sender: 'rahul', text: 'Under 10 minutes is strict! We need to rehearse the demo so it takes at most 4 minutes.' },
      { sender: 'karthik', text: 'Professor emphasized the final report must strictly follow the IEEE double-column format with bibliography.' },
      { sender: 'priya', text: 'Do we have the LaTeX / Word template for IEEE double-column?' },
      { sender: 'karthik', text: 'Yes, downloaded it from IEEE website. I will format our writeup accordingly.' },
      { sender: 'user', text: 'Let\'s assign clear action items so everyone knows what to deliver.' }
    ]
  },
  // Day 5: March 16, 2026 - Action items, final dry run & meeting (77 msgs)
  {
    date: 'Sunday, March 16, 2026',
    topics: [
      { sender: 'arun', text: 'Rahul, can you prepare the documentation and API endpoints overview?' },
      { sender: 'rahul', text: 'On it, will finish documentation by Sunday evening.' },
      { sender: 'rahul', text: 'Priya, please finish the presentation slides.' },
      { sender: 'priya', text: 'Working on it, will have all 12 slides ready by tomorrow.' },
      { sender: 'priya', text: 'Arun, please prepare the project demo and test the offline backup.' },
      { sender: 'arun', text: 'Yes, demo is 90% ready, creating offline local docker container today.' },
      { sender: 'meena', text: 'I will compile all test coverage reports and benchmark metrics by Monday noon.' },
      { sender: 'karthik', text: 'I will take Rahul\'s docs and assemble the IEEE double-column PDF report.' },
      { sender: 'arun', text: 'Should we meet Thursday or Friday for the dry run?' },
      { sender: 'meena', text: 'Friday works better for me after 3 PM.' },
      { sender: 'rahul', text: 'Okay, Friday at 4:00 PM in Room 204 then.' },
      { sender: 'user', text: 'Friday 4:00 PM Room 204 confirmed.' },
      { sender: 'priya', text: 'Everyone please make sure to bring your laptop and charger to the meeting on Friday.' },
      { sender: 'karthik', text: 'Will bring my extension cord as well.' },
      { sender: 'arun', text: 'Also confirmed with CR: Final report submission deadline is Thursday, March 20 at 11:59 PM on the portal.' },
      { sender: 'rahul', text: 'Awesome, that gives us two days after the presentation to polish the final PDF.' },
      { sender: 'meena', text: 'Team work has been great guys. This project is turning out really solid.' }
    ]
  }
];

// Conversational filler phrases and natural chat exchanges to expand realistic dialog to 427 messages
const fillers = [
  "Nice catch!",
  "Taking a look at this right now.",
  "Let me pull the latest changes from dev branch.",
  "Build succeeded without any warnings.",
  "Can you share the console output?",
  "Found the bug, it was a null check missing in the reducer.",
  "Just committed the unit test for that case.",
  "How does the responsive layout look on mobile screen size?",
  "Looks great! Fits nicely on 375px width.",
  "Added tooltips to the icon buttons.",
  "Did you test the export to PDF button?",
  "Testing it now... worked smoothly.",
  "Make sure we don't commit the `.env` file with local secrets.",
  "Added `.env` and `*.local` to `.gitignore`.",
  "The search query indexing is very fast now.",
  "I will check the rubric criteria for grading.",
  "Criterion 1 is system architecture (25%), Demo is 40%, Presentation is 20%, Q&A is 15%.",
  "Demo carrying 40% means we must nail the live walkthrough.",
  "Agreed. That's why the AI Summarizer demo needs to be flawless.",
  "I'm confident. The source message highlighting looks super impressive.",
  "Pushing another minor tweak to styling.",
  "Let's make sure our commit messages follow conventional commits (feat:, fix:, docs:).",
  "Got it, using conventional commits.",
  "All tests passing with 94% code coverage.",
  "Impressive coverage Meena!",
  "Thanks! Added edge cases for empty chat history and special characters.",
  "Did we check how emoji rendering looks?",
  "Yes, native emojis look clean on Windows and macOS.",
  "I will run another dry run on my machine.",
  "Everything looks synchronized and ready."
];

// Let's generate exactly 427 messages with accurate distribution and timestamps!
const totalTarget = 427;
const messages = [];

// We will map out key messages at specific target indexes:
// Key indexes (1-based):
// msg_68: Decision on Design Option 2
// msg_224: Unanswered question from Priya: "Are we submitting the report on Monday?"
// msg_287: Venue change update from Arun: Room 101 -> Room 204
// msg_305: Answered question: "Has the professor confirmed the presentation date?" -> Arun confirms March 18 at 10:00 AM
// msg_320: Presentation order decision
// msg_326: Presentation strictly under 10 minutes
// msg_342: IEEE double-column format requirement
// msg_362: Action item - Rahul: Finish documentation
// msg_365: Action item - Priya: Finish presentation slides
// msg_368: Action item - Arun: Prepare project demo & offline backup
// msg_370: Action item - Meena: Compile test logs & benchmark metrics
// msg_371: Action item - Karthik: Assemble IEEE report
// msg_372: Decision - Team meeting Friday at 4:00 PM in Room 204
// msg_390: Other info - Bring laptop and charger
// msg_415: Submission deadline confirmed - March 20, 11:59 PM

// We distribute messages across 5 days:
// Day 1 (msgs 1 - 85): Wednesday, March 12, 2026
// Day 2 (msgs 86 - 175): Thursday, March 13, 2026
// Day 3 (msgs 176 - 265): Friday, March 14, 2026
// Day 4 (msgs 266 - 355): Saturday, March 15, 2026
// Day 5 (msgs 356 - 427): Sunday, March 16, 2026

const dayRanges = [
  { day: 1, date: 'Wednesday, March 12, 2026', start: 1, end: 85, startHour: 9, startMin: 0 },
  { day: 2, date: 'Thursday, March 13, 2026', start: 86, end: 175, startHour: 10, startMin: 15 },
  { day: 3, date: 'Friday, March 14, 2026', start: 176, end: 265, startHour: 11, startMin: 30 },
  { day: 4, date: 'Saturday, March 15, 2026', start: 266, end: 355, startHour: 13, startMin: 0 },
  { day: 5, date: 'Sunday, March 16, 2026', start: 356, end: 427, startHour: 15, startMin: 45 },
];

// Special fixed messages:
const fixedMessages = {
  68: {
    senderId: 'rahul',
    text: "Option 2 is much cleaner, has better contrast, and supports dark mode natively. Let's lock in Design Option 2 as our official UI."
  },
  69: {
    senderId: 'priya',
    text: "Agreed, Design Option 2 it is! I'm locking the Figma styles and exporting the design tokens."
  },
  70: {
    senderId: 'user',
    text: "Great! Decision made: Design Option 2 selected. Moving forward with development."
  },
  224: {
    senderId: 'priya',
    text: "Are we submitting the report on Monday?"
  },
  225: {
    senderId: 'karthik',
    text: "Wait guys, urgent alert on staging! The WebSocket server just dropped all active connection sockets."
  },
  226: {
    senderId: 'rahul',
    text: "Looking at the server traceback right now... looks like an unhandled ping timeout on the heartbeat loop."
  },
  287: {
    senderId: 'arun',
    text: "Guys, urgent announcement from the department notice board: the presentation venue has changed from Room 101 to Room 204 due to projector maintenance in 101."
  },
  288: {
    senderId: 'priya',
    text: "Thanks for the heads up Arun! Room 204 is actually much better, better acoustic panels and seats."
  },
  289: {
    senderId: 'meena',
    text: "Noted! Updating my calendar and notes to Room 204."
  },
  305: {
    senderId: 'priya',
    text: "Has the professor confirmed the presentation date and time slot?"
  },
  306: {
    senderId: 'arun',
    text: "Yes, Dr. Sharma confirmed our slot: Tuesday, March 18 at 10:00 AM."
  },
  307: {
    senderId: 'rahul',
    text: "Tuesday March 18 at 10:00 AM noted! We are slot #2 right after the robotics team."
  },
  320: {
    senderId: 'arun',
    text: "Let's finalize the presentation speaking order: 1. Priya does Introduction & Problem Statement, 2. Arun does System Architecture & Live Demo, 3. Rahul & Karthik present Backend & Security, 4. Meena concludes with Testing, Performance & Results."
  },
  321: {
    senderId: 'priya',
    text: "Agreed on presentation order! I will keep the introduction crisp so Arun has enough demo time."
  },
  322: {
    senderId: 'meena',
    text: "Works for me! I have all the test coverage graphs ready for the conclusion slide."
  },
  326: {
    senderId: 'meena',
    text: "Crucial rule from professor: the entire presentation must strictly be under 10 minutes. The timer starts the second Priya speaks, and at 10:00 they cut off questions."
  },
  327: {
    senderId: 'rahul',
    text: "Under 10 minutes is strict. Let's aim for an 8-minute run so we have a 2-minute safety buffer."
  },
  342: {
    senderId: 'karthik',
    text: "Reminder from Dr. Sharma: the project report must strictly follow the IEEE double-column format with formal references and bibliography."
  },
  343: {
    senderId: 'rahul',
    text: "Thanks Karthik, please make sure the font sizes and margins comply with IEEE standards."
  },
  362: {
    senderId: 'arun',
    text: "Rahul, can you prepare the documentation and write up the API endpoints specification?"
  },
  363: {
    senderId: 'rahul',
    text: "Yes, I will finish the documentation and Swagger export by Sunday evening."
  },
  365: {
    senderId: 'rahul',
    text: "Priya, please finish the presentation slides so we can review them."
  },
  366: {
    senderId: 'priya',
    text: "On it! I will prepare the 12 presentation slides and send the draft by tomorrow morning."
  },
  368: {
    senderId: 'priya',
    text: "Arun, please prepare the project demo and set up an offline backup in case Wi-Fi fails."
  },
  369: {
    senderId: 'arun',
    text: "Already building the standalone docker image with local models so the demo works 100% offline."
  },
  370: {
    senderId: 'meena',
    text: "I will compile all test coverage reports and benchmark metrics by Monday noon."
  },
  371: {
    senderId: 'karthik',
    text: "I will take Rahul's docs and assemble the final report into the IEEE double-column PDF."
  },
  372: {
    senderId: 'arun',
    text: "Should we meet Thursday or Friday for our final rehearsal?"
  },
  373: {
    senderId: 'meena',
    text: "Friday works much better for everyone after lab classes end at 3:30."
  },
  374: {
    senderId: 'rahul',
    text: "Okay, decided: Team Meeting will happen on Friday at 4:00 PM in Room 204."
  },
  375: {
    senderId: 'user',
    text: "Perfect. Friday 4:00 PM in Room 204 locked in."
  },
  390: {
    senderId: 'priya',
    text: "Everyone please remember to bring your laptop and power adapter to the rehearsal so we can test the HDMI switch."
  },
  391: {
    senderId: 'karthik',
    text: "I will also bring my multi-port power strip and HDMI-to-USB-C dongle."
  },
  415: {
    senderId: 'arun',
    text: "Final confirmation from the academic office: the final report submission deadline is Thursday, March 20 at 11:59 PM on the online student portal."
  },
  416: {
    senderId: 'rahul',
    text: "March 20 submission confirmed. That gives us two days after the Tuesday presentation to incorporate faculty feedback into the final PDF."
  },
  426: {
    senderId: 'priya',
    text: "Everything is falling into place! Great teamwork everyone."
  },
  427: {
    senderId: 'user',
    text: "Agreed! Rest well tonight and see you all in Room 204."
  }
};

// Natural conversational message pool for each phase
const phase1Messages = [
  { sender: 'rahul', text: "Let's review the rubric for the architecture section." },
  { sender: 'priya', text: "I sketched the user journey from login to chat summary." },
  { sender: 'meena', text: "Are we including sample datasets for the testing review?" },
  { sender: 'karthik', text: "Yes, I will generate a realistic synthetic message pool for our tests." },
  { sender: 'arun', text: "We need to ensure latency for summarization stays under 2 seconds." },
  { sender: 'user', text: "A progress indicator with multi-step status messages will make the wait feel instant." },
  { sender: 'rahul', text: "Great idea. 'Analyzing chat', 'Extracting topics', 'Formatting summary'." },
  { sender: 'priya', text: "I will add subtle animation states in the UI for each step." },
  { sender: 'karthik', text: "Database ER diagram is drafted. 4 primary tables." },
  { sender: 'meena', text: "Checked the ER diagram. Normalized up to 3NF, looks great." },
  { sender: 'arun', text: "Git repo initialized. Everyone push your public SSH keys." },
  { sender: 'rahul', text: "Pushed my key and cloned the repo." },
  { sender: 'priya', text: "Cloned successfully. Creating the `/components` folder structure." },
  { sender: 'user', text: "Let's make sure we use TypeScript with strict null checks." },
  { sender: 'rahul', text: "`tsconfig.json` updated with `strict: true`." },
  { sender: 'meena', text: "Added ESLint rules for consistent code formatting." },
  { sender: 'karthik', text: "Testing the local dev environment with `npm run dev`." },
  { sender: 'arun', text: "Vite HMR is blazing fast." },
  { sender: 'priya', text: "Color palette locked: Dark slate `#0c1317`, WhatsApp teal `#00a884`, subtle borders." },
  { sender: 'rahul', text: "Chat bubble contrast matches accessibility WCAG AA standards." },
  { sender: 'meena', text: "High contrast makes it very legible even on dim projectors." }
];

const phase2Messages = [
  { sender: 'arun', text: "Started on the chunking algorithm for long conversation threads." },
  { sender: 'rahul', text: "Are we passing message IDs along with each text line to the prompt?" },
  { sender: 'arun', text: "Yes! Format is `[msg_id] Sender: Text`. That allows the model to cite exact IDs." },
  { sender: 'user', text: "That is key for the 'View Source' feature." },
  { sender: 'karthik', text: "Testing message ingestion with 100 sample messages." },
  { sender: 'priya', text: "Header component is ready. Shows group name, member count, and AI banner." },
  { sender: 'meena', text: "The banner '✨ Use AI to Summarize' is very prominent. Impossible to miss." },
  { sender: 'rahul', text: "Added double checkmark icons for delivered and read states." },
  { sender: 'priya', text: "Added avatar colored initials for Rahul, Arun, Karthik, Meena." },
  { sender: 'user', text: "Can we also allow sending new messages in the chat?" },
  { sender: 'arun', text: "Yes, local state appends newly sent messages to the thread instantly." },
  { sender: 'karthik', text: "Pushed migration script for user sessions." },
  { sender: 'meena', text: "Running load test on state updates with 500 messages in memory." },
  { sender: 'meena', text: "Memory usage is steady at ~28MB heap, no leaks detected." },
  { sender: 'rahul', text: "Clean garbage collection. React 19 fiber reconciliation is smooth." },
  { sender: 'priya', text: "Tweaking the scroll behavior so it doesn't jump abruptly." },
  { sender: 'user', text: "Smooth scroll into view with `block: 'center'` works best." },
  { sender: 'arun', text: "Also added a 2-second glowing ring around the target message." }
];

const phase3Messages = [
  { sender: 'karthik', text: "Reviewed the question extraction module." },
  { sender: 'rahul', text: "How does it detect if a question was answered?" },
  { sender: 'arun', text: "It looks for follow-up responses in the same thread or conversation context." },
  { sender: 'meena', text: "And if nobody responded or the conversation pivoted, it flags it as Unanswered." },
  { sender: 'user', text: "That's super practical. So many questions get buried in active groups." },
  { sender: 'priya', text: "Added badge tags: Green for 'Answered' and Amber for 'Unanswered'." },
  { sender: 'rahul', text: "Decision extraction is also working cleanly." },
  { sender: 'karthik', text: "It captures the context and who made the final call." },
  { sender: 'arun', text: "Action items format: Assignee, Task description, Deadline, Status." },
  { sender: 'meena', text: "Added filter tabs in the AI summary modal so you can jump to specific categories." },
  { sender: 'priya', text: "Yes, you can view All, or filter by Decisions, Dates, Tasks, Questions." },
  { sender: 'user', text: "The split-screen / side drawer option on wide monitors is super slick." },
  { sender: 'rahul', text: "Let's test on different screen aspect ratios: 16:9, 16:10, and tablet view." }
];

const phase4Messages = [
  { sender: 'arun', text: "Drafted the system architecture slide for Dr. Sharma's review." },
  { sender: 'priya', text: "Slide deck has 12 slides total: Cover, Problem, Existing Solutions, Our Approach, Architecture, AI Extraction Pipeline, Source Grounding, Tech Stack, Live Demo, Test Metrics, Future Work, Conclusion." },
  { sender: 'meena', text: "Slide count is ideal for a 10-minute presentation. About 45-50 seconds per slide." },
  { sender: 'rahul', text: "Rehearsing my section: 1 minute 30 seconds on backend and structured schema." },
  { sender: 'karthik', text: "My section: 1 minute on database and vector indexing." },
  { sender: 'user', text: "Arun's live demo will be the centerpiece: 3.5 minutes." },
  { sender: 'arun', text: "Yes, I will open the app, show the 400+ messages group, click 'Use AI to Summarize', show the 10 sections, and click 'View Source' to verify." },
  { sender: 'priya', text: "That demo sequence directly addresses the grading criteria." },
  { sender: 'meena', text: "Professor loves live source verification. Other teams usually just show static slides." },
  { sender: 'karthik', text: "Making sure our report PDF has high-resolution vector diagrams." }
];

const phase5Messages = [
  { sender: 'rahul', text: "Documentation markdown is complete. Includes API specs, setup guide, and schema definitions." },
  { sender: 'priya', text: "Slides are exported in both PPTX and PDF formats as backup." },
  { sender: 'arun', text: "Offline demo container tested with network disabled. Summarizer works instantly." },
  { sender: 'meena', text: "Test summary report: 68 automated unit tests passed, 0 failures." },
  { sender: 'karthik', text: "IEEE double-column format compiled. 8 pages total, including references." },
  { sender: 'user', text: "Ready for our Friday rehearsal in Room 204 at 4:00 PM." },
  { sender: 'priya', text: "Don't forget laptops, chargers, and dongles!" },
  { sender: 'rahul', text: "Setting alarm for Friday 3:30 PM." },
  { sender: 'arun', text: "See everyone in Room 204 on Friday." }
];

// Combine and generate exactly 427 messages
for (let i = 1; i <= totalTarget; i++) {
  const id = `msg_${i}`;
  
  // Find which day range
  const range = dayRanges.find(r => i >= r.start && i <= r.end);
  const dayIndex = range.day;
  const dateStr = range.date;
  
  // Calculate a realistic time progression within the day
  const progressInDay = (i - range.start) / (range.end - range.start);
  const minutesTotal = Math.floor(progressInDay * 420); // spread across 7 hours
  const currentHour = range.startHour + Math.floor((range.startMin + minutesTotal) / 60);
  const currentMin = (range.startMin + minutesTotal) % 60;
  const timeStr = getTime(currentHour, currentMin);
  
  let senderId = '';
  let text = '';
  
  if (fixedMessages[i]) {
    senderId = fixedMessages[i].senderId;
    text = fixedMessages[i].text;
  } else {
    // Pick pool based on day
    let pool;
    if (dayIndex === 1) pool = phase1Messages;
    else if (dayIndex === 2) pool = phase2Messages;
    else if (dayIndex === 3) pool = phase3Messages;
    else if (dayIndex === 4) pool = phase4Messages;
    else pool = phase5Messages;
    
    const item = pool[(i * 7 + 13) % pool.length];
    senderId = item.sender;
    
    // Add variations so messages feel lively and non-repeating
    const fillerItem = fillers[(i * 11 + 3) % fillers.length];
    if (i % 5 === 0) {
      text = `${item.text} ${fillerItem}`;
    } else if (i % 7 === 0) {
      text = `${fillerItem} ${item.text}`;
    } else {
      text = item.text;
    }
  }
  
  const member = members.find(m => m.id === senderId) || members[0];
  const isUser = senderId === 'user';
  
  messages.push({
    id,
    senderId,
    senderName: isUser ? 'You' : member.name,
    senderColor: member.color,
    text,
    timestamp: timeStr,
    date: dateStr,
    isUser
  });
}

console.log(`Generated ${messages.length} messages for College Project Team.`);

// Write out src/data/collegeProjectMessages.ts
const messagesTsContent = `import type { Message } from '../types';

export const collegeProjectMessages: Message[] = ${JSON.stringify(messages, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'collegeProjectMessages.ts'), messagesTsContent);
console.log('Wrote collegeProjectMessages.ts successfully.');

// Now write src/data/aiSummaryData.ts with exact 10 sections grounded in message IDs!
const aiSummary = {
  chatId: 'college-project-team',
  chatName: 'College Project Team',
  messageCount: 427,
  overview: "This group is mainly about the college capstone project (AI Collaboration & Intelligent Summarizer), presentation preparation, team responsibilities, technical debugging, meeting coordination, and final IEEE report submission.",
  key_topics: [
    {
      id: 'topic-1',
      title: "Project Development & Architecture",
      description: "The team selected the AI Collaboration Assistant over IoT hardware, established React + TypeScript + Tailwind for UI, FastAPI backend with SQLAlchemy, and tested local SQLite/Postgres compatibility.",
      source_message_ids: ["msg_6", "msg_7", "msg_9", "msg_15", "msg_17", "msg_21"]
    },
    {
      id: 'topic-2',
      title: "Presentation Planning & Speaking Order",
      description: "Members finalized the presentation structure, slide deck (12 slides), speaking order among all 6 team members, and strictly adhering to the 10-minute time constraint.",
      source_message_ids: ["msg_320", "msg_321", "msg_322", "msg_326", "msg_327"]
    },
    {
      id: 'topic-3',
      title: "Final Submission & IEEE Report",
      description: "Coordination of the final documentation, adherence to the IEEE double-column format with formal citations, and final portal upload.",
      source_message_ids: ["msg_342", "msg_343", "msg_371", "msg_415", "msg_416"]
    },
    {
      id: 'topic-4',
      title: "Team Meeting & Demo Rehearsals",
      description: "Arranging dry runs, testing offline Docker containers to guard against unreliable Wi-Fi, and confirming room logistics.",
      source_message_ids: ["msg_368", "msg_369", "msg_372", "msg_373", "msg_374", "msg_390"]
    }
  ],
  important_dates: [
    {
      id: 'date-1',
      date: "Friday, March 14 / Rehearsal",
      title: "Team Rehearsal Meeting",
      description: "Team rehearsal and equipment check at 4:00 PM in Room 204.",
      source_message_ids: ["msg_372", "msg_374", "msg_375"]
    },
    {
      id: 'date-2',
      date: "Tuesday, March 18, 10:00 AM",
      title: "Project Presentation & Faculty Evaluation",
      description: "Official capstone evaluation slot #2 before Dr. Sharma and external evaluators.",
      source_message_ids: ["msg_305", "msg_306", "msg_307"]
    },
    {
      id: 'date-3',
      date: "Thursday, March 20, 11:59 PM",
      title: "Final Report Submission Deadline",
      description: "Final PDF submission deadline on the university student portal.",
      source_message_ids: ["msg_415", "msg_416"]
    }
  ],
  venues: [
    {
      id: 'venue-1',
      name: "Room 204",
      description: "Official presentation and rehearsal venue. Changed from Room 101 due to projector maintenance issues in 101.",
      previousVenue: "Room 101",
      source_message_ids: ["msg_287", "msg_288", "msg_289", "msg_374"]
    }
  ],
  important_information: [
    {
      id: 'info-1',
      title: "Presentation Venue Relocated to Room 204",
      description: "Urgent update from department notice board: presentation venue moved from Room 101 to Room 204 because Room 101 projector is undergoing maintenance.",
      badge: "Crucial Update",
      source_message_ids: ["msg_287", "msg_288"]
    },
    {
      id: 'info-2',
      title: "Strict 10-Minute Presentation Cutoff",
      description: "Faculty strictly enforces an under-10-minute presentation cutoff. Timer begins immediately when introduction starts; team planned an 8-minute presentation with a 2-minute buffer.",
      badge: "Time Limit",
      source_message_ids: ["msg_326", "msg_327"]
    },
    {
      id: 'info-3',
      title: "Mandatory IEEE Double-Column Format",
      description: "Dr. Sharma explicitly required the final report to strictly follow IEEE double-column format with bibliography and formal references.",
      badge: "Report Guideline",
      source_message_ids: ["msg_342", "msg_343"]
    },
    {
      id: 'info-4',
      title: "Bring Laptop & Power Adapter",
      description: "All members must bring their laptops and power adapters for testing HDMI switching during the dry run.",
      badge: "Preparation",
      source_message_ids: ["msg_390", "msg_391"]
    }
  ],
  questions: {
    answered: [
      {
        id: 'q-ans-1',
        question: "Has the professor confirmed the presentation date and time slot?",
        askedBy: "Priya",
        answeredBy: "Arun",
        answerSummary: "Dr. Sharma confirmed our presentation slot for Tuesday, March 18 at 10:00 AM (slot #2).",
        source_message_ids: ["msg_305", "msg_306", "msg_307"]
      },
      {
        id: 'q-ans-2',
        question: "Should we meet Thursday or Friday for our final rehearsal?",
        askedBy: "Arun",
        answeredBy: "Rahul & Meena",
        answerSummary: "Friday works better after 3:30 PM lab classes; team agreed on Friday at 4:00 PM in Room 204.",
        source_message_ids: ["msg_372", "msg_373", "msg_374"]
      },
      {
        id: 'q-ans-3',
        question: "What is our presentation speaking order?",
        askedBy: "You",
        answeredBy: "Arun",
        answerSummary: "Order finalized: 1. Priya (Intro), 2. Arun (Demo), 3. Rahul & Karthik (Backend), 4. Meena (Conclusion).",
        source_message_ids: ["msg_320", "msg_321", "msg_322"]
      }
    ],
    unanswered: [
      {
        id: 'q-unans-1',
        question: "Are we submitting the report on Monday?",
        askedBy: "Priya",
        context: "Asked when discussing submission timelines; conversation was immediately interrupted by an urgent WebSocket staging server crash and remained unanswered in that thread.",
        source_message_ids: ["msg_224", "msg_225"]
      }
    ]
  },
  decisions: [
    {
      id: 'dec-1',
      decision: "Selected Design Option 2 as Official UI",
      context: "Chose Option 2 over Option 1 due to cleaner contrast, native dark mode support, and intuitive AI summarizer placement.",
      decidedBy: "Team Consensus (Rahul, Priya, You)",
      source_message_ids: ["msg_68", "msg_69", "msg_70"]
    },
    {
      id: 'dec-2',
      decision: "Final Rehearsal Meeting Set for Friday at 4:00 PM",
      context: "Accommodates all members after Friday laboratory classes conclude.",
      decidedBy: "Rahul, Meena, Arun",
      source_message_ids: ["msg_372", "msg_373", "msg_374", "msg_375"]
    },
    {
      id: 'dec-3',
      decision: "Presentation Venue Confirmed as Room 204",
      context: "Relocated from Room 101 due to projector breakdown.",
      decidedBy: "Department Notice / Arun",
      source_message_ids: ["msg_287", "msg_288", "msg_289"]
    },
    {
      id: 'dec-4',
      decision: "Presentation Speaking Sequence Finalized",
      context: "Priya (Intro) -> Arun (Demo & Arch) -> Rahul & Karthik (Backend/DB) -> Meena (Testing/Results).",
      decidedBy: "Arun, Priya, Meena",
      source_message_ids: ["msg_320", "msg_321", "msg_322"]
    }
  ],
  action_items: [
    {
      id: 'action-1',
      assignee: "Rahul",
      task: "Finish system documentation and export Swagger API endpoint specifications.",
      deadline: "Sunday evening",
      status: "in_progress",
      source_message_ids: ["msg_362", "msg_363"]
    },
    {
      id: 'action-2',
      assignee: "Priya",
      task: "Complete the 12 presentation slides and send draft for review.",
      deadline: "Monday morning",
      status: "in_progress",
      source_message_ids: ["msg_365", "msg_366"]
    },
    {
      id: 'action-3',
      assignee: "Arun",
      task: "Prepare the project live demo and test standalone offline Docker container.",
      deadline: "Sunday",
      status: "in_progress",
      source_message_ids: ["msg_368", "msg_369"]
    },
    {
      id: 'action-4',
      assignee: "Meena",
      task: "Compile all test coverage reports (68 tests) and benchmark metrics.",
      deadline: "Monday noon",
      status: "pending",
      source_message_ids: ["msg_370"]
    },
    {
      id: 'action-5',
      assignee: "Karthik",
      task: "Assemble documentation into IEEE double-column PDF report with references.",
      deadline: "Before final submission",
      status: "pending",
      source_message_ids: ["msg_342", "msg_371"]
    }
  ],
  upcoming_events: [
    {
      id: 'up-1',
      title: "Team Dry Run Rehearsal",
      date: "Friday, March 14",
      time: "4:00 PM",
      venue: "Room 204",
      notes: "Bring laptops, HDMI dongle, and power strip. Rehearse 8-minute run.",
      source_message_ids: ["msg_374", "msg_390", "msg_391"]
    },
    {
      id: 'up-2',
      title: "Capstone Project Presentation",
      date: "Tuesday, March 18",
      time: "10:00 AM",
      venue: "Room 204",
      notes: "Strict 10-minute limit. Slot #2 right after robotics team.",
      source_message_ids: ["msg_306", "msg_320", "msg_326"]
    },
    {
      id: 'up-3',
      title: "Final Report Submission Deadline",
      date: "Thursday, March 20",
      time: "11:59 PM",
      venue: "Student Portal (Online PDF)",
      notes: "IEEE double-column format with bibliography.",
      source_message_ids: ["msg_342", "msg_415", "msg_416"]
    }
  ],
  other_information: [
    {
      id: 'other-1',
      title: "Strict 10-Minute Presentation Limit",
      details: "Faculty will cut off questions if the presentation exceeds 10:00. The team has budgeted 8 minutes for the talk and 2 minutes buffer.",
      source_message_ids: ["msg_326", "msg_327"]
    },
    {
      id: 'other-2',
      title: "Hardware & Equipment Requirements",
      details: "Everyone must bring their laptop with chargers; Karthik is bringing a multi-port power strip and USB-C to HDMI adapter.",
      source_message_ids: ["msg_390", "msg_391"]
    },
    {
      id: 'other-3',
      title: "Offline Demo Container Safety Net",
      details: "Arun is running a local Docker container with bundled models so the demo does not depend on college Wi-Fi stability.",
      source_message_ids: ["msg_368", "msg_369"]
    },
    {
      id: 'other-4',
      title: "IEEE Double-Column Report Formatting",
      details: "The final report must strictly use the standard IEEE conference 2-column format with formal references and bibliography.",
      source_message_ids: ["msg_342", "msg_343"]
    }
  ]
};

const aiSummaryTsContent = `import type { AiSummaryData } from '../types';

export const collegeProjectAiSummary: AiSummaryData = ${JSON.stringify(aiSummary, null, 2)};
`;


fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'aiSummaryData.ts'), aiSummaryTsContent);
console.log('Wrote aiSummaryData.ts successfully.');

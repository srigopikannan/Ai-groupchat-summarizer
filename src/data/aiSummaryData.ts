import type { AiSummaryData } from '../types';

export const collegeProjectAiSummary: AiSummaryData = {
  "chatId": "college-project-team",
  "chatName": "College Project Team",
  "messageCount": 427,
  "overview": "This group is mainly about the college capstone project (AI Collaboration & Intelligent Summarizer), presentation preparation, team responsibilities, technical debugging, meeting coordination, and final IEEE report submission.",
  "key_topics": [
    {
      "id": "topic-1",
      "title": "Project Development & Architecture",
      "description": "The team selected the AI Collaboration Assistant over IoT hardware, established React + TypeScript + Tailwind for UI, FastAPI backend with SQLAlchemy, and tested local SQLite/Postgres compatibility.",
      "source_message_ids": [
        "msg_6",
        "msg_7",
        "msg_9",
        "msg_15",
        "msg_17",
        "msg_21"
      ]
    },
    {
      "id": "topic-2",
      "title": "Presentation Planning & Speaking Order",
      "description": "Members finalized the presentation structure, slide deck (12 slides), speaking order among all 6 team members, and strictly adhering to the 10-minute time constraint.",
      "source_message_ids": [
        "msg_320",
        "msg_321",
        "msg_322",
        "msg_326",
        "msg_327"
      ]
    },
    {
      "id": "topic-3",
      "title": "Final Submission & IEEE Report",
      "description": "Coordination of the final documentation, adherence to the IEEE double-column format with formal citations, and final portal upload.",
      "source_message_ids": [
        "msg_342",
        "msg_343",
        "msg_371",
        "msg_415",
        "msg_416"
      ]
    },
    {
      "id": "topic-4",
      "title": "Team Meeting & Demo Rehearsals",
      "description": "Arranging dry runs, testing offline Docker containers to guard against unreliable Wi-Fi, and confirming room logistics.",
      "source_message_ids": [
        "msg_368",
        "msg_369",
        "msg_372",
        "msg_373",
        "msg_374",
        "msg_390"
      ]
    }
  ],
  "important_dates": [
    {
      "id": "date-1",
      "date": "Friday, March 14 / Rehearsal",
      "title": "Team Rehearsal Meeting",
      "description": "Team rehearsal and equipment check at 4:00 PM in Room 204.",
      "source_message_ids": [
        "msg_372",
        "msg_374",
        "msg_375"
      ]
    },
    {
      "id": "date-2",
      "date": "Tuesday, March 18, 10:00 AM",
      "title": "Project Presentation & Faculty Evaluation",
      "description": "Official capstone evaluation slot #2 before Dr. Sharma and external evaluators.",
      "source_message_ids": [
        "msg_305",
        "msg_306",
        "msg_307"
      ]
    },
    {
      "id": "date-3",
      "date": "Thursday, March 20, 11:59 PM",
      "title": "Final Report Submission Deadline",
      "description": "Final PDF submission deadline on the university student portal.",
      "source_message_ids": [
        "msg_415",
        "msg_416"
      ]
    }
  ],
  "venues": [
    {
      "id": "venue-1",
      "name": "Room 204",
      "description": "Official presentation and rehearsal venue. Changed from Room 101 due to projector maintenance issues in 101.",
      "previousVenue": "Room 101",
      "source_message_ids": [
        "msg_287",
        "msg_288",
        "msg_289",
        "msg_374"
      ]
    }
  ],
  "important_information": [
    {
      "id": "info-1",
      "title": "Presentation Venue Relocated to Room 204",
      "description": "Urgent update from department notice board: presentation venue moved from Room 101 to Room 204 because Room 101 projector is undergoing maintenance.",
      "badge": "Crucial Update",
      "source_message_ids": [
        "msg_287",
        "msg_288"
      ]
    },
    {
      "id": "info-2",
      "title": "Strict 10-Minute Presentation Cutoff",
      "description": "Faculty strictly enforces an under-10-minute presentation cutoff. Timer begins immediately when introduction starts; team planned an 8-minute presentation with a 2-minute buffer.",
      "badge": "Time Limit",
      "source_message_ids": [
        "msg_326",
        "msg_327"
      ]
    },
    {
      "id": "info-3",
      "title": "Mandatory IEEE Double-Column Format",
      "description": "Dr. Sharma explicitly required the final report to strictly follow IEEE double-column format with bibliography and formal references.",
      "badge": "Report Guideline",
      "source_message_ids": [
        "msg_342",
        "msg_343"
      ]
    },
    {
      "id": "info-4",
      "title": "Bring Laptop & Power Adapter",
      "description": "All members must bring their laptops and power adapters for testing HDMI switching during the dry run.",
      "badge": "Preparation",
      "source_message_ids": [
        "msg_390",
        "msg_391"
      ]
    }
  ],
  "questions": {
    "answered": [
      {
        "id": "q-ans-1",
        "question": "Has the professor confirmed the presentation date and time slot?",
        "askedBy": "Priya",
        "answeredBy": "Arun",
        "answerSummary": "Dr. Sharma confirmed our presentation slot for Tuesday, March 18 at 10:00 AM (slot #2).",
        "source_message_ids": [
          "msg_305",
          "msg_306",
          "msg_307"
        ]
      },
      {
        "id": "q-ans-2",
        "question": "Should we meet Thursday or Friday for our final rehearsal?",
        "askedBy": "Arun",
        "answeredBy": "Rahul & Meena",
        "answerSummary": "Friday works better after 3:30 PM lab classes; team agreed on Friday at 4:00 PM in Room 204.",
        "source_message_ids": [
          "msg_372",
          "msg_373",
          "msg_374"
        ]
      },
      {
        "id": "q-ans-3",
        "question": "What is our presentation speaking order?",
        "askedBy": "You",
        "answeredBy": "Arun",
        "answerSummary": "Order finalized: 1. Priya (Intro), 2. Arun (Demo), 3. Rahul & Karthik (Backend), 4. Meena (Conclusion).",
        "source_message_ids": [
          "msg_320",
          "msg_321",
          "msg_322"
        ]
      }
    ],
    "unanswered": [
      {
        "id": "q-unans-1",
        "question": "Are we submitting the report on Monday?",
        "askedBy": "Priya",
        "context": "Asked when discussing submission timelines; conversation was immediately interrupted by an urgent WebSocket staging server crash and remained unanswered in that thread.",
        "source_message_ids": [
          "msg_224",
          "msg_225"
        ]
      }
    ]
  },
  "decisions": [
    {
      "id": "dec-1",
      "decision": "Selected Design Option 2 as Official UI",
      "context": "Chose Option 2 over Option 1 due to cleaner contrast, native dark mode support, and intuitive AI summarizer placement.",
      "decidedBy": "Team Consensus (Rahul, Priya, You)",
      "source_message_ids": [
        "msg_68",
        "msg_69",
        "msg_70"
      ]
    },
    {
      "id": "dec-2",
      "decision": "Final Rehearsal Meeting Set for Friday at 4:00 PM",
      "context": "Accommodates all members after Friday laboratory classes conclude.",
      "decidedBy": "Rahul, Meena, Arun",
      "source_message_ids": [
        "msg_372",
        "msg_373",
        "msg_374",
        "msg_375"
      ]
    },
    {
      "id": "dec-3",
      "decision": "Presentation Venue Confirmed as Room 204",
      "context": "Relocated from Room 101 due to projector breakdown.",
      "decidedBy": "Department Notice / Arun",
      "source_message_ids": [
        "msg_287",
        "msg_288",
        "msg_289"
      ]
    },
    {
      "id": "dec-4",
      "decision": "Presentation Speaking Sequence Finalized",
      "context": "Priya (Intro) -> Arun (Demo & Arch) -> Rahul & Karthik (Backend/DB) -> Meena (Testing/Results).",
      "decidedBy": "Arun, Priya, Meena",
      "source_message_ids": [
        "msg_320",
        "msg_321",
        "msg_322"
      ]
    }
  ],
  "action_items": [
    {
      "id": "action-1",
      "assignee": "Rahul",
      "task": "Finish system documentation and export Swagger API endpoint specifications.",
      "deadline": "Sunday evening",
      "status": "in_progress",
      "source_message_ids": [
        "msg_362",
        "msg_363"
      ]
    },
    {
      "id": "action-2",
      "assignee": "Priya",
      "task": "Complete the 12 presentation slides and send draft for review.",
      "deadline": "Monday morning",
      "status": "in_progress",
      "source_message_ids": [
        "msg_365",
        "msg_366"
      ]
    },
    {
      "id": "action-3",
      "assignee": "Arun",
      "task": "Prepare the project live demo and test standalone offline Docker container.",
      "deadline": "Sunday",
      "status": "in_progress",
      "source_message_ids": [
        "msg_368",
        "msg_369"
      ]
    },
    {
      "id": "action-4",
      "assignee": "Meena",
      "task": "Compile all test coverage reports (68 tests) and benchmark metrics.",
      "deadline": "Monday noon",
      "status": "pending",
      "source_message_ids": [
        "msg_370"
      ]
    },
    {
      "id": "action-5",
      "assignee": "Karthik",
      "task": "Assemble documentation into IEEE double-column PDF report with references.",
      "deadline": "Before final submission",
      "status": "pending",
      "source_message_ids": [
        "msg_342",
        "msg_371"
      ]
    }
  ],
  "upcoming_events": [
    {
      "id": "up-1",
      "title": "Team Dry Run Rehearsal",
      "date": "Friday, March 14",
      "time": "4:00 PM",
      "venue": "Room 204",
      "notes": "Bring laptops, HDMI dongle, and power strip. Rehearse 8-minute run.",
      "source_message_ids": [
        "msg_374",
        "msg_390",
        "msg_391"
      ]
    },
    {
      "id": "up-2",
      "title": "Capstone Project Presentation",
      "date": "Tuesday, March 18",
      "time": "10:00 AM",
      "venue": "Room 204",
      "notes": "Strict 10-minute limit. Slot #2 right after robotics team.",
      "source_message_ids": [
        "msg_306",
        "msg_320",
        "msg_326"
      ]
    },
    {
      "id": "up-3",
      "title": "Final Report Submission Deadline",
      "date": "Thursday, March 20",
      "time": "11:59 PM",
      "venue": "Student Portal (Online PDF)",
      "notes": "IEEE double-column format with bibliography.",
      "source_message_ids": [
        "msg_342",
        "msg_415",
        "msg_416"
      ]
    }
  ],
  "other_information": [
    {
      "id": "other-1",
      "title": "Strict 10-Minute Presentation Limit",
      "details": "Faculty will cut off questions if the presentation exceeds 10:00. The team has budgeted 8 minutes for the talk and 2 minutes buffer.",
      "source_message_ids": [
        "msg_326",
        "msg_327"
      ]
    },
    {
      "id": "other-2",
      "title": "Hardware & Equipment Requirements",
      "details": "Everyone must bring their laptop with chargers; Karthik is bringing a multi-port power strip and USB-C to HDMI adapter.",
      "source_message_ids": [
        "msg_390",
        "msg_391"
      ]
    },
    {
      "id": "other-3",
      "title": "Offline Demo Container Safety Net",
      "details": "Arun is running a local Docker container with bundled models so the demo does not depend on college Wi-Fi stability.",
      "source_message_ids": [
        "msg_368",
        "msg_369"
      ]
    },
    {
      "id": "other-4",
      "title": "IEEE Double-Column Report Formatting",
      "details": "The final report must strictly use the standard IEEE conference 2-column format with formal references and bibliography.",
      "source_message_ids": [
        "msg_342",
        "msg_343"
      ]
    }
  ]
};

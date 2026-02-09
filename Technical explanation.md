Technical Explanation - NexEra AI Challenge

 What I Built
I created two interactive prototypes that demonstrate how AI could enhance training and education:

1. 3D Asset Pipeline: Lets educators type descriptions ("yellow hard hat") and get interactive 3D models with educational content
2. AI Avatar System: Allows learners to command a virtual instructor using natural language ("walk to the fire extinguisher")

 Why I Chose This Approach
As a student, I wanted to:
- Keep it simple but meaningful - Focus on core AI → 3D pipeline
- Use learnable technologies - React and Three.js have good tutorials
- Show understanding without overcomplicating
- Make it actually work within the one-week timeframe

 Architecture
 Prototype 1: 3D Asset Pipeline
 How it works:
1. User types a description
2. JavaScript simulates AI analysis (in real app: OpenAI API)
3. System selects appropriate 3D model
4. Three.js renders it interactively
5. AI generates safety/training information

Prototype 2: AI Avatar System
How it works:
1. User gives command ("wave hello")
2. Simple parser detects intent (wave = greeting)
3. Triggers corresponding animation
4. Three.js animates the avatar
5. AI explains what happened

AI Logic 
Since I couldn't use real APIs in this challenge, I simulated the AI process:
1. Console logging shows what real AI would do
2. Keyword matching simulates natural language understanding
3. Educational content is pre-written but shows where AI would generate it
4. Processing delays simulate real API response times

What was challenging
The main problem was that I had never worked with 3D before, so I started with
basic shapes and used React Three Fiber for easier integration. Another problem I had was
deployment, I had some GutHub authentication problems but I managed to get past them by 
learning to access personal tokens and using vercel instead. The last challenge I had was time
management, I did not manage my time efficiently hence one week felt too little for two prototypes, 
to counteract this, I focused on the core functionality first then polished later.


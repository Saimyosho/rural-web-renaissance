import type { VercelRequest, VercelResponse } from '@vercel/node';

interface BookingMessage {
  role: 'user' | 'bot';
  content: string;
}

interface BookingRequest {
  message: string;
  conversationHistory: BookingMessage[];
}

interface BookingState {
  service?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  completed: boolean;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory }: BookingRequest = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Extract booking state from conversation
    const state: BookingState = extractBookingState(conversationHistory || []);

    // Determine next step and generate response
    const response = generateBookingResponse(message.toLowerCase(), state);

    return res.status(200).json({
      message: response.content,
      state: response.state,
      completed: response.state.completed
    });

  } catch (error) {
    console.error('BookingBot error:', error);
    return res.status(500).json({ 
      error: 'Failed to process booking request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function extractBookingState(history: BookingMessage[]): BookingState {
  const state: BookingState = { completed: false };

  // Simple extraction - in production, use NLP/intent detection
  history.forEach(msg => {
    if (msg.role === 'user') {
      const content = msg.content.toLowerCase();
      
      // Extract service
      if (content.includes('haircut') || content.includes('cut')) state.service = 'haircut';
      if (content.includes('color') || content.includes('dye')) state.service = 'color';
      if (content.includes('style')) state.service = 'styling';
      
      // Extract date/time patterns
      if (content.includes('tomorrow')) state.date = 'tomorrow';
      if (content.includes('today')) state.date = 'today';
      if (content.match(/\d{1,2}(am|pm)/)) {
        const match = content.match(/\d{1,2}(:\d{2})?\s*(am|pm)/i);
        if (match) state.time = match[0];
      }
      
      // Extract phone number
      const phoneMatch = content.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/);
      if (phoneMatch) state.phone = phoneMatch[0];
      
      // Extract name (simple pattern)
      if (!state.name && content.includes('my name is ')) {
        state.name = content.split('my name is ')[1].split(/[,.\s]/)[0];
      } else if (!state.name && content.match(/^[A-Z][a-z]+$/)) {
        state.name = content;
      }
    }
  });

  return state;
}

function generateBookingResponse(userMessage: string, state: BookingState): {
  content: string;
  state: BookingState;
} {
  const newState = { ...state };

  // Service selection
  if (!state.service) {
    if (userMessage.includes('haircut') || userMessage.includes('cut')) {
      newState.service = 'haircut';
      return {
        content: "Great choice! 💇‍♂️ Our haircuts are $35. What day works best for you? We're located in downtown Johnstown, right across from the Galleria.",
        state: newState
      };
    } else if (userMessage.includes('color')) {
      newState.service = 'color';
      return {
        content: "Perfect! Our color services start at $65. What day works best for you?",
        state: newState
      };
    }
    return {
      content: "We offer haircuts ($35), color ($65+), and styling ($45). Which service interests you?",
      state: newState
    };
  }

  // Date selection
  if (!state.date && !state.time) {
    if (userMessage.includes('tomorrow')) {
      newState.date = 'tomorrow';
      return {
        content: "Perfect! What time works best for you tomorrow? We have slots at 10am, 12pm, 2pm, and 4pm.",
        state: newState
      };
    } else if (userMessage.includes('today')) {
      newState.date = 'today';
      return {
        content: "I have a 4pm slot available today! Does that work?",
        state: newState
      };
    }
    return {
      content: "What day works best? We're open Tuesday-Saturday, 9am-6pm.",
      state: newState
    };
  }

  // Time selection
  if (!state.time) {
    const timeMatch = userMessage.match(/(\d{1,2})(:\d{2})?\s*(am|pm)/i);
    if (timeMatch) {
      newState.time = timeMatch[0];
      return {
        content: `Excellent! I have ${newState.time} available ${newState.date}. May I have your name?`,
        state: newState
      };
    }
    return {
      content: "What time works best for you? Available: 10am, 12pm, 2pm, or 4pm",
      state: newState
    };
  }

  // Name collection
  if (!state.name) {
    // Extract name from message
    const words = userMessage.split(' ');
    const potentialName = words.find(w => w.length > 2 && w[0] === w[0].toUpperCase());
    if (potentialName) {
      newState.name = potentialName;
      return {
        content: `Thanks, ${potentialName}! What's the best phone number to reach you?`,
        state: newState
      };
    }
    return {
      content: "May I have your name?",
      state: newState
    };
  }

  // Phone collection
  if (!state.phone) {
    const phoneMatch = userMessage.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/);
    if (phoneMatch) {
      newState.phone = phoneMatch[0];
      newState.completed = true;
      return {
        content: `✅ All set, ${state.name}! Your ${state.service} is booked for ${state.date} at ${state.time}.\n\n📍 Main Street Barbershop, 123 Main St, Johnstown PA\n💳 I'll collect a $10 deposit to secure your spot\n📱 Confirmation text sent to ${phoneMatch[0]}\n🅿️ Free parking behind the shop!\n\nSee you ${state.date}! 👋`,
        state: newState
      };
    }
    return {
      content: "What's the best phone number to reach you? (e.g., 814-555-0123)",
      state: newState
    };
  }

  // Fallback
  return {
    content: "Is there anything else I can help you with?",
    state: newState
  };
}

import { useState } from "react";
import ChatDemo, { Message } from "./ChatDemo";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

// BookingBot Demo
export const BookingBotDemo = () => {
  const [started, setStarted] = useState(false);

  const messages: Message[] = [
    { role: "bot", content: "👋 Hi! I'm BookingBot for Main Street Barbershop in downtown Johnstown. I can help you book an appointment. What service are you interested in?" },
    { role: "user", content: "I need a haircut" },
    { role: "bot", content: "Great choice! 💇‍♂️ What day works best for you? We're on Main Street, right across from the Johnstown Galleria." },
    { role: "user", content: "Tomorrow at 2pm" },
    { role: "bot", content: "Perfect! I have 2:00 PM available tomorrow with Tony. May I have your name?" },
    { role: "user", content: "Mike from Westmont" },
    { role: "bot", content: "Thanks, Mike! And what's the best phone number to reach you?" },
    { role: "user", content: "814-555-0123" },
    { role: "bot", content: "✅ All set! Your haircut appointment is booked for tomorrow at 2:00 PM.\n\n📍 Main Street Barbershop, 123 Main St, Johnstown PA\n💳 I'll collect a $10 deposit to secure your spot\n📱 Confirmation text sent to 814-555-0123\n🅿️ Free parking behind the shop!\n\nSee you tomorrow, Mike! 👋" },
  ];

  return (
    <div className="h-full flex flex-col">
      {!started ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-6xl mb-4">🗓️</div>
            <h3 className="text-xl font-bold mb-2">BookingBot Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Watch how BookingBot handles appointment scheduling, collects deposits, and confirms bookings automatically.
            </p>
            <Button
              onClick={() => setStarted(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          </div>
        </div>
      ) : (
        <ChatDemo
          messages={messages}
          agentName="BookingBot"
          agentColor="from-blue-500 to-cyan-500"
          autoPlay={true}
          autoPlayDelay={1500}
          onReset={() => setStarted(false)}
        />
      )}
    </div>
  );
};

// ReviewReplier Demo
export const ReviewReplierDemo = () => {
  const [started, setStarted] = useState(false);

  const messages: Message[] = [
    { role: "bot", content: "👋 Hi! I'm ReviewReplier for Rizzo's Italian Restaurant in Johnstown. Let me show you how I manage reviews. Here's a new 5-star review:" },
    { role: "user", content: "⭐⭐⭐⭐⭐\n\"Best Italian food in Cambria County! The pierogies and haluski are incredible. My family has been coming here for 30 years!\"\n- Sarah K., Johnstown, Google Reviews" },
    { role: "bot", content: "✨ Generated Response:\n\n\"Thank you so much, Sarah! We're honored to have been part of your family's traditions for 30 years. Our pierogies and haluski are made with the same family recipes since 1985. We can't wait to see you and your family again soon! 🇮🇹\"\n\n✅ Posted to Google Reviews" },
    { role: "bot", content: "Here's a 3-star review that needs attention:" },
    { role: "user", content: "⭐⭐⭐\n\"Food was great but parking was tough on a Friday night. Had to park two blocks away.\"\n- Tom B., Richland, Yelp" },
    { role: "bot", content: "🤝 Generated Response:\n\n\"Hi Tom, thank you for the feedback! We're glad you enjoyed the food. Friday nights are busy here in downtown Johnstown. Pro tip: There's a free municipal lot behind Central Park that's just a 2-minute walk. We'll also validate parking at the Johnstown Galleria garage! Thanks for your patience. 🅿️\"\n\n✅ Posted to Yelp\n🚨 Manager alerted for follow-up" },
    { role: "bot", content: "📊 Review Summary:\n• Response rate: 100%\n• Avg response time: 12 minutes\n• Johnstown residents love us: 4.8 stars\n• Sentiment improved: 15% this month" },
  ];

  return (
    <div className="h-full flex flex-col">
      {!started ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2">ReviewReplier Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              See how ReviewReplier monitors reviews 24/7 and generates personalized responses with perfect brand voice.
            </p>
            <Button
              onClick={() => setStarted(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          </div>
        </div>
      ) : (
        <ChatDemo
          messages={messages}
          agentName="ReviewReplier"
          agentColor="from-yellow-500 to-orange-500"
          autoPlay={true}
          autoPlayDelay={2000}
          onReset={() => setStarted(false)}
        />
      )}
    </div>
  );
};

// SocialBot Demo
export const SocialBotDemo = () => {
  const [started, setStarted] = useState(false);

  const messages: Message[] = [
    { role: "bot", content: "👋 Hey! I'm SocialBot for The Mill in Johnstown. Let me show you what I can do for local businesses!" },
    { role: "bot", content: "📸 Creating today's Instagram post...\n\n🍔 Flood City Burger Special!\n\n\"Celebrating Johnstown's resilience with our signature burger! Fresh Angus beef, local cheese from Somerset County, and our special '1889 Sauce'. Available this week only! 🏔️\n\nLocated in historic downtown Johnstown\n\n#JohnstownPA #FloodCity #LocalEats #814Eats #CambriaCounty\"" },
    { role: "bot", content: "✅ Posted to Instagram at 11:00 AM (peak Johnstown engagement)\n✅ Posted to Facebook (Johnstown, PA page)\n✅ Scheduled to Stories\n✅ Tagged: @VisitJohnstownPA @814Local\n\n📊 Predicted engagement: 🔥 High (Johnstown locals love us!)" },
    { role: "bot", content: "💬 Customer comment detected from @JohnstownMom:\n\"Do you have gluten-free options for my son?\"\n\nAuto-reply: \"Absolutely! We have gluten-free buns and our kitchen is very careful with allergies. Just ask for Manager Dave when you visit! We're located right downtown near the Inclined Plane. 🌾\"" },
    { role: "bot", content: "📱 Tomorrow's Content Ready:\n\n📅 Tuesday Morning:\n\"Tuesday motivation from the heart of Cambria County! ☕ Coffee + pastries from our friends at The Greenhouse Cafe...\"\n\n📅 Tuesday Evening:\n\"Thunder in the Valley week! 🏍️ Bikers: Show your rally pass for 15% off. Welcome to Johnstown!\"\n\n✨ All scheduled and ready to post!" },
  ];

  return (
    <div className="h-full flex flex-col">
      {!started ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">SocialBot Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Watch SocialBot create engaging posts, schedule content, and respond to comments automatically.
            </p>
            <Button
              onClick={() => setStarted(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          </div>
        </div>
      ) : (
        <ChatDemo
          messages={messages}
          agentName="SocialBot"
          agentColor="from-pink-500 to-purple-500"
          autoPlay={true}
          autoPlayDelay={1800}
          onReset={() => setStarted(false)}
        />
      )}
    </div>
  );
};

// LeadCapture Demo
export const LeadCaptureDemo = () => {
  const [started, setStarted] = useState(false);

  const messages: Message[] = [
    { role: "bot", content: "👋 Hi there! I'm LeadCapture for Sheldon's Web Development in Johnstown, PA. I noticed you're interested in our free website services. How can I help you today?" },
    { role: "user", content: "I need a website for my restaurant" },
    { role: "bot", content: "Excellent! We love helping Johnstown restaurants! 🍽️\n\nJust to make sure I connect you with Sheldon, is this for:\n\n• A single location in Johnstown/Cambria County?\n• Multiple locations?\n• A food truck or catering business?" },
    { role: "user", content: "Single restaurant in Westmont" },
    { role: "bot", content: "Perfect! We're building FREE websites for local Westmont/Johnstown businesses right now. 🌟\n\nQuick question: What's most important to you?\n\n• Online ordering for pickup/delivery\n• Beautiful menu showcase\n• Both of the above\n• Something else" },
    { role: "user", content: "Both - ordering and menu display" },
    { role: "bot", content: "Great choices! That's exactly what we built for Rizzo's and The Mill here in town. 📈\n\nI'd love to have Sheldon reach out personally. May I get your email?" },
    { role: "user", content: "maria@westmontpizza.com" },
    { role: "bot", content: "Thanks, Maria! And what's the best phone number to reach you?" },
    { role: "user", content: "814-555-0199" },
    { role: "bot", content: "🎉 Perfect! I've got you all set up.\n\n✅ Lead Score: 95/100 (Hot Lead!)\n📧 Email sent to maria@westmontpizza.com\n📱 SMS confirmation sent to 814-555-0199\n👤 Assigned to: Sheldon (directly!)\n⏰ You'll hear from him within 2 hours\n📍 Westmont location noted\n💰 FREE website - $0 upfront!\n\nIn the meantime, check your email for examples of Johnstown restaurant sites we've built!\n\nThanks for reaching out! 🚀" },
  ];

  return (
    <div className="h-full flex flex-col">
      {!started ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">LeadCapture Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              See how LeadCapture qualifies leads, scores them automatically, and routes hot prospects instantly.
            </p>
            <Button
              onClick={() => setStarted(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          </div>
        </div>
      ) : (
        <ChatDemo
          messages={messages}
          agentName="LeadCapture"
          agentColor="from-green-500 to-emerald-500"
          autoPlay={true}
          autoPlayDelay={1600}
          onReset={() => setStarted(false)}
        />
      )}
    </div>
  );
};

// MenuMaster Demo
export const MenuMasterDemo = () => {
  const [started, setStarted] = useState(false);

  const messages: Message[] = [
    { role: "bot", content: "👋 Hi! I'm MenuMaster from The Greenhouse Cafe in downtown Johnstown. How can I help you today? 🍔" },
    { role: "user", content: "Do you have vegan options?" },
    { role: "bot", content: "Yes, we do! 🌱 We're big on plant-based here in Johnstown. We have 5 delicious vegan dishes:\n\n1. Cambria County Harvest Bowl - $12.99\n2. Impossible Flood City Burger - $13.99\n3. Local Veggie Stir Fry - $11.99\n4. Pittsburgh-Style Vegan Tacos (3) - $10.99\n5. Farm-to-Table Salad - $9.99\n\nWould you like to hear more about any of these?" },
    { role: "user", content: "Tell me about the Impossible Flood City Burger" },
    { role: "bot", content: "Great choice! 🍔 Our Flood City Burger is a Johnstown favorite:\n\n• Plant-based Impossible patty\n• Local lettuce from Richland\n• Tomato, pickles, onions\n• Vegan mayo and our '1889 Sauce'\n• Served on a vegan pretzel bun\n• Comes with hand-cut fries\n\n💰 $13.99\n🔥 Can add vegan cheese for $1.50\n🅿️ Free parking behind the building!\n\nReady to order for pickup or delivery in Johnstown?" },
    { role: "user", content: "Yes, for pickup in 30 minutes" },
    { role: "bot", content: "Perfect! 🎉 I'll have your Flood City Burger ready in 30 minutes.\n\nWould you like to add:\n• Vegan cheese? (+$1.50)\n• Sweet potato fries upgrade? (+$2.00)\n• Local kombucha from Somerset? (+$4.00)" },
    { role: "user", content: "Just the cheese please" },
    { role: "bot", content: "Excellent! 👍\n\n📝 Your Order:\n• Impossible Flood City Burger with vegan cheese\n• Hand-cut fries\n\n💵 Total: $15.49 (including tax)\n\n📍 Pickup at: The Greenhouse Cafe\n🏛️ 456 Main Street, Johnstown PA 15901\n⏰ Ready by: 3:30 PM\n🅿️ Park behind the cafe (free!)\n\nMay I have your name and phone number?" },
    { role: "user", content: "Sarah from Westmont, 814-555-0145" },
    { role: "bot", content: "✅ Order confirmed, Sarah!\n\n🎫 Order #3847\n📱 Confirmation sent to 814-555-0145\n💳 Pay at pickup or pre-pay via text link\n⏰ Ready at 3:30 PM\n📍 Near the Inclined Plane - can't miss us!\n\n🌟 Thanks for choosing The Greenhouse Cafe! See you soon, Sarah!" },
  ];

  return (
    <div className="h-full flex flex-col">
      {!started ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-6xl mb-4">🍔</div>
            <h3 className="text-xl font-bold mb-2">MenuMaster Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Watch MenuMaster answer menu questions, handle dietary needs, and take orders seamlessly.
            </p>
            <Button
              onClick={() => setStarted(true)}
              className="bg-gradient-to-r from-red-500 to-orange-500"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          </div>
        </div>
      ) : (
        <ChatDemo
          messages={messages}
          agentName="MenuMaster"
          agentColor="from-red-500 to-orange-500"
          autoPlay={true}
          autoPlayDelay={1500}
          onReset={() => setStarted(false)}
        />
      )}
    </div>
  );
};

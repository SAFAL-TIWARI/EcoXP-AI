import { tips } from "../data/tips";

// Custom chatbot answers to common queries
const customResponses = [
  {
    keywords: ["reduce first", "what should i do first", "where to start", "quickest way", "easiest"],
    answer: "The fastest and most cost-effective way to start reducing your carbon footprint is with **'Low-Hanging Fruits'**—actions that are free and easy to implement. \n\n1. **Adjust your Thermostat:** Lowering heating by 1°C in winter or raising AC by 1°C in summer can cut up to 300 kg CO2e annually.\n2. **Avoid Food Waste:** Planning meals and using leftovers saves up to 250 kg CO2e and reduces your grocery bills.\n3. **Switch to LEDs:** Replacing traditional light bulbs with LEDs cuts energy use by 80%.\n\nTake a look at your **Action Plan** tab to see recommendations custom-tailored to your questionnaire!",
    suggestedTips: ["thermostat_tweak", "reduce_food_waste", "led_bulbs"]
  },
  {
    keywords: ["home", "electricity", "appliance", "house", "energy", "power", "solar"],
    answer: "Home energy emissions come mainly from heating, cooling, lighting, and heavy appliances. \n\n* **Free actions:** Unplug 'vampire' devices on standby, wash laundry on cold cycles, and set your heating/cooling slightly closer to outside temperatures.\n* **Low-cost actions:** Install weather strips on doors/windows, switch to LED bulbs, and clean air filters.\n* **Investment actions:** Transition to solar panels or heat pumps, and replace old refrigerators/washers with EnergyStar certified units.",
    suggestedTips: ["thermostat_tweak", "led_bulbs", "unplug_vampire", "efficient_appliances", "solar_panels"]
  },
  {
    keywords: ["travel", "commute", "car", "flight", "transit", "train", "bus", "drive"],
    answer: "Transportation is typically the largest source of emissions for active commuters and travelers. \n\n* **Daily Commutes:** Try active transit (cycling/walking) for short trips under 3 km, or carpool with a colleague. Taking transit (metro/bus) reduces emissions by 75% compared to driving alone.\n* **Long Distance:** Flying is highly carbon-intensive. Substituting short domestic flights with train travel, combining trips, or choosing virtual meetings will dramatically lower your carbon ledger.\n* **Vehicle:** When purchasing your next car, consider shifting to an Electric Vehicle (EV) which avoids direct fossil emissions entirely.",
    suggestedTips: ["public_transit", "active_commute", "carpool_commute", "ev_switch", "eco_driving"]
  },
  {
    keywords: ["food", "diet", "meat", "eat", "vegan", "vegetarian", "beef", "compost"],
    answer: "Your dietary choices have a substantial environmental impact. Animal products, especially beef and lamb, are resource-heavy and produce high methane emissions.\n\n* **Eat Plant-Forward:** You don't have to go 100% vegan overnight. Transitioning to a few vegetarian days or replacing red meat with chicken/poultry makes a major difference.\n* **Combat Food Waste:** Food thrown in trash rots in landfills and emits methane. Plan shopping trips, freeze excess food, and compost scraps to keep organic material out of landfills.",
    suggestedTips: ["meatless_mondays", "vegan_transition", "reduce_food_waste", "compost_organics"]
  },
  {
    keywords: ["waste", "recycle", "trash", "plastic", "reusable"],
    answer: "Emissions from waste are caused by manufacturing products we discard and landfill decomposition.\n\n* **Reduce First:** Avoid unnecessary purchases and purchase secondhand goods to bypass manufacturing footprints.\n* **Ditch Disposables:** Swap single-use plastic water bottles, cups, and bags for durable reusables.\n* **Recycle Wisely:** Ensure recyclable plastics, paper, and metal are clean and sorted according to your local guidelines.",
    suggestedTips: ["recycle_smart", "buy_secondhand", "ditch_single_use", "repair_possessions"]
  },
  {
    keywords: ["budget", "cheap", "free", "money", "cost", "save money"],
    answer: "Saving carbon doesn't have to be expensive—in fact, many of the most impactful habits save you money immediately!\n\n* **Free Actions:** Walk or bike for short trips (saves fuel), unplug unused chargers (saves standby electricity), adjust your thermostat (saves utility bills), and buy only the groceries you need (saves food cost).\n* **Low-Cost Actions:** Purchase LED bulbs (saves long-term bills), buy secondhand clothes/furniture (much cheaper than new), and mend clothing/repair broken items instead of buying replacements.",
    suggestedTips: ["thermostat_tweak", "unplug_vampire", "reduce_food_waste", "active_commute", "buy_secondhand"]
  }
];

/**
 * Parses a user query and returns a matching response.
 * Fallback to default replies if no keywords match.
 * 
 * @param {string} query - Chat query from user
 */
export const getAIResponse = (query = "") => {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return {
      answer: "Hi! I'm your EcoXp AI assistant. Ask me anything about reducing energy bills, travel emissions, diet footprint, or eco-habits!",
      suggestedTips: []
    };
  }

  // Find a matching custom response
  const matched = customResponses.find(res => 
    res.keywords.some(keyword => normalizedQuery.includes(keyword))
  );

  if (matched) {
    // Map tips IDs to actual tips objects
    const recommended = matched.suggestedTips
      .map(id => tips.find(t => t.id === id))
      .filter(Boolean);

    return {
      answer: matched.answer,
      suggestedTips: recommended
    };
  }

  // Default response
  return {
    answer: "Interesting question! While I am currently operating in **offline mode** without a live LLM endpoint, I can help you learn more about reducing emissions. Try asking about:\n\n* *'How do I save energy at home?'*\n* *'What is the best way to commute?'*\n* *'How do diet choices affect carbon?'*\n* *'How can I lower my footprint on a budget?'*",
    suggestedTips: [
      tips.find(t => t.id === "thermostat_tweak"),
      tips.find(t => t.id === "meatless_mondays")
    ].filter(Boolean)
  };
};

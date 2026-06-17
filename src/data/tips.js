export const tips = [
  // ENERGY
  {
    id: "led_bulbs",
    category: "energy",
    title: "Switch to LED Light Bulbs",
    description: "Replace remaining incandescent or halogen light bulbs with energy-efficient LEDs.",
    difficulty: "easy",
    co2Savings: 150, // kg CO2e/yr
    cost: "low",
    whyItMatters: "LEDs use up to 80% less energy than traditional bulbs and last 25 times longer, saving electricity and bulb replacement costs."
  },
  {
    id: "unplug_vampire",
    category: "energy",
    title: "Vanquish Vampire Power",
    description: "Unplug chargers, electronics, and appliances when not in use, or use smart power strips.",
    difficulty: "easy",
    co2Savings: 80,
    cost: "free",
    whyItMatters: "Standby power accounts for up to 10% of average household electricity bills. Devices consume power even when turned off if plugged in."
  },
  {
    id: "thermostat_tweak",
    category: "energy",
    title: "Adjust the Thermostat by 1-2°C",
    description: "Set heating lower in winter (18-20°C) and air conditioning higher in summer (24-26°C).",
    difficulty: "easy",
    co2Savings: 300,
    cost: "free",
    whyItMatters: "Heating and cooling are the largest energy consumers in a home. Small tweaks can dramatically reduce fossil fuel consumption from grid power."
  },
  {
    id: "solar_panels",
    category: "energy",
    title: "Install Rooftop Solar Panels",
    description: "Switch your home energy source to clean, local solar energy by installing photovoltaic panels.",
    difficulty: "hard",
    co2Savings: 2500,
    cost: "high",
    whyItMatters: "Solar energy replaces fossil-fuel grid electricity with 100% clean, zero-emission power generated directly on your roof."
  },
  {
    id: "efficient_appliances",
    category: "energy",
    title: "Upgrade to EnergyStar Appliances",
    description: "When old appliances die, replace them with high-efficiency energy-certified units (refrigerator, washing machine, heat pump).",
    difficulty: "medium",
    co2Savings: 450,
    cost: "high",
    whyItMatters: "Modern certified appliances use 20% to 50% less energy than older models, cutting base electricity consumption drastically."
  },

  // TRANSPORTATION
  {
    id: "carpool_commute",
    category: "transport",
    title: "Carpool or Share Rides",
    description: "Share your daily commute with coworkers or neighbors to reduce the number of vehicles on the road.",
    difficulty: "easy",
    co2Savings: 800,
    cost: "free",
    whyItMatters: "Carpooling splits fuel costs and emissions. Having two people in a car effectively cuts your personal transit emissions in half."
  },
  {
    id: "public_transit",
    category: "transport",
    title: "Use Public Transport More",
    description: "Replace at least 2-3 car trips per week with bus, train, or metro rides.",
    difficulty: "medium",
    co2Savings: 1200,
    cost: "low",
    whyItMatters: "Buses and trains emit 70-80% less CO2e per passenger-kilometer compared to solo driving in a conventional petrol vehicle."
  },
  {
    id: "active_commute",
    category: "transport",
    title: "Walk or Bike for Short Trips",
    description: "For trips under 3 kilometers, choose active transit like walking, bicycling, or riding an electric scooter.",
    difficulty: "medium",
    co2Savings: 400,
    cost: "free",
    whyItMatters: "Active transit has zero carbon emissions and promotes physical fitness, while short car trips are highly inefficient and dirty."
  },
  {
    id: "ev_switch",
    category: "transport",
    title: "Switch to an Electric Vehicle",
    description: "Transition from an internal combustion engine vehicle to a battery electric vehicle (EV).",
    difficulty: "hard",
    co2Savings: 3000,
    cost: "high",
    whyItMatters: "EVs emit no tailpipe emissions. Even when powered by average electricity grids, their overall emissions are dramatically lower than petrol vehicles."
  },
  {
    id: "eco_driving",
    category: "transport",
    title: "Adopt Eco-Driving Techniques",
    description: "Avoid rapid acceleration/braking, maintain steady speeds, and check tire pressure monthly.",
    difficulty: "easy",
    co2Savings: 200,
    cost: "free",
    whyItMatters: "Aggressive driving burns up to 33% more fuel. Under-inflated tires increase rolling resistance and decrease fuel efficiency."
  },

  // FOOD
  {
    id: "meatless_mondays",
    category: "food",
    title: "Implement Meatless Days",
    description: "Eat plant-based meals at least one or two days per week.",
    difficulty: "easy",
    co2Savings: 350,
    cost: "free",
    whyItMatters: "Beef and lamb production emit up to 30 times more greenhouse gases per gram of protein than beans, lentils, or tofu."
  },
  {
    id: "vegan_transition",
    category: "food",
    title: "Adopt a Plant-Forward/Vegan Diet",
    description: "Shift your daily diet towards plant foods, avoiding meat, dairy, and eggs.",
    difficulty: "hard",
    co2Savings: 1200,
    cost: "free",
    whyItMatters: "A vegan diet has the lowest carbon footprint of any dietary pattern, saving land, water, and agricultural emissions."
  },
  {
    id: "reduce_food_waste",
    category: "food",
    title: "Reduce Food Waste to Zero",
    description: "Plan meals, store food correctly, freeze leftovers, and buy only what you will eat.",
    difficulty: "medium",
    co2Savings: 250,
    cost: "free",
    whyItMatters: "If food waste were a country, it would be the third-largest emitter globally. Landfilled food produces methane, a potent greenhouse gas."
  },
  {
    id: "local_seasonal",
    category: "food",
    title: "Buy Local and Seasonal Food",
    description: "Select foods grown locally and in-season to minimize long-distance transport and greenhouse heating.",
    difficulty: "easy",
    co2Savings: 150,
    cost: "low",
    whyItMatters: "Out-of-season produce is often flown in or grown in energy-intensive heated greenhouses, creating very high supply-chain emissions."
  },

  // WASTE & CONSUMPTION
  {
    id: "compost_organics",
    category: "waste",
    title: "Compost Organic Waste",
    description: "Separate kitchen scraps and yard waste to compost them at home or via municipal composting.",
    difficulty: "medium",
    co2Savings: 180,
    cost: "low",
    whyItMatters: "Organic waste buried in landfill decomposes anaerobically to produce methane. Composting decomposes aerobically, producing stable soil nutrients."
  },
  {
    id: "recycle_smart",
    category: "waste",
    title: "Follow Local Recycling Guidelines",
    description: "Learn what can actually be recycled in your area to prevent recycling contamination.",
    difficulty: "easy",
    co2Savings: 100,
    cost: "free",
    whyItMatters: "Recycled aluminum, plastic, and paper require significantly less energy to process than virgin raw materials, keeping carbon locked in use."
  },
  {
    id: "buy_secondhand",
    category: "shopping",
    title: "Shop Secondhand First",
    description: "Check thrift stores, online marketplaces, or libraries before buying new clothes, books, or furniture.",
    difficulty: "medium",
    co2Savings: 300,
    cost: "free",
    whyItMatters: "Buying secondhand completely bypasses the carbon-intensive manufacturing, materials processing, and shipping of new products."
  },
  {
    id: "ditch_single_use",
    category: "waste",
    title: "Ditch Single-Use Plastics",
    description: "Carry reusable shopping bags, water bottles, coffee cups, and metal straws.",
    difficulty: "easy",
    co2Savings: 50,
    cost: "low",
    whyItMatters: "Plastic production is heavily reliant on petrochemicals. Bypassing disposable plastic cuts oil extraction and refining emissions."
  },
  {
    id: "repair_possessions",
    category: "shopping",
    title: "Repair Instead of Replace",
    description: "Mend clothing, patch shoes, fix electronics, and repair furniture instead of throwing them away.",
    difficulty: "medium",
    co2Savings: 200,
    cost: "low",
    whyItMatters: "Extending the lifespan of items by repairing them reduces the net global demand for new industrial manufacturing emissions."
  }
];

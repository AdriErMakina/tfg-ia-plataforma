// This service simulates AI responses for product design concepts
// In a real application, this would connect to an actual AI service API

// Utility function to introduce a delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a design concept based on a text description
 * @param {string} description - User's design idea description
 * @returns {Promise<Object>} - Generated design concept
 */
export const generateDesignConcept = async (description) => {
  // Simulate API call delay
  await delay(2000);
  
  // Mock AI response - in a real application, this would be replaced with actual API calls
  const concepts = [
    {
      name: "EcoLume",
      description: "A modular desk lamp crafted from recycled ocean plastic. The EcoLume features adjustable brightness levels and color temperature, with a sleek, minimalist design that complements any workspace. Each component can be easily disassembled for repairs or future recycling.",
      brief: "Materials: 80% recycled ocean plastic, 20% biodegradable biopolymers\nLighting: Integrated LED array with 3-level brightness control\nPower: USB-C rechargeable battery with optional direct power\nDimensions: Adjustable height (25-45cm), 15cm base diameter",
      imageUrl: null // In a real application, this would be a URL to an AI-generated image
    },
    {
      name: "NeoFold",
      description: "A revolutionary origami-inspired furniture system that transforms from a flat package into various functional pieces. The NeoFold uses innovative joint mechanisms and premium sustainable materials to create seating, tables, and storage solutions that adapt to changing spatial needs while maintaining aesthetic appeal.",
      brief: "Core Material: FSC-certified bamboo composite panels\nJoints: Patented aluminum folding mechanisms\nWeight Capacity: 150kg per unit\nFinishes: Water-based non-toxic coating in 6 color options",
      imageUrl: null
    },
    {
      name: "AquaPod",
      description: "A compact hydroponic growing system designed for urban homes. AquaPod's elegant spherical design houses a self-regulating ecosystem that cultivates herbs and small vegetables with minimal maintenance. Smart sensors monitor water quality, nutrient levels, and growth patterns, sending updates to the user's mobile device.",
      brief: "Capacity: 6 plant pods\nDimensions: 30cm diameter sphere\nMaterials: Borosilicate glass, recycled polymer base\nTechnology: Integrated WiFi sensor array, low-energy LED growth lights\nWater Usage: 80% less than conventional growing methods",
      imageUrl: null
    },
    {
      name: "Nimbus",
      description: "An intelligent air purification system disguised as a sculptural ceiling fixture. The Nimbus combines advanced HEPA filtration with ambient lighting, creating a healthier environment while serving as a striking design element. Its biophilic form was inspired by cloud formations, bringing a sense of nature indoors.",
      brief: "Filtration: 3-stage system with activated carbon and medical-grade HEPA\nCoverage: Effective for spaces up to 40m²\nLighting: Dimmable LED array with circadian rhythm settings\nNoise Level: <20dB on standard operating mode\nConnectivity: Smart home integration via WiFi",
      imageUrl: null
    },
    {
      name: "TerraCycle Kitchen System",
      description: "A comprehensive closed-loop kitchen waste management system. TerraCycle transforms food scraps into nutrient-rich compost through an accelerated process while eliminating odors. The modular components integrate seamlessly with contemporary kitchen designs, encouraging sustainable habits through beautiful, functional design.",
      brief: "Processing Capacity: 2kg of organic waste daily\nComposting Time: 48-hour rapid cycle\nOdor Control: Activated charcoal filter system\nPower Consumption: 35W during active processing\nDimensions: 40cm (H) × 25cm (W) × 25cm (D)\nMaterials: Antimicrobial copper-infused panels with recycled aluminum structure",
      imageUrl: null
    }
  ];
  
  // Select a random concept from our list
  const randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
  
  // Customize it slightly based on the input description
  let customizedConcept = { ...randomConcept };
  
  // Simple customization based on keywords in the description
  if (description.toLowerCase().includes('sustainable') || description.toLowerCase().includes('eco')) {
    customizedConcept.description = customizedConcept.description + " The design prioritizes sustainability at every stage of the product lifecycle.";
  }
  
  if (description.toLowerCase().includes('modular')) {
    customizedConcept.description = customizedConcept.description + " Each module can be replaced or upgraded individually, extending the product's lifespan.";
  }
  
  if (description.toLowerCase().includes('smart') || description.toLowerCase().includes('connected')) {
    customizedConcept.brief = customizedConcept.brief + "\nConnectivity: Bluetooth 5.0, WiFi enabled, compatible with major smart home ecosystems";
  }
  
  return customizedConcept;
};
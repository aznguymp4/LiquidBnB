'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const sampleSpots = [
  { /**************************** USER 1 ****************************/
    ownerId: 1,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "USA",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "App Academy",
    description: "Place where web developers are created! Beautiful office building with great ergonomic office chairs...with cupholders!",
    price: 123
  },
  {
    ownerId: 1,
    address: "715 W Fort Macon Rd",
    city: "Atlantic Beach",
    state: "North Carolina",
    country: "USA",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "5 Star Luxury Sleeps 14 On Beach",
    description: `BRAND NEW CONSTRUCTION, 5-STAR, LUXURY, OCEAN FRONT, FULLY LANDSCAPED, 4-STORY BEACH HOUSE with Elevator, 5 Bedrooms, and 4.5 Bathrooms. SLEEPS 14 PEOPLE. This Contemporary Style Beach House is located directly on the Ocean on "Millionaire's Row" in Atlantic Beach, NC! Outdoor Heated Pool w/ Colored Lights that Light Up the Water at Night, Water Floats, Large Jacuzzi w/Blue Tooth Stereo, Lots of Outdoor Furniture on the pool deck and terraces, Two Eno Hammocks, Large Outdoor Grill, Wood Burning Pizza Oven (You Supply Wood), Outdoor Sink and Shower, Beach Chairs and Umbrella, Boogie Boards, and Skim Boards. Large Game Room with Dual Basketball Goals, Full Workout Gym, 460 Games on a Stand Up Video Arcade Game, Arcade Dart Board, Shuffle Board Table, Foosball Table, Board Game/Poker Table, Computer with WIFI and Printer, 70" Flat Screen TV w/ Couch and Chairs in Game Room. Custom hand-painted artwork and statues throughout the house. The new gourmet kitchen is a Chef's Delight!!! The kitchen area has enough seating for 22 people.`,
    price: 839
  },
  {
    ownerId: 1,
    address: "1138 Alex Dr.",
    city: "Galveston",
    state: "Texas",
    country: "USA",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Sea Height-Beachfront Sleep 28! people",
    description: "Sea Height- Bring the whole family to this great place with a wonderful beach and lots of room for fun.",
    price: 335
  },
  {
    ownerId: 1,
    address: "844 5th St.",
    city: "San Leon",
    state: "Texas",
    country: "USA",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "NEW! Waterfront Views + 5BR Oasis + Pet Friendly",
    description: "",
    price: 144
  },
  {
    ownerId: 1,
    address: "123 Example Address",
    city: "Austin",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "East Side Beehive",
    description: `Clean, Zen modern backyard cottage, easy access to SXSW, convention center, great dining, and public transportation. Gorgeous, peaceful space, close to the action but perfect for rest and recharging. Easy access to SXSW, ACL, F1 and all festivals.The spaceEnjoy this clean, modern cottage nestled in a cozy but convenient Central East Austin neighborhood. Inspired by Japanese teahouses, this backyard cottage provides easy access to SXSW venues, ACL Fest, downtown, great restaurants, and public transportation while offering a peaceful retreat for resting and recharging. Gorgeous light, vaulted ceilings, and an open floor plan make this unique 1 BR/1BA feel spacious, calm, and inviting. The Beehive features a full kitchen, roomy indoor and outdoor showers, a lovely work space, all-new furnishings and fixtures and a queen bed as well as a double foldout couch.If you want to see a great photo spread on the Beehive, do a search for the magazine Tribeza and "downsizing". They did a nice article on the place and you can see more pics. There have been 9 books and articles written about the Beehive which you can find on the bookshelves. You will be staying in a one of a kind architectural gem. Please note: there is no tv or c`,
    price: 195
  },
  { /**************************** USER 2 ****************************/
    ownerId: 2,
    address: "321 Something Street",
    city: "Bikini Bottom",
    state: "Oceania",
    country: "United Seas of Atlanta",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Krusty Krab",
    description: "The best pizzas in Ocean! The best burgers on Earth!",
    price: 321
  },
  {
    ownerId: 2,
    address: "456 EnderPearl Drive",
    city: "Stronghold",
    state: "PlanetMinecraft",
    country: "United Blocks of America",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Amazing House",
    description: "Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy! Comfy!",
    price: 64
  },
  {
    ownerId: 2,
    address: "9450 N Central Expy",
    city: "Dallas",
    state: "Texas",
    country: "USA",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Dave & Buster's",
    description: "Back in the late 1970s, Buster opened a restaurant known for its tasty food and friendly service. A few doors down, Dave opened an outrageous place for entertainment and games where adults were irresistibly drawn for fun. The two young entrepreneurs noticed people rotating between their establishments, and an idea started to form: What if they put both under one roof? Each store has more state of the art games than ever, more mouthwatering menu items and the most innovative drinks anywhere. From wings to steaks, we’ve got whatever suits your appetite and our premium bar assures we’re stocked to satisfy! Plus, you can watch your game on one of our massive HDTVs with epic stadium sound.",
    price: 140
  },
  {
    ownerId: 2,
    address: "123 Example Address",
    city: "Tiptree",
    state: "Essex",
    country: "United Kingdom",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "The Pink House",
    description: `Eaton House Studio delivers fully bespoke work and leisure experiences in extraordinary surroundings. Our home is THE pink house with flamingos and unicorns. The perfect place for celebrating a special occasion with family and friends. The house is extremely large art installation that is constantly evolving. The pictures we have uploaded give you some idea of the magic of Eaton House Studio. There is much more to discover when you visit!The spaceA beautiful residential house in the English countryside. For all commercial and press inquires, or to hire please contact Eaton House Studio.Guest access1 Super king (the pink bedroom) with en-suite toilet1 Family room with king size bed, 2 single beds & en-suite bathroom1 Double bedroom with en-suite bathroom1 Double bedroom with adjacent toilet1 Double bedroom with adjacent toilet 1 Double bedroom (ground floor)1 Double sofa bed 1 Luxury wet room 2 Additional W/Cs1 Large Reception Area2 Large Lounges 1 Large studio space with garden access 1 Kitchen with open plan dining room with flexible seating 1 first floor kitchenette 1 Gas fire2 bar areas  Hot tubPool table 52 inch HD television with Sky TVApple TV 2 portable sound systems, wireless & rechargeable Electric oven wi`,
    price: 2871
  },
  {
    ownerId: 2,
    address: "123 Example Address",
    city: "Navarre",
    state: "Florida",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "The Spaceship House!  Navarre Beach Area 51",
    description: `Are you ready for a vacation that's out of this world?!  Come stay in our newly-remodeled spaceship-on-the-beach! Whether you're a Trekkie, a Star-Wars buff, or just the *coolest* grandparents on planet Earth--You're sure to find something delightful in this deep-space dome.  Decorated to look like a spaceship inside and out, this two bed, two bath launch pad has all of the amenities to make you feel both: right at home and in a galaxy far far away.The spaceA genuine model FP7680 state-of-the-art spaceship! We promise: It's bigger on the inside.Guest accessGuests may access the entire ship except for the *locked* engine compartment where we store our dilithium crystals. Please do not climb on the dome.Other things to noteBeach access across the street. Space bicycles are provided.`,
    price: 198
  },
  { /**************************** USER 3 ****************************/
    ownerId: 3,
    address: "123 Example Address",
    city: "Drimnin",
    state: "Scotland",
    country: "United Kingdom",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Unique and Secluded AirShip with Highland Views",
    description: `Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows. Airship002 is comfortable, quirky and cool. It does not pretend to be a five star hotel. The reviews tell the story. If booked for the dates you want check out our new listing The Pilot House, Drimnin which is on the same 4 acra site.The kitchen has a toaster, electric kettle, tefal halogen hob, combination oven/microwave. All pots and pans, plates, glasses ,cutlery provided. All you will need to bring is your food. worth stocking up on your way in as Lochaline is the nearest place to shop which is 8 miles away.The AirShip is situated in a beautiful, secluded position on a four-acre site. Stunning views reach across the Sound of Mull towards Tobermory on the Isle of Mull and out to sea toward Ardnamurchan Point.The spaceThe kitchen has a toaster, electric kettle, tefal halogen hob, combination oven/microwave. All pots and pans, plates, glasses ,cutlery provided. All you will need to bring is your food. worth stocking up on your way in as Lochaline is the nearest place to `,
    price: 215
  },
  {
    ownerId: 3,
    address: "123 Example Address",
    city: "Ponta Delgada",
    state: "S. Miguel - Açores",
    country: "Portugal",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Flea Windmill | The Mill",
    description: `Built in the 19th century, with a 360 degrees view over the sea and surroundings on the top floor. It features a Bedroom with a king size bed, a very well-decorated living room with kitchenette, and a WC. Free WiFi, air conditioning, Led TV and DVD player.Private parking inside the premises, providing extra security.Perfect for an unforgettable honeymoon experience.The spaceIt has a 4000 m garden with sub-tropical fruit trees, garden trees, and flowers.In addition to the Mill ideal for 2 people, it has two more accommodation units: the Mó de Cima's House ideal up to 3 people and the Moleiro's House that hold up tp 4 people.Guest accessGuests have access to all property spaces.Registration numberExempt`,
    price: 219
  },
  {
    ownerId: 3,
    address: "123 Example Address",
    city: "Austin",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "The Bloomhouse | One-of-a-kind-of-unbelievable",
    description: `West Austin | Fairy Tale Escape | 1100 Sq. Ft. | Sleeps 4Ever stay in a giant seashell unicorn? No, you haven’t, but now you can cross it off your bucket list. This magical work of art is part Willy Wonka, part Big Lebowski, and totally unlike anywhere else. Do it for the ‘gram, but also for your soul.The spaceCome take a vacation from the real world of right angles and ticky tacky boxes. Situated on a secluded lot and wonderfully restored, The Bloomhouse is a celebration of all things magical and mystical.How the heck did this magnificent beast come to be? Like all the best things in Austin, it started with some hippies and a dream. See, back in the 70s, while Wooderson was wasting all his time away, two UT architecture students decided to build an escape from society that would become a monument to man and nature. Their goal was a home that would not only protect you from the elements but allow you to live in harmony with the environment. They wanted this quixotic vision to provide a place of peace and isolation, a place so far removed that for many years there was no physical address. Then the hippie dream disappeared into the 1980’s Austin real estate boom, and there in the hills, the Bloomhouse waited. It woul`,
    price: 527
  },
  {
    ownerId: 3,
    address: "123 Example Address",
    city: "Springfield",
    state: "Missouri",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Unique 'Earthouse' Retreat w/ Spring-Fed Creek",
    description: `Enjoy living at its finest with an unforgettable stay at this modern underground 3-bed, 3-bath home! Earthouse offers unique architectural design providing guests with an open inviting interior complete with high-end furnishings, modern decor, and abundant natural light. Whether you're exploring Springfield, visiting local colleges, making your way to Branson for the day, or getting away, this luxurious, one-of-a-kind abode will be your ideal home base!NO PARTIES, EVENTS, OR LARGE GATHERINGS.The space2,500 Sq Ft | Custom Furnishings | Outdoor Dining Area with a Grill & Fire PitNestled in a quaint Springfield neighborhood, this contemporary home is perfect for couples traveling together or families in need of a relaxing escape and a taste of luxury!Master Bedroom 1: California King Bed | Bedroom 2: Queen Bed | Bedroom 3: King Bed | Living Room: Sleeper Sofa with Pullout Full BedOUTDOOR LIVING: Unique architectural vibe, spacious yard, fire pit (1 bundle of firewood provided), patio w/ 6-person dining table,  additional outdoor seating, propane grill, and gardenKITCHEN: Fully equipped, stainless steel appliances, dishwasher, cooking basics, dish ware, flatware, drip coffee maker, spices, blender, ice maker, toaster o`,
    price: 355
  },
  {
    ownerId: 3,
    address: "123 Example Address",
    city: "Lumberton",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Naturalist Boudoir, Romantic Cabin",
    description: `Nestled in the heart of the Big Thicket, our Naturalist Boudoir B&B has everything you need to revitalize your senses.  Extremely private area for the naturalist with outdoor hot tub and shower.  We welcome all guests to experience our lovely Naturalist Boudoir & reconnect with your special someone. Should your dates not be available for this cabin, please check out our additional cabins...Naturalist Boudoir TOO, Naturalist Boudoir on Point & Naturalist Boudoir RITZ.  Check my profile for all.The spaceReady to unplug and get back to nature, come check out Naturalist Boudoir.Guest accessNaturalist Boudoir is an unusual space where one can get back to nature in a peaceful, private setting.Other things to noteAs you are actually in nature, you may encounter God's creatures of the woods.`,
    price: 309
  },
  { /**************************** USER 4 ****************************/
    ownerId: 4,
    address: "123 Example Address",
    city: "Roswell",
    state: "New Mexico",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "True Cold War Relic Atlas F Missile Silo / Bunker",
    description: `The Missile Base / Bunker property with its former upper level underground Launch Control Center as your PRIVATE APARTMENT and a Utility Tunnel that leads to the Missile Silo nearly 186 feet deep, with much of its original floors still intact. Learn what it took to operate one of these amazing sites. The major construction/refurbishment areas, have been renovated into an unbelievable underground home and office. Prepare for one of the most awesome tours included with the cost of your stay.The spaceExperience an unparalleled stay at our unique Missile Base / Bunker property, complete with an underground Launch Control Center and Utility Tunnel leading to an 186 ft deep Missile Silo. Immerse yourself in the history of these remarkable sites and discover what it took to operate them. The major construction/refurbishment areas have been transformed into an incredible underground home and office, offering a one-of-a-kind experience. Your stay includes an amazing tour, providing insight into the fascinating history of the property.Your private apartment is located on the former upper level of the launch control center, complete with numerous books and displays showcasing the early days of our Missile Heritage. Relax in t`,
    price: 499
  },
  {
    ownerId: 4,
    address: "123 Example Address",
    city: "Galena",
    state: "Missouri",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Forest Garden Yurts",
    description: `Glamping at its finest! Forest Garden Yurts are wooden yurts designed and built by Bill Coperthwaite in the 1970s for Tom Hess and Lory Brown as home and pottery studio. Tucked away in 4 acres of Ozark forest, the yurts are simple in nature yet abound with artistic details. The home yurt has a kitchen, bedroom, and a nook living room. The bathroom yurt is separate but has a covered walk. Unconventional and unique,  with hobbit hole doors and low clearances in places.Guest accessThere are 4-acres of woods to roam, that are either along the road or fenced, so there is no chance of wandering off of the property. There are also fire pits, camp chairs and roasting sticks available.`,
    price: 91
  },
  {
    ownerId: 4,
    address: "123 Example Address",
    city: "Galveston",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Kettle House - As Seen On TV - Island Famous",
    description: `Welcome to the "Galveston" famous Kettle House. Enjoy this newly renovated 1960's home originally built as a steel storage tank. This home has foam insulation and central AC for ultimate comfort! We have high speed Wi-Fi, 4k Smart TV, and includes all the comforts of home. Large deck great for catching rays and relaxing in the breeze. Seen on HGTV/DIY show "Big Texas Fix"!8 minute walk to the beach - have to cross FM 300512 miles to the historic StrandThe spaceIMPORTANT to Note: There is an interior metal spiral staircase that is steep, tight, and can be difficult to navigate. There are NO HANDRAILS.Downstairs bedroom with 2 queen beds requires going downstairs and bathroom is upstairs. These beds are also elevated. We do provide stairs with 3 steps for easy access. There are NO rails on bed! So if your worried about yourself or children falling off these beds won’t be for you! Got to work with the space we have :-)This house has all you could need. Living room with smart tv available and all streaming services so you can log in to your own accounts, plus free Roku TV and movies. Should there be a day you don't want to leave the house we also have some games available for your enjoyment. Open concept living room, k`,
    price: 213
  },
  {
    ownerId: 4,
    address: "123 Example Address",
    city: "Terlingua",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Domeland:  Off-grid Adobe Dome near Big Bend",
    description: `A remote, off-grid adobe dome, powered by solar power, and near Big Bend National Park.The spaceThanks to HGTV for taking an interest and for featuring the Dome on "Mighty Tiny Houses".Now booking the Summer and Fall of 2023!  (Please scroll down to the summertime disclaimer below)The Off Grid Dome shelter is accepting rental guests to share the off-grid experience, and to also help fund this project and future projects . The dome is a very remote and unique space in the desert near Big Bend National Park. The dome rests in an isolated but easily accessible off-grid setting in one of the few remaining territories under a dark sky ordinance, which offers unmatched views of the night sky, and a completely unobstructed view of a horizon that delivers truly majestic sunrises and sunsets. Though the dome is isolated, the entrance to Big Bend National Park is just a 25 minute drive and the historic Terlingua Ghost town about the same. The dome is an earthen structure, with a cob (adobe) barrier to provide shelter from the desert elements such as heat, cold, winds, and rain. The small but functional dome kitchen provides a two burner propane stove and oven, as well as a refrigerator that is powered by solar power. In fact`,
    price: 132
  },
  {
    ownerId: 4,
    address: "123 Example Address",
    city: "Baird",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "The Belle Plain Caboose",
    description: `The Belle Plain Caboose is a one of a kind romantic retreat. Located in the middle of an 800 acre working ranch. The caboose provides endless outdoor adventure with a charming interior. Fish from the back dock on the 17 acre biologist maintained stock tank, relax on the screened in covered porch, or enjoy a nice cozy chair by the firepit. Feed your mind and soul under the twinkling stars while listening to the lake fountain. No expense spared in making this truly amazing  getaway.The spaceI challenge you to find something more unique. The Belle Plain Caboose is fully stocked for your weekend getaway. Champagne, juices and firewood will all be furnished. Along with a fully stocked kitchen, you can whip a nice romantic dinner on the gas cook top, or oven, and store a nice bottle of wine in the fridge. You can also cook up a little something on the outdoor kitchen gas grill located on the back screened in porch. The caboose is fully heated and air conditioned. Towels, linens, soap and shampoo furnished.Guest accessYou may fish many different stock tanks on the ranch, or just explore the ranch and enjoy nature.`,
    price: 247
  },
  { /**************************** USER 5 ****************************/
    ownerId: 5,
    address: "123 Example Address",
    city: "Pearland",
    state: "Texas",
    country: "United States",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Far East 2 BR Royalty Suite",
    description: `My home is an amazing space with a full tropical cabana bar and amazing pool outdoors. The rooms are all themed and there's secret rooms, a dancing pole, mummies and full sized Easter Island moais. The bed is a 175 year old Qing dynasty wedding bed from Shanghai with Thai Fu lions and Mongolian furniture. There's an Alexa, TV, Roku, and full bathroom with shower/tub.The spaceMy home has a beautiful tropical bar outside and an amazing pool with waterfall. Each room is unique and themed around my travels. The Chinese room has Mongolian and Chinese furniture. The bed has a new full sized mattress and privacy curtains with giant Thai Fu lions and lots of unique touches.Guest accessThis listing includes private room with attached bathroom. You’ll also have access to all the public areas of the house, plus hot tub pool and cabana bar. The listing is not for video shoots or commercial photography.During your stayIf I'm in town I'll be happy to greet you upon arrival and answer any questions you may have. Otherwise, you can use the electronic lock app August to get in. Chinese room is upstairs, first room when you turn left.Other things to noteThis listing has a second room which we are currently developing into an Indian/`,
    price: 110
  },
  {
    ownerId: 5,
    address: "123 Example Address",
    city: "Harlingen",
    state: "Friesland",
    country: "Netherlands",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Luxe suite met uitzicht op de Waddenzee, Harlingen",
    description: `De luxe ruime suite is ingericht met een gezellige zithoek, flatscreen tv, minibar, 2-persoons-boxspring, dubbele wastafel, jacuzzi, haardroger, een badkamer met ruime regendouche en een toilet. Iedere ochtend wordt een luxe ontbijt bezorgd.Vanuit de suite heeft u een uniek uitzicht op het grootste getijdengebied ter wereld: het Unesco werelderfgoed "De Waddenzee".Wij zullen er alles aan doen dat u een onvergetelijk verblijf in de Trechter zult hebben!The spaceGenietend met een hapje en drankje heeft u een uniek uitzicht op de Nieuwe Willemshaven en op één van de grootste getijdengebieden ter wereld: de Waddenzee. De Waddenzee is bijzonder in haar soort. Maar liefst twee keer per dag verandert daar de wereld. Het ene moment vind je er kilometers uitgestrekte wadplaten en het andere moment staat alles onder water. Vanuit uw kamer heeft u direct zicht op aankomende en vertrekkende schepen en bij helder zicht zijn zelfs de Waddeneilanden Vlieland en Terschelling waar te nemen. De ondergaande avondzon zorgt voor een romantische ambiance.`,
    price: 358
  },
  {
    ownerId: 5,
    address: "3000 Grapevine Mills Pkwy",
    city: "Grapevine",
    state: "Texas",
    country: "USA",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Round1 at Grapevine Mills Mall",
    description: "Round1 Bowling & Amusement is a multi-entertainment facility offering Bowling, Arcade Games, Billiards, Karaoke, Ping Pong, Darts, and another entertainment-like activities in an indoor facility complex. With its variety of fun filled activities, exclusive arcade machines from Japan, and food & beverage offerings, Round1 is unparalleled by its competitors. We also have tons of exclusive rhythm games!",
    price: 100
  },
  {
    ownerId: 5,
    address: "123 Example Address",
    city: "Amsterdam",
    state: "Amsterdam",
    country: "Netherlands",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Secret Suite (40 mtrs)",
    description: `Located in the heart of the NDSM wharf of Amsterdam with panoramic views of the city skyline. On top of the crane are three spacious suites, with underneath a studio for Corporate & Music events. Only a private invite shows you Amsterdams best kept secret that's hidden behind an iron door. You'll enter a completely different world after closing that door: an underground scene where artists, free spirits and open-minded people meet. The height and structure makes your stay completely incognito.The spaceHalfway up the crane is the studio: a venue for Corporate & Music events which takes place throughout the year, but especially during Amsterdam Dance Event. World-leading labels / brands & DJs use the crane as a platform for their show case, album launches and (private) events. The Faralda Studio is one of the smallest venues (with a maximum up to 80 pers.), but has a huge impact in the music industry.On top of the studio is the ‘backstage’: the Secret Suite - which is only accessible to invited guests, VIP and intimates during studio sessions. Together with the other two suites, Mystique and Secret, you can also sleep there as a guest. All suites are spacious with two levels. The living and separate sleeping area`,
    price: 1134
  },
  {
    ownerId: 5,
    address: "123 Example Address",
    city: "Naucalpan de Juárez",
    state: "Estado de México",
    country: "Mexico",
    lat: (Math.random()*100)-50,
    lng: (Math.random()*100)-50,
    name: "Come & Dream in Quetzalcoatl`s Nest",
    description: `Quetzalcoatl´s Nest is a private housing complex built by architect Javier Senosiain, in which he follows the aspects of organic architecture, trying to create more humane spaces. Stay in one of our apartments so you can live for yourself a unique inmersive experience with your senses and with nature.The spaceThe apartment is a physical and spiritual refuge, an oasis inside one of the largest and most populated cities in the world. It will awake your creativity as you promenade our gardens, water ponds and common areas. The appartment if fully equipped so you'll enjoy your stay to the fullest, it has: 4 bedrooms, 3 bathrooms, livingroom, dinning room, kitchen and laundry room. We offer complimentary bread, fruit, coffee and tea.The interiors are minimalistic to create a juxtaposition with the outdoors, every window frames a different scenery.The complex is situated inside a natural ecosystem filled with trees, glens and wild fauna, please respect our environment. We recommend you bring warm clothes and comfortable shoes. The weather is chilly in the morning and in the night but quite warm during the day.Quetzalcoatl Park:As part of the airbnb hosting experience you will have a guided visit through our neighboor pro`,
    price: 450
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(sampleSpots, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: sampleSpots.map(a=>a.name) }
    }, {});
  }
};

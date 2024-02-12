'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Review } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const numberz = {
  positive: {
    userIds: [6,7],
    stars: [4,5]
  },
  negative: {
    userIds: [8,9],
    stars: [1,2]
  },
  neutral: {
    userIds: [10,11],
    stars: [2,3]
  }
}

const reviews = {
  positive: [ // 6 7
    "This house listing is amazing! The spacious rooms and high ceilings make it feel so open and inviting.",
    "I love how the natural light floods through the large windows, creating a bright and cheerful atmosphere.",
    "The modern kitchen with its sleek countertops and top-of-the-line appliances is a dream for any aspiring chef.",
    "The backyard is perfect for hosting summer barbecues with its spacious patio and lush green lawn.",
    "The master bedroom is a sanctuary with its luxurious ensuite bathroom and walk-in closet.",
    "The neighborhood is fantastic, with friendly neighbors and convenient amenities just a short walk away.",
    "The location is ideal, with easy access to major highways and public transportation for a smooth commute.",
    "The house has been beautifully maintained, and the attention to detail in every room is evident.",
    "The hardwood floors throughout the house add a touch of elegance and are easy to clean.",
    "The fireplace in the living room creates a cozy ambiance on chilly winter evenings.",
    "The backyard garden is a haven for nature lovers, with vibrant flowers and a tranquil pond.",
    "The open floor plan makes entertaining a breeze, allowing guests to mingle seamlessly between rooms.",
    "The home office is perfect for those who work remotely or need a dedicated space for studying.",
    "The finished basement adds extra living space and can be customized to suit various needs.",
    "The neighborhood is family-friendly, with nearby parks and excellent schools.",
    "The ample storage space in the house ensures that you'll never run out of room for your belongings.",
    "The energy-efficient features, such as solar panels and smart thermostats, help save on utility bills.",
    "The wrap-around porch is a charming spot to relax with a cup of coffee and enjoy the fresh air.",
    "The high-end finishes and fixtures throughout the house give it a luxurious and upscale feel.",
    "The community amenities, like a swimming pool and fitness center, provide additional recreation options.",
    "The house is move-in ready, with fresh paint and updated fixtures that give it a modern touch.",
    "The peaceful and quiet street ensures a tranquil living environment away from the hustle and bustle.",
    "The landscaping is beautifully done, creating a picturesque and welcoming curb appeal.",
    "The large garage offers plenty of space for parking and storage, making it convenient for homeowners.",
    "The house has a spacious and updated kitchen, perfect for cooking delicious meals.",
    "The house has a fantastic layout, with well-defined spaces that flow seamlessly from one room to another.",
    "The neighborhood is vibrant and diverse, offering a variety of cultural events and dining experiences.",
    "The backyard oasis is perfect for relaxation, with a sparkling pool and a cozy outdoor seating area.",
    "The home's architectural design is stunning, with unique features that make it stand out from the rest.",
    "The house is located in a safe and secure community, providing peace of mind for you and your loved ones.",
    "The nearby schools are top-notch, ensuring a quality education for children and peace of mind for parents.",
    "The house is equipped with smart home technology, allowing you to control various aspects with just a few taps on your phone.",
    "The neighborhood is surrounded by beautiful nature trails, perfect for outdoor enthusiasts and nature lovers.",
    "The house has a spacious garage, providing ample space for parking your vehicles and storing your belongings.",
    "The house is situated in a quiet cul-de-sac, ensuring minimal traffic and a peaceful living environment.",
    "The house boasts a stunning backyard garden, complete with a variety of flowers, plants, and a charming gazebo.",
    "The community offers a range of amenities, including a clubhouse, tennis courts, and walking paths.",
    "The house has a fantastic entertainment area, with a home theater system and a built-in bar.",
    "The neighborhood has a strong sense of community, with regular events and gatherings for residents to enjoy.",
    "The house is conveniently located near shopping centers, restaurants, and entertainment options.",
    "The house has a spacious and well-appointed laundry room, making laundry chores a breeze.",
    "The neighborhood is pet-friendly, with nearby dog parks and walking trails for your furry friends.",
    "The house has a beautiful backyard deck, perfect for hosting summer parties and enjoying outdoor meals.",
    "The community is well-maintained, with beautifully landscaped common areas and manicured lawns.",
    "The house has ample storage space, including walk-in closets and built-in shelving units.",
    "The neighborhood has excellent public transportation options, making it easy to navigate the city.",
    "The house has a cozy and inviting family room, perfect for spending quality time with loved ones.",
    "The community has a strong homeowners' association, ensuring that the neighborhood is well-maintained and secure.",
    "The neighborhood has a bustling farmer's market, where you can find fresh produce and artisanal goods.",
    "The house has a spacious and updated kitchen, perfect for cooking delicious meals.",
    "The neighborhood has a vibrant local market, where you can find fresh produce and unique items.",
    "The house has a cozy fireplace, creating a warm and inviting atmosphere during the colder months.",
    "The community offers a variety of recreational facilities, such as a gym, swimming pool, and playground.",
    "The house has a beautiful front porch, ideal for enjoying a cup of coffee or chatting with neighbors.",
    "The house has a charming backyard patio, perfect for hosting BBQ parties with friends and family.",
    "The neighborhood has a vibrant arts scene, with galleries and theaters showcasing local talent.",
    "The house has a spacious home office, providing a dedicated space for work or study.",
    "The community has a well-maintained park, complete with playgrounds and picnic areas.",
    "The house has a luxurious master suite, offering a private retreat for relaxation and rest.",
    "The neighborhood has a variety of fitness centers and yoga studios, ensuring plenty of options for staying active."
  ],
  negative: [ // 8 9
    "The house had a persistent plumbing issue, causing frequent clogs and unpleasant odors.",
    "The neighborhood had a high crime rate, making it feel unsafe to walk around at night.",
    "The house had outdated appliances that were prone to breaking down.",
    "The community lacked proper maintenance, with overgrown lawns and neglected common areas.",
    "The house had poor insulation, resulting in high energy bills and discomfort during extreme weather.",
    "The neighborhood had excessive noise pollution, with loud parties and constant traffic.",
    "The house had a mold problem, leading to respiratory issues and a musty smell.",
    "The community had limited parking spaces, causing constant frustration and inconvenience.",
    "The house had a faulty electrical system, resulting in frequent power outages.",
    "The neighborhood had limited amenities, with no nearby grocery stores or recreational facilities.",
    "The house had a pest infestation, making it difficult to enjoy a pest-free living environment.",
    "The community had a lack of community engagement, with little to no neighborhood events or gatherings.",
    "The house had a leaky roof, resulting in water damage and constant repairs.",
    "The neighborhood had poor public transportation options, making commuting a challenge.",
    "The house had a small and cramped layout, making it feel claustrophobic.",
    "The community had a strict and unresponsive homeowner's association, limiting personal freedoms.",
    "The house had a limited internet connection, causing slow speeds and frequent disruptions.",
    "The neighborhood had a lack of nearby schools, making it inconvenient for families with children.",
    "The house had a significant structural issue, requiring costly repairs and renovations.",
    "The community had a lack of diversity and inclusivity, resulting in a homogeneous and unwelcoming atmosphere.",
    "The house had a persistent pest problem, with unwelcome visitors like ants and roaches.",
    "The neighborhood had limited street lighting, making it feel unsafe and dark at night.",
    "The house had a faulty heating system, leaving certain rooms uncomfortably cold during winter.",
    "The community had a lack of recreational facilities, making it difficult to stay active and entertained.",
    "The house had thin walls, resulting in a lack of privacy and easily hearing neighbors' conversations.",
    "The neighborhood had frequent power outages, causing inconvenience and disruptions.",
    "The house had outdated and worn-out carpeting, giving it a tired and shabby appearance.",
    "The community had a high turnover of residents, creating an unstable and transient environment.",
    "The house had a small and outdated kitchen, making cooking and meal preparation challenging.",
    "The neighborhood had limited access to public transportation, making commuting difficult.",
    "The house had a limited number of bathrooms, causing congestion and inconvenience for larger families.",
    "The community had a lack of green spaces and parks, limiting outdoor recreational opportunities.",
    "The house had a faulty security system, leaving residents feeling unsafe and vulnerable.",
    "The neighborhood had a lack of nearby shopping options, requiring longer trips for daily necessities.",
    "The house had a damp basement, leading to mold growth and a damp, musty smell.",
    "The community had a lack of diversity, resulting in a homogeneous and monotonous atmosphere.",
    "The house had a small backyard, limiting outdoor space for activities and gatherings.",
    "The neighborhood had limited access to quality schools, posing challenges for families with children.",
    "The house had outdated and inefficient windows, leading to drafts and higher energy costs.",
    "The community had a lack of community events and social gatherings, making it difficult to connect with neighbors.",
    "The house had a leaky roof, causing water damage and constant repairs.",
    "The neighborhood had a high crime rate, making it feel unsafe and worrisome.",
    "The house had outdated plumbing, leading to frequent clogs and plumbing issues.",
    "The community had noisy neighbors, making it difficult to relax and have peace.",
    "The house had limited parking space, causing inconvenience for multiple vehicles.",
    "The neighborhood had a lack of nearby amenities, requiring longer trips for groceries and essentials.",
    "The house had a small backyard, limiting space for outdoor activities and gardening.",
    "The community had strict HOA regulations, restricting personalization and creativity.",
    "The house had old and worn-out appliances, resulting in frequent breakdowns.",
    "The neighborhood had heavy traffic congestion, leading to long commute times.",
    "The house had a musty smell, indicating potential mold or mildew issues.",
    "The community had a lack of community engagement, making it difficult to connect with neighbors.",
    "The house had limited natural light, creating a dark and gloomy atmosphere.",
    "The neighborhood had a lack of nearby green spaces, limiting opportunities for outdoor recreation.",
    "The house had a small and outdated bathroom, making it feel cramped and uncomfortable.",
    "The community had a lack of reliable internet service, causing frustration and inconvenience.",
    "The house had a faulty electrical system, leading to frequent power outages.",
    "The neighborhood had a high pollution level, affecting air quality and overall health.",
    "The house had a small and outdated living space, lacking room for furniture and comfort.",
    "The community had limited access to public transportation, making it difficult to get around without a car."
  ],
  neutral: [ // 10 11
    "This house offers a spacious living room, perfect for hosting gatherings and entertaining guests.",
    "The neighborhood boasts a mix of families and professionals, creating a diverse and vibrant community.",
    "You'll find a modern kitchen in this house, complete with updated appliances for easy cooking.",
    "Within the community, you'll enjoy well-maintained common areas that provide a pleasant environment for residents.",
    "Ample storage space in this house allows for easy organization and decluttering.",
    "If you're a foodie, you'll appreciate the variety of nearby restaurants and shops in the neighborhood.",
    "Step into the backyard of this house and discover a lovely patio, ideal for outdoor relaxation and barbecues.",
    "Families with children will love the playground and park within walking distance of this community.",
    "Working from home? This house features a dedicated home office space for a quiet and productive work environment.",
    "Parents will be pleased to know that there are good schools in close proximity to this neighborhood.",
    "Enjoy the beautiful landscaping and curb appeal of the well-maintained garden in this house.",
    "Stay fit and active with access to a fitness center and swimming pool within the community.",
    "Retreat to the spacious master bedroom of this house, complete with an ensuite bathroom for added privacy.",
    "Commuting is a breeze with easy access to public transportation from this neighborhood.",
    "Energy efficiency is a priority in this house, thanks to updated windows and insulation.",
    "Experience a friendly and welcoming atmosphere within this community, fostering a sense of belonging.",
    "Keep your vehicles protected from the elements with the ample parking space in the garage of this house.",
    "Safety is a top priority in this neighborhood, boasting a low crime rate for peace of mind.",
    "Convenience is key with a dedicated laundry room and washer and dryer hookups in this house.",
    "Get to know your neighbors at the organized social events and activities hosted within this community.",
    "The house had a decent layout, but some rooms felt a bit cramped.",
    "The neighborhood was average, nothing particularly outstanding or concerning.",
    "The kitchen was functional, although a few appliances seemed a bit outdated.",
    "The common areas were well-maintained, but could use some refreshing.",
    "Storage space was limited, making it a challenge to keep things organized.",
    "The nearby restaurants and shops offered a decent variety, but nothing exceptional.",
    "The backyard had potential, but could benefit from some landscaping improvements.",
    "The playground and park were a nice addition, although they could use some updates.",
    "The home office space was sufficient, but lacked natural light.",
    "The schools in the area were satisfactory, but not outstanding.",
    "The garden was in need of some care, but had potential for improvement.",
    "The fitness center and swimming pool were adequate, but could use more amenities.",
    "The master bedroom was spacious, but lacked storage options.",
    "Public transportation options were available, but the commute could be lengthy.",
    "The energy efficiency of the house was average, not particularly impressive.",
    "The sense of community was decent, but not particularly strong.",
    "The parking space in the garage was sufficient, but a bit tight.",
    "The neighborhood had a relatively low crime rate, providing a sense of safety.",
    "The laundry room was functional, but could benefit from more space.",
    "The community events and activities were organized, but lacked variety.",
    "The living room was cozy, but the furniture could use some updating.",
    "The overall cleanliness of the house was satisfactory, but not spotless.",
    "The bedrooms had adequate space, but the closets were on the smaller side.",
    "The location was convenient, with grocery stores and amenities nearby.",
    "The noise level from the surrounding area was moderate, not too disruptive.",
    "The bathrooms were functional, but could benefit from some modernization.",
    "The backyard had a nice patio, but lacked privacy from neighboring houses.",
    "The heating and cooling system worked well, but could be more energy-efficient.",
    "The Wi-Fi connectivity in the house was reliable, with decent internet speeds.",
    "The overall condition of the house was decent, but could use some updates.",
    "The neighborhood had decent walkability, with sidewalks and pedestrian-friendly areas.",
    "The natural lighting in the house was good, but some rooms were dimly lit.",
    "The nearby schools had average ratings, providing options for families with children.",
    "The security features of the house were satisfactory, providing peace of mind.",
    "The house had a good layout for entertaining, with open living and dining areas.",
    "The nearby parks offered recreational activities, but could use more maintenance.",
    "The water pressure in the showers was adequate, providing a comfortable experience.",
    "The pet-friendly policy of the house was a plus for those with furry companions.",
    "The house had a decent amount of natural ventilation, keeping it relatively cool.",
    "The nearby public transportation options were accessible, but not the most efficient."
  ]
}
let spotIds = []
for(let i=1;i<=25;i++) spotIds.push(i)
spotIds.sort(()=>0.5-Math.random());

const seedDat = []
for(const tone in reviews) {
  const { userIds, stars } = numberz[tone]
  const txtArr = [...reviews[tone]].sort(()=>0.5-Math.random());

  userIds.map(userId => {
    spotIds.map(spotId => {
      seedDat.push({
        spotId,
        userId,
        review: txtArr.pop(),
        stars: stars[Math.round(Math.random())]
      })
    })
  })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(seedDat, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: {
        [Op.in]: [...reviews.positive, ...reviews.negative, ...reviews.neutral]
      }
    }, {});
  }
};

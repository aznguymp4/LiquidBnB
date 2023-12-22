'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const sampleImgs = [
  { spotId: 1, preview: true,  url: 'https://media.discordapp.net/attachments/860985407452479508/1186567010910486578/chrome_20231219_2044.png' },
  { spotId: 1, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627767437738024/2023-12-21_23.28.41.png' },
  { spotId: 1, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627862241583214/1_E_VqdthX1vuTH2Usax9i2g.jpg' },
  { spotId: 1, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627989660340294/37585917_1786972501390263_5834834735154593792_n.jpg' },
  { spotId: 1, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187628048670003251/app-academy-closeup2-scaled.jpg' },
  
  { spotId: 2, preview: true,  url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187628293952897064/e39d1945-d1e0-44fe-94a0-40cde4051f5e.jpeg' },
  { spotId: 2, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187628437893034014/0ab8311c-c37f-45ef-8d42-8fccf5cc8c8c.jpg' },
  { spotId: 2, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187628506121764894/564b364b-b35a-480c-bfd4-599b1fc57b50.jpg' },
  { spotId: 2, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187628622635343892/2023-12-21_23.32.04.png' },
  { spotId: 2, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187628822275817482/2023-12-21_23.32.51.png' },
  
  { spotId: 3, preview: true,  url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187630232505700362/2023-12-21_23.38.29.png' },
  { spotId: 3, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187630346355871815/2023-12-21_23.38.55.png' },
  { spotId: 3, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187630394909134869/2023-12-21_23.39.05.png' },
  { spotId: 3, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187630440648024126/2023-12-21_23.39.17.png' },
  { spotId: 3, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187630520486608996/2023-12-21_23.39.37.png' },
  
  { spotId: 4, preview: true,  url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187630991808925706/2023-12-21_23.41.29.png' },
  { spotId: 4, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187631082238119987/2023-12-21_23.41.51.png' },
  { spotId: 4, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187631128543244319/2023-12-21_23.42.01.png' },
  { spotId: 4, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187631168812761248/2023-12-21_23.42.12.png' },
  { spotId: 4, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187631247007166546/2023-12-21_23.42.29.png' },
  
  { spotId: 5, preview: true,  url: 'https://a0.muscache.com/im/pictures/82c577ee-3422-4fda-ae09-6716d76e8bef.jpg' },
  { spotId: 5, preview: false, url: 'https://a0.muscache.com/im/pictures/69347092/f4d57c4d_original.jpg' },
  { spotId: 5, preview: false, url: 'https://a0.muscache.com/im/pictures/93e8c7b2-2bd1-40f3-b4d8-06c835c21526.jpg' },
  { spotId: 5, preview: false, url: 'https://a0.muscache.com/im/pictures/69346905/c5d534fc_original.jpg' },
  { spotId: 5, preview: false, url: 'https://a0.muscache.com/im/pictures/69347222/f92328be_original.jpg' },
  // 
  { spotId: 6, preview: true,  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Krusty_Krab.png/1200px-The_Krusty_Krab.png' },
  { spotId: 6, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627297726013471/2023-12-21_23.26.45.png' },
  { spotId: 6, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627357268365344/krusty-krab-zoom-background-6vsxog3jpmkidpji.jpg' },
  { spotId: 6, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627427439071293/3fcc00645bccf909ded7fbab461779d7.png' },
  { spotId: 6, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627636692889671/2023-12-21_23.28.08.png' },
  
  { spotId: 7, preview: true,  url: 'https://i.ytimg.com/vi/PfeQUEges2g/maxresdefault.jpg' },
  { spotId: 7, preview: false, url: 'https://i.ytimg.com/vi/GZPhY0TaTzo/maxresdefault.jpg' },
  { spotId: 7, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187627044599758898/2023-12-21_23.25.48.png' },
  { spotId: 7, preview: false, url: 'https://static.planetminecraft.com/files/image/minecraft/blog/2021/766/13901499-sildurs_xl.jpg' },
  { spotId: 7, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187626908716896276/2023-12-21_23.25.15.png' },
  
  { spotId: 8, preview: true,  url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187626254745227274/Dave-Busters.jpg' },
  { spotId: 8, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187626576687415346/2023-12-21_23.23.55.png' },
  { spotId: 8, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187626117218177074/2023-12-21_23.22.05.png' },
  { spotId: 8, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187626423301701653/2023-12-21_23.23.18.png' },
  { spotId: 8, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187626467966861362/2023-12-21_23.23.28.png' },
  
  { spotId: 9, preview: true,  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-244617/original/357f4aae-5435-4164-bfe3-570765b1160c.jpeg' },
  { spotId: 9, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-244617/original/eda9b9a7-5b73-45d3-9289-87ca1ed5a25b.jpeg' },
  { spotId: 9, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-244617/original/564c57ba-59a2-460c-8f69-9382e50811e0.jpeg' },
  { spotId: 9, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-244617/original/9d502e76-8b59-4e1c-be98-abc38abb5713.jpeg' },
  { spotId: 9, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-244617/original/8edf01d6-3180-4c68-b061-e603071580b5.jpeg' },
  
  { spotId: 10, preview: true,  url: 'https://a0.muscache.com/im/pictures/6ea47a5a-e28c-47b4-a499-f19a3cfe7303.jpg' },
  { spotId: 10, preview: false, url: 'https://a0.muscache.com/im/pictures/8894c0f7-9112-4218-afc0-bbfb0945d991.jpg' },
  { spotId: 10, preview: false, url: 'https://a0.muscache.com/im/pictures/8636e885-7cf4-4b39-9283-89a1fae3049c.jpg' },
  { spotId: 10, preview: false, url: 'https://a0.muscache.com/im/pictures/f70b1d02-a6e5-474a-8286-dd42f5652b59.jpg' },
  { spotId: 10, preview: false, url: 'https://a0.muscache.com/im/pictures/3510432b-b0ad-457c-b117-9ed977dd48ac.jpg' },
  // 
  { spotId: 11, preview: true,  url: 'https://a0.muscache.com/im/pictures/b7c9264d-73c9-45c3-882e-6e9577d63d68.jpg' },
  { spotId: 11, preview: false, url: 'https://a0.muscache.com/im/pictures/4588d88f-0224-42f4-94cb-594f4d362fba.jpg' },
  { spotId: 11, preview: false, url: 'https://a0.muscache.com/im/pictures/062ef52a-9b4f-4301-9413-e757d1758b3f.jpg' },
  { spotId: 11, preview: false, url: 'https://a0.muscache.com/im/pictures/150e47d8-76b8-4233-8724-cbbd12880848.jpg' },
  { spotId: 11, preview: false, url: 'https://a0.muscache.com/im/pictures/e922f0c3-9a3d-4877-983a-56849ce92e18.jpg' },
  
  { spotId: 12, preview: true,  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg' },
  { spotId: 12, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/e3beaf52-13ab-44ed-bbfa-56ccf43bab98.jpeg' },
  { spotId: 12, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/bc9fdbba-a126-4357-946b-4d5f5581ca0f.jpeg' },
  { spotId: 12, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/858b29eb-53f3-4707-87a6-444f4375f888.jpeg' },
  { spotId: 12, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/d1e6500a-3b0f-451d-8f6e-a6f067930a0d.jpeg' },
  
  { spotId: 13, preview: true,  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28254684/original/99bd44d1-abca-4b1c-b5da-eb05eaac9193.jpeg' },
  { spotId: 13, preview: false, url: 'https://a0.muscache.com/im/pictures/b5f7057b-32d4-4d15-a7bf-5e95b647a8d2.jpg' },
  { spotId: 13, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28254684/original/a885d4ee-ecad-4422-a3c4-d3e6352163cc.jpeg' },
  { spotId: 13, preview: false, url: 'https://a0.muscache.com/im/pictures/2ef5defc-c684-42f0-8001-4d2fea7165d1.jpg' },
  { spotId: 13, preview: false, url: 'https://a0.muscache.com/im/pictures/6a79cdb2-4e12-47e8-aed8-aa8b8aba81a9.jpg' },
  
  { spotId: 14, preview: true,  url: 'https://a0.muscache.com/im/pictures/da9516c7-04a3-4787-a82e-b58c3ac5e865.jpg' },
  { spotId: 14, preview: false, url: 'https://a0.muscache.com/im/pictures/cbf68fa1-d6bf-4414-9c67-98e493f1b029.jpg' },
  { spotId: 14, preview: false, url: 'https://a0.muscache.com/im/pictures/631c8926-9ed6-4226-b5c4-c5452e84e6ba.jpg' },
  { spotId: 14, preview: false, url: 'https://a0.muscache.com/im/pictures/32bfb0d7-1d94-40e7-b171-7674f169dd44.jpg' },
  { spotId: 14, preview: false, url: 'https://a0.muscache.com/im/pictures/0c7b0963-b498-47ba-bd79-4b934381cd8c.jpg' },
  
  { spotId: 15, preview: true,  url: 'https://a0.muscache.com/im/pictures/2adf6ef9-e131-431b-a34e-9566e768f509.jpg' },
  { spotId: 15, preview: false, url: 'https://a0.muscache.com/im/pictures/4316b6ec-2afd-4d03-bc3e-8b2887304fc3.jpg' },
  { spotId: 15, preview: false, url: 'https://a0.muscache.com/im/pictures/e690cc94-d29f-4dc7-9c8f-6ee7e9c26fe9.jpg' },
  { spotId: 15, preview: false, url: 'https://a0.muscache.com/im/pictures/11bf0999-efa2-4657-ba09-72e94441d539.jpg' },
  { spotId: 15, preview: false, url: 'https://a0.muscache.com/im/pictures/be0e95ec-ad5b-4753-9877-7d29855c6beb.jpg' },
  // 
  { spotId: 16, preview: true,  url: 'https://a0.muscache.com/im/pictures/9d93bb21-3423-499d-bdda-5cd76978e77d.jpg' },
  { spotId: 16, preview: false, url: 'https://a0.muscache.com/im/pictures/d5ec0eb3-93c7-4030-bc07-3b42d614f832.jpg' },
  { spotId: 16, preview: false, url: 'https://a0.muscache.com/im/pictures/1cb5c8d8-6a66-405f-b2a6-d6b142670a69.jpg' },
  { spotId: 16, preview: false, url: 'https://a0.muscache.com/im/pictures/aae9280d-80e3-44a5-a66a-844795b473d2.jpg' },
  { spotId: 16, preview: false, url: 'https://a0.muscache.com/im/pictures/2d36bb31-003f-4914-aed6-13d969fc6cf2.jpg' },
  
  { spotId: 17, preview: true,  url: 'https://a0.muscache.com/im/pictures/00adf705-3791-40e9-8512-ca5a7d619c11.jpg' },
  { spotId: 17, preview: false, url: 'https://a0.muscache.com/im/pictures/46ded2b4-9ce1-4a3f-a71a-b6746fdcd452.jpg' },
  { spotId: 17, preview: false, url: 'https://a0.muscache.com/im/pictures/7896a749-8547-4564-9801-63d0b10fe9d4.jpg' },
  { spotId: 17, preview: false, url: 'https://a0.muscache.com/im/pictures/ec4415c1-2c87-4077-8920-a17eb1bac2e3.jpg' },
  { spotId: 17, preview: false, url: 'https://a0.muscache.com/im/pictures/00a8d3a2-e072-4c6f-b076-189af0d2ed86.jpg' },
  
  { spotId: 18, preview: true,  url: 'https://a0.muscache.com/im/pictures/37de09ab-f2ab-4daf-adee-5d70f09188d3.jpg' },
  { spotId: 18, preview: false, url: 'https://a0.muscache.com/im/pictures/497d2381-e4e5-4f61-968e-0dceec8ef3d8.jpg' },
  { spotId: 18, preview: false, url: 'https://a0.muscache.com/im/pictures/dd448a80-6670-47e4-9ca6-0d7f2cdbf90d.jpg' },
  { spotId: 18, preview: false, url: 'https://a0.muscache.com/im/pictures/1d099c8a-0be4-4cba-bb19-048f436dd257.jpg' },
  { spotId: 18, preview: false, url: 'https://a0.muscache.com/im/pictures/60b51cb3-a4ec-465c-8b4d-c39a4e432b5b.jpg' },
  
  { spotId: 19, preview: true,  url: 'https://a0.muscache.com/im/pictures/3fb69cb1-32dc-4b21-a0fd-ee3e081814ac.jpg' },
  { spotId: 19, preview: false, url: 'https://a0.muscache.com/im/pictures/9932c273-2abd-44d3-8c82-ae7e6fc96c75.jpg' },
  { spotId: 19, preview: false, url: 'https://a0.muscache.com/im/pictures/dab1d9c7-ad34-42fe-a267-0a32a73a27d0.jpg' },
  { spotId: 19, preview: false, url: 'https://a0.muscache.com/im/pictures/d962a1d8-3d5f-4a91-969f-9b0609d15b26.jpg' },
  { spotId: 19, preview: false, url: 'https://a0.muscache.com/im/pictures/5b81480f-26bb-47a6-bd32-cd0e48c58d92.jpg' },
  
  { spotId: 20, preview: true,  url: 'https://a0.muscache.com/im/pictures/fde0458a-0abf-4e34-8066-fada4d6a44ba.jpg' },
  { spotId: 20, preview: false, url: 'https://a0.muscache.com/im/pictures/e4167f44-9584-466e-bcd4-420890a3a187.jpg' },
  { spotId: 20, preview: false, url: 'https://a0.muscache.com/im/pictures/961876c0-d55c-4693-9d66-42c27ee53bf4.jpg' },
  { spotId: 20, preview: false, url: 'https://a0.muscache.com/im/pictures/8c3da286-c6aa-4627-a789-761080bd950d.jpg' },
  { spotId: 20, preview: false, url: 'https://a0.muscache.com/im/pictures/2d1d5a6f-18b6-4286-82b1-66bbcca45131.jpg' },
  // 
  { spotId: 21, preview: true,  url: 'https://a0.muscache.com/im/pictures/de6386df-efdb-4afa-a157-b6b21a5c2ec0.jpg' },
  { spotId: 21, preview: false, url: 'https://a0.muscache.com/im/pictures/a6109120-6d6f-4cbe-87d4-cdc04f512a31.jpg' },
  { spotId: 21, preview: false, url: 'https://a0.muscache.com/im/pictures/b91d4481-a98d-4861-a077-3d53176f3e41.jpg' },
  { spotId: 21, preview: false, url: 'https://a0.muscache.com/im/pictures/937faca7-0b6a-4151-99a9-82adb1ade0f3.jpg' },
  { spotId: 21, preview: false, url: 'https://a0.muscache.com/im/pictures/22b55e0c-5d46-43b4-811b-95b81a5de3ad.jpg' },
  
  { spotId: 22, preview: true,  url: 'https://a0.muscache.com/im/pictures/be42241a-5346-4745-a2ef-8cf7576f88b8.jpg' },
  { spotId: 22, preview: false, url: 'https://a0.muscache.com/im/pictures/d0fa428d-b0f7-4e4a-93d9-f2e702133e48.jpg' },
  { spotId: 22, preview: false, url: 'https://a0.muscache.com/im/pictures/ad86a7fc-c061-417a-99f0-d0f1d841f28f.jpg' },
  { spotId: 22, preview: false, url: 'https://a0.muscache.com/im/pictures/4119dad5-30be-4e72-844e-a7343046070c.jpg' },
  { spotId: 22, preview: false, url: 'https://a0.muscache.com/im/pictures/87ff9bf9-5dfb-4d80-90cd-6cc61a08773e.jpg' },
  
  { spotId: 23, preview: true,  url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187623309777588265/r1sample.png' },
  { spotId: 23, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187625222665412658/312854653_5940863552643285_8726766648234481285_n.jpeg' },
  { spotId: 23, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187625355285110834/r12.jpg' },
  { spotId: 23, preview: false, url: 'https://zenius-i-vanisher.com/pictures/1665601827.128.jpg' },
  { spotId: 23, preview: false, url: 'https://cdn.discordapp.com/attachments/860985407452479508/1187625648911552573/download_1.jpeg' },
  
  { spotId: 24, preview: true,  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20952140/original/bf7c8905-c1e1-4855-bbe6-88d3e7d79fc5.jpeg' },
  { spotId: 24, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20952140/original/a01ffe7b-07c2-4a18-ab5b-030858dad641.jpeg' },
  { spotId: 24, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20952140/original/442c9129-f9c2-4bc1-93e2-2cf3fca84380.jpeg' },
  { spotId: 24, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20952140/original/4ba13874-bda0-4589-88ae-91f858b1346f.jpeg' },
  { spotId: 24, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20952140/original/16497345-3f5c-4103-82c4-82fd16f36181.jpeg' },
  
  { spotId: 25, preview: true,  url: 'https://a0.muscache.com/im/pictures/63ec2c58-0421-4129-8ea5-2dee2967ab7c.jpg' },
  { spotId: 25, preview: false, url: 'https://a0.muscache.com/im/pictures/580f703f-be26-4935-aab8-86d5a244e405.jpg' },
  { spotId: 25, preview: false, url: 'https://a0.muscache.com/im/pictures/389f9f94-1ab5-49b1-ba65-b43c393a3d3a.jpg' },
  { spotId: 25, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-10153978/original/af06c8ce-13a0-49df-a9e8-e4e64414bf73.jpeg' },
  { spotId: 25, preview: false, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-10153978/original/ff040f83-e83d-4396-bf32-a616ba5e2516.jpeg' }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(sampleImgs, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: sampleImgs.map(a=>a.url) }
    }, {});
  }
};

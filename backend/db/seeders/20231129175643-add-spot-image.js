'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const sampleImgs = [
  { spotId: 1, preview: true,  url: 'https://github.com/user-attachments/assets/6c951d9d-1070-409d-b83e-b040c2de7429' },
  { spotId: 1, preview: false, url: 'https://github.com/user-attachments/assets/f34d7c92-d6ad-4ae1-bf7d-6555bf996f2c' },
  { spotId: 1, preview: false, url: 'https://github.com/user-attachments/assets/4550cce5-80b3-4fe6-a039-ff5f13976dc6' },
  { spotId: 1, preview: false, url: 'https://github.com/user-attachments/assets/7c46749a-b360-45f7-bf21-77313d7b9592' },
  { spotId: 1, preview: false, url: 'https://github.com/user-attachments/assets/cb0b4200-3013-4bc1-9aae-14069d5d4859' },
  
  { spotId: 2, preview: true,  url: 'https://github.com/user-attachments/assets/3fd374dc-9109-4526-88a5-47fe9413e047' },
  { spotId: 2, preview: false, url: 'https://github.com/user-attachments/assets/91585d4d-f082-4d27-9978-3f82866cb8a2' },
  { spotId: 2, preview: false, url: 'https://github.com/user-attachments/assets/d10e2800-69f8-40db-9238-073e5e8bbb51' },
  { spotId: 2, preview: false, url: 'https://github.com/user-attachments/assets/69d217d4-7d38-408a-bcae-598ff4c4f467' },
  { spotId: 2, preview: false, url: 'https://github.com/user-attachments/assets/eb9c821c-8eab-4ea2-be10-ddeaf84879c9' },
  
  { spotId: 3, preview: true,  url: 'https://github.com/user-attachments/assets/468a2648-5ef7-4bfb-b1f8-4fc57a001e34' },
  { spotId: 3, preview: false, url: 'https://github.com/user-attachments/assets/dded794a-bb9d-4591-aa01-a1e97b87e288' },
  { spotId: 3, preview: false, url: 'https://github.com/user-attachments/assets/cbf4f2ed-b810-4f7b-910d-ab36956d7220' },
  { spotId: 3, preview: false, url: 'https://github.com/user-attachments/assets/f97e4a65-37f7-4e5c-8a83-30b2832c4555' },
  { spotId: 3, preview: false, url: 'https://github.com/user-attachments/assets/5d12b49a-1b74-4c42-8f69-608a0e3b73fe' },
  
  { spotId: 4, preview: true,  url: 'https://github.com/user-attachments/assets/5b9e58d3-9bfa-4249-a1df-886ee2debb79' },
  { spotId: 4, preview: false, url: 'https://github.com/user-attachments/assets/dc06d899-b29c-4e9a-a8e8-a1e55e0bca8b' },
  { spotId: 4, preview: false, url: 'https://github.com/user-attachments/assets/008e47bf-7261-4d99-aad5-8fa9344ffc11' },
  { spotId: 4, preview: false, url: 'https://github.com/user-attachments/assets/8bc34813-be32-47f1-b1c6-f1da4698b067' },
  { spotId: 4, preview: false, url: 'https://github.com/user-attachments/assets/53025963-3d2f-484d-b598-15da244e6b7c' },
  
  { spotId: 5, preview: true,  url: 'https://github.com/user-attachments/assets/e0ee5c80-bdd6-49c3-9af1-e6dae7945993' },
  { spotId: 5, preview: false, url: 'https://github.com/user-attachments/assets/e041d95f-5936-4278-bdb3-b813a4feaad1' },
  { spotId: 5, preview: false, url: 'https://github.com/user-attachments/assets/34005f97-91ae-4034-b7d7-247290369538' },
  { spotId: 5, preview: false, url: 'https://github.com/user-attachments/assets/4bcccf26-140f-4124-839b-b58d1ce4de78' },
  { spotId: 5, preview: false, url: 'https://github.com/user-attachments/assets/d1368530-b803-4a77-96a6-a89bfd19c307' },
  // 
  { spotId: 6, preview: true,  url: 'https://github.com/user-attachments/assets/d553b039-4f85-4083-81d1-58d8d388a0dd' },
  { spotId: 6, preview: false, url: 'https://github.com/user-attachments/assets/8ad24abf-bd28-4345-95ee-801c041c0aa8' },
  { spotId: 6, preview: false, url: 'https://github.com/user-attachments/assets/731c9a89-565e-4aea-bd6c-b85a030ac92a' },
  { spotId: 6, preview: false, url: 'https://github.com/user-attachments/assets/0a496ec4-4e99-4672-b695-1611ddb40cb8' },
  { spotId: 6, preview: false, url: 'https://github.com/user-attachments/assets/f4ac2ec1-0f09-4d8f-8ef6-46a5d5f36620' },
  
  { spotId: 7, preview: true,  url: 'https://github.com/user-attachments/assets/f4008b84-35a8-46ac-839e-c419f7242dbf' },
  { spotId: 7, preview: false, url: 'https://github.com/user-attachments/assets/52f54b25-687f-425a-9018-5ad11c7a0d9e' },
  { spotId: 7, preview: false, url: 'https://github.com/user-attachments/assets/fdc0b7e1-e4c2-4854-a746-54a07adae2dd' },
  { spotId: 7, preview: false, url: 'https://github.com/user-attachments/assets/40afff76-16fd-47aa-96ac-5f64e81f189a' },
  { spotId: 7, preview: false, url: 'https://github.com/user-attachments/assets/663cef42-6258-45c8-8361-6ef897cd04cf' },
  
  { spotId: 8, preview: true,  url: 'https://github.com/user-attachments/assets/e137ec6e-3bf1-4701-a37f-3474ee8f149b' },
  { spotId: 8, preview: false, url: 'https://github.com/user-attachments/assets/28018646-6a7f-4472-a03e-0ef89f6a447e' },
  { spotId: 8, preview: false, url: 'https://github.com/user-attachments/assets/6444b516-b36c-43ff-a521-46a1eee67905' },
  { spotId: 8, preview: false, url: 'https://github.com/user-attachments/assets/97fc9d27-926e-4f17-9573-da26fd769b40' },
  { spotId: 8, preview: false, url: 'https://github.com/user-attachments/assets/0705d0d9-a9c7-42bd-bf3f-7fc6e4c27aa2' },
  
  { spotId: 9, preview: true,  url: 'https://github.com/user-attachments/assets/4b61eada-9e84-4313-9cec-a992b916799b' },
  { spotId: 9, preview: false, url: 'https://github.com/user-attachments/assets/5a86fd9c-fb4e-40f2-b5c8-f0f20962e9d5' },
  { spotId: 9, preview: false, url: 'https://github.com/user-attachments/assets/6e876ce2-f834-4ad7-accb-ebdebc396f18' },
  { spotId: 9, preview: false, url: 'https://github.com/user-attachments/assets/d4720a2a-6a84-4ac0-afd2-08141f2b0a3a' },
  { spotId: 9, preview: false, url: 'https://github.com/user-attachments/assets/ac6ca465-24de-4b74-8855-2e1374e0e793' },
  
  { spotId: 10, preview: true,  url: 'https://github.com/user-attachments/assets/9ce40729-4630-4fec-bcff-fb99f6b07dd1' },
  { spotId: 10, preview: false, url: 'https://github.com/user-attachments/assets/8a3c8e65-efda-4d03-844d-9029ef7f92c9' },
  { spotId: 10, preview: false, url: 'https://github.com/user-attachments/assets/4f03a517-4d39-4ede-ab84-9234798b0c19' },
  { spotId: 10, preview: false, url: 'https://github.com/user-attachments/assets/21eb684d-6b18-4381-a662-fef40d68a208' },
  { spotId: 10, preview: false, url: 'https://github.com/user-attachments/assets/bc0a35c5-242b-476c-b816-14d0a70cf57a' },
  // 
  { spotId: 11, preview: true,  url: 'https://github.com/user-attachments/assets/4c6f5a39-d5bf-415e-96eb-e4bba3520fd9' },
  { spotId: 11, preview: false, url: 'https://github.com/user-attachments/assets/ac8d4b72-ea0e-4473-8efa-5411ee622dc0' },
  { spotId: 11, preview: false, url: 'https://github.com/user-attachments/assets/c6518802-6c0e-44db-88e5-8859fbe9a7a1' },
  { spotId: 11, preview: false, url: 'https://github.com/user-attachments/assets/4cad23ee-3ede-4790-8847-c024e625a8d0' },
  { spotId: 11, preview: false, url: 'https://github.com/user-attachments/assets/2cf3738c-fb1f-4104-8350-835a69ebe8a7' },
  
  { spotId: 12, preview: true,  url: 'https://github.com/user-attachments/assets/e9ac11bb-4d43-4168-8655-b5d347af3aa5' },
  { spotId: 12, preview: false, url: 'https://github.com/user-attachments/assets/28ee2fcc-c184-4c05-bcca-4733af9a6aa0' },
  { spotId: 12, preview: false, url: 'https://github.com/user-attachments/assets/bd62bc3c-3186-41cf-8a6a-09a5373a2692' },
  { spotId: 12, preview: false, url: 'https://github.com/user-attachments/assets/82f87f8d-736a-447c-9e10-ab5668795b30' },
  { spotId: 12, preview: false, url: 'https://github.com/user-attachments/assets/c80ec632-179f-412b-923b-739aef25b063' },
  
  { spotId: 13, preview: true,  url: 'https://github.com/user-attachments/assets/9cbf6937-6ade-4a12-8394-3bb966cf80ce' },
  { spotId: 13, preview: false, url: 'https://github.com/user-attachments/assets/cc16335e-0f27-4fc5-834a-11af4af8a780' },
  { spotId: 13, preview: false, url: 'https://github.com/user-attachments/assets/a38aef8c-9c8c-4265-a669-7776c8d7172d' },
  { spotId: 13, preview: false, url: 'https://github.com/user-attachments/assets/d6bdeb4e-9489-43b4-81a1-b50857837d4d' },
  { spotId: 13, preview: false, url: 'https://github.com/user-attachments/assets/853da26f-305a-4687-87f8-c63b55319650' },
  
  { spotId: 14, preview: true,  url: 'https://github.com/user-attachments/assets/3d275413-94f7-4fd9-a0e9-bc1b2fcd92ff' },
  { spotId: 14, preview: false, url: 'https://github.com/user-attachments/assets/dfa99eff-cf05-4c52-bed4-39087bfeaac8' },
  { spotId: 14, preview: false, url: 'https://github.com/user-attachments/assets/1fe55086-b1f5-49b7-b0f0-832dd4c164f6' },
  { spotId: 14, preview: false, url: 'https://github.com/user-attachments/assets/44904b27-032e-4841-8969-40738eb0d838' },
  { spotId: 14, preview: false, url: 'https://github.com/user-attachments/assets/a5434e32-5bd3-4c2a-bd36-7ff0adcefc48' },
  
  { spotId: 15, preview: true,  url: 'https://github.com/user-attachments/assets/10ec2aad-a76f-4b68-926b-ca06533fb150' },
  { spotId: 15, preview: false, url: 'https://github.com/user-attachments/assets/e5487e07-9c54-4ae5-bf81-a5bb74be891c' },
  { spotId: 15, preview: false, url: 'https://github.com/user-attachments/assets/677acf9c-a335-4218-9a09-cab635ff4971' },
  { spotId: 15, preview: false, url: 'https://github.com/user-attachments/assets/b68a6b94-33e1-4a4e-aa55-7ecb0afcd9f5' },
  { spotId: 15, preview: false, url: 'https://github.com/user-attachments/assets/a5066658-ccc1-4b62-a17b-1925bad1f784' },
  // 
  { spotId: 16, preview: true,  url: 'https://github.com/user-attachments/assets/14641329-2f67-4c86-b813-354ea0da36a2' },
  { spotId: 16, preview: false, url: 'https://github.com/user-attachments/assets/fdc1f705-8f0a-44eb-83fa-4c7d2ad228cc' },
  { spotId: 16, preview: false, url: 'https://github.com/user-attachments/assets/ba27c745-ccce-47c1-8fb4-f45ad4448124' },
  { spotId: 16, preview: false, url: 'https://github.com/user-attachments/assets/7182bc36-6d54-4142-955f-98bab306c39f' },
  { spotId: 16, preview: false, url: 'https://github.com/user-attachments/assets/3fb7b5c8-9fb5-47a2-ac57-f15e47225a8c' },
  
  { spotId: 17, preview: true,  url: 'https://github.com/user-attachments/assets/af7364cc-67df-4533-893c-6fdbf5b0e7c2' },
  { spotId: 17, preview: false, url: 'https://github.com/user-attachments/assets/d4c6ceb2-90ec-40ee-b77d-7376a9f65305' },
  { spotId: 17, preview: false, url: 'https://github.com/user-attachments/assets/8cc96026-2a40-4dc7-91d4-113a615508d2' },
  { spotId: 17, preview: false, url: 'https://github.com/user-attachments/assets/61e05ed8-63e1-4ef0-88b8-b75e5ae806e5' },
  { spotId: 17, preview: false, url: 'https://github.com/user-attachments/assets/2dfd726a-73dc-4c78-adb0-9417b59357ad' },
  
  { spotId: 18, preview: true,  url: 'https://github.com/user-attachments/assets/34641592-55a7-495b-bad7-f072a9b306b7' },
  { spotId: 18, preview: false, url: 'https://github.com/user-attachments/assets/dc71521d-6559-4e4d-8a78-4a7b2baf4547' },
  { spotId: 18, preview: false, url: 'https://github.com/user-attachments/assets/cc891a93-62b2-40b9-89a7-582b9bb053c5' },
  { spotId: 18, preview: false, url: 'https://github.com/user-attachments/assets/de9c27a6-2c49-4946-a19b-df9d3dd74416' },
  { spotId: 18, preview: false, url: 'https://github.com/user-attachments/assets/f001879b-6f8b-4673-bcfc-721ee3e812b3' },
  
  { spotId: 19, preview: true,  url: 'https://github.com/user-attachments/assets/2eab38f0-28fc-4a6b-a600-3f823a04efa6' },
  { spotId: 19, preview: false, url: 'https://github.com/user-attachments/assets/42cff396-7c1a-4991-9755-3b8026aca0a1' },
  { spotId: 19, preview: false, url: 'https://github.com/user-attachments/assets/521680a0-137d-4ee6-b923-c21a744b0832' },
  { spotId: 19, preview: false, url: 'https://github.com/user-attachments/assets/1a3cf02e-7774-41e8-a7cc-8f60305a2fa2' },
  { spotId: 19, preview: false, url: 'https://github.com/user-attachments/assets/ec78dc7c-1631-479a-bd79-759868927cf8' },
  
  { spotId: 20, preview: true,  url: 'https://github.com/user-attachments/assets/0c493840-ff55-432b-9a76-ea8284c9fe40' },
  { spotId: 20, preview: false, url: 'https://github.com/user-attachments/assets/7f14af05-261f-4211-baa3-3bf759c1972a' },
  { spotId: 20, preview: false, url: 'https://github.com/user-attachments/assets/fd16334f-b3df-4c9b-899d-31540827711d' },
  { spotId: 20, preview: false, url: 'https://github.com/user-attachments/assets/6f815ff3-bd0f-4378-9af2-cea6d1370a98' },
  { spotId: 20, preview: false, url: 'https://github.com/user-attachments/assets/60d8f182-df9d-468c-a126-780ae2896e31' },
  // 
  { spotId: 21, preview: true,  url: 'https://github.com/user-attachments/assets/ea7e201a-6909-4e0e-aa63-52d10f5f1986' },
  { spotId: 21, preview: false, url: 'https://github.com/user-attachments/assets/8a04d818-6667-4df6-8e28-d8a6fac9c459' },
  { spotId: 21, preview: false, url: 'https://github.com/user-attachments/assets/4cb49c8e-5f2f-4808-8944-f86f3f485d6a' },
  { spotId: 21, preview: false, url: 'https://github.com/user-attachments/assets/3bee95e5-083e-4108-8c0e-8f2c08becb27' },
  { spotId: 21, preview: false, url: 'https://github.com/user-attachments/assets/019a411b-5c28-45f4-8c9d-b08a3a1083b6' },
  
  { spotId: 22, preview: true,  url: 'https://github.com/user-attachments/assets/6fea7e44-d2af-4be9-9302-8c961eaf3333' },
  { spotId: 22, preview: false, url: 'https://github.com/user-attachments/assets/4dd9aa53-ac06-48c3-b607-a6b6d76f959b' },
  { spotId: 22, preview: false, url: 'https://github.com/user-attachments/assets/325d832f-de41-4da2-8889-28da9370a0cd' },
  { spotId: 22, preview: false, url: 'https://github.com/user-attachments/assets/17fbf4ff-8202-4c60-833f-6d0ef139f1ad' },
  { spotId: 22, preview: false, url: 'https://github.com/user-attachments/assets/a5ec9589-f205-460c-924f-c3cabe2f9938' },
  
  { spotId: 23, preview: true,  url: 'https://github.com/user-attachments/assets/97d65e7e-038d-492c-8b93-4eb4799dde27' },
  { spotId: 23, preview: false, url: 'https://github.com/user-attachments/assets/1f281e6f-7096-4cfb-84ee-dce02547c452' },
  { spotId: 23, preview: false, url: 'https://github.com/user-attachments/assets/50242c8d-591a-43ea-aca7-901098972921' },
  { spotId: 23, preview: false, url: 'https://github.com/user-attachments/assets/21397268-2238-4453-aca7-eff77b574ff0' },
  { spotId: 23, preview: false, url: 'https://github.com/user-attachments/assets/2278c38b-1b3b-4eb6-ae0c-e326b0a010fa' },
  
  { spotId: 24, preview: true,  url: 'https://github.com/user-attachments/assets/2a4f46dd-fb5a-4ed7-8322-6d46d2494fb5' },
  { spotId: 24, preview: false, url: 'https://github.com/user-attachments/assets/042c8100-8e3a-4a1d-9e90-52eb608c045e' },
  { spotId: 24, preview: false, url: 'https://github.com/user-attachments/assets/66991bdc-7f88-47dc-a2b0-9544525782d6' },
  { spotId: 24, preview: false, url: 'https://github.com/user-attachments/assets/d855e37b-4b2d-40b9-887c-fde8c8344008' },
  { spotId: 24, preview: false, url: 'https://github.com/user-attachments/assets/e0f08dd9-0bf7-43c5-bb45-b659ee106778' },
  
  { spotId: 25, preview: true,  url: 'https://github.com/user-attachments/assets/59322469-9156-49e7-9cfa-4f83441fb96d' },
  { spotId: 25, preview: false, url: 'https://github.com/user-attachments/assets/675421d5-8f8f-4c75-8ed3-6230acf330c4' },
  { spotId: 25, preview: false, url: 'https://github.com/user-attachments/assets/5ce0ab55-3970-4674-b564-3e82ce36ae1a' },
  { spotId: 25, preview: false, url: 'https://github.com/user-attachments/assets/baa8128e-1166-4184-a63c-41365ca6f4a3' },
  { spotId: 25, preview: false, url: 'https://github.com/user-attachments/assets/a1a3ceac-f5bd-4f09-950f-30dbc2578521' }
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

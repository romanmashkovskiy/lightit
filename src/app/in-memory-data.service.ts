import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 1, title: 'product1_title', text: 'product1_text', img: 'product1_img' },
      { id: 2, title: 'product2_title', text: 'product2_text', img: 'product2_img' },
      { id: 3, title: 'product3_title', text: 'product3_text', img: 'product3_img' },
      { id: 4, title: 'product4_title', text: 'product4_text', img: 'product4_img' },
      { id: 5, title: 'product5_title', text: 'product5_text', img: 'product5_img' },
      { id: 6, title: 'product6_title', text: 'product6_text', img: 'product6_img' }
    ];

    const users = [
      { id: 1, username: 'user1', password: 'user1_password'},
      { id: 2, username: 'user2', password: 'user2_password'},
      { id: 3, username: 'user3', password: 'user3_password'},
      { id: 4, username: 'user4', password: 'user4_password'},
      { id: 5, username: 'user5', password: 'user5_password'},
      { id: 6, username: 'user6', password: 'user6_password'},
    ];

    const reviews = [
      { id: 3, rate: 4, text: 'text3', id_user: 4, id_entry: 1},
      { id: 4, rate: 5, text: 'text4', id_user: 4, id_entry: 2},
      { id: 1, rate: 2, text: 'text1', id_user: 2, id_entry: 3},
      { id: 2, rate: 3, text: 'text2', id_user: 3, id_entry: 3},
      { id: 5, rate: 4, text: 'text5', id_user: 6, id_entry: 4},
      { id: 6, rate: 2, text: 'text6', id_user: 2, id_entry: 5},
      { id: 7, rate: 4, text: 'text7', id_user: 3, id_entry: 6}
    ];
    return {products, users, reviews};
  }
}

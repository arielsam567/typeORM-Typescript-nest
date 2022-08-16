/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { Response } from 'node-fetch';
import { faker } from '@faker-js/faker';

describe('Product test', () => {
  //GET ALL
  let responseGETALL: Response;

  //CREATE
  let responseCREATE;
  let bodyCreate: any;
  let userIdToDelet: string;

  //GET BY ID
  let respondeGETbyID: Response;
  let bodyGetById: any;

  //UPDATE
  let responseUPDATE: Response;
  let bodyUPDATE: any;

  //DELETE
  let respondeDELETE: Response;

  beforeEach(async () => {
    const url = 'http://localhost:3333/products/';

    //GET ALL
    responseGETALL = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    //SAVE
    responseCREATE = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: faker.name.findName(),
        quantity: 12,
        price: 29.32,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    bodyCreate = await responseCREATE.json();
    userIdToDelet = bodyCreate['id'];

    //GET BY ID
    const urlGETlivro = url + userIdToDelet;
    respondeGETbyID = await fetch(urlGETlivro, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    bodyGetById = await respondeGETbyID.json();

    //UPDATE
    responseUPDATE = await fetch(urlGETlivro, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: faker.name.firstName(),
        price: 10.99,
        quantity: 39,
      }),
    });
    bodyUPDATE = await responseUPDATE.json();

    //DELETE
    respondeDELETE = await fetch(urlGETlivro, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  describe('GET ALL', () => {
    it('should return list of livros', () => {
      expect(responseGETALL.status).toBe(200);
    });
  });

  describe('INSERT', () => {
    it('should save produc', () => {
      expect(responseCREATE.status).toBe(200);
      expect(typeof bodyCreate['price']).toBe('number');
      expect(typeof bodyCreate['quantity']).toBe('number');
      expect(typeof bodyCreate['id']).toBe('string');
      expect(typeof bodyCreate['name']).toBe('string');
      expect(bodyCreate['quantity']).toBe(12);
      expect(bodyCreate['price']).toBe(29.32);
    });
  });

  describe('GET BY ID', () => {
    it('should get livro', () => {
      expect(respondeGETbyID.status).toBe(200);
      expect(bodyGetById['id']).toBe(userIdToDelet);
      expect(typeof bodyGetById['id']).toBe('string');
      expect(typeof bodyGetById['name']).toBe('string');
      expect(typeof bodyGetById['price']).toBe('number');
      expect(typeof bodyGetById['quantity']).toBe('number');
      expect(bodyGetById['quantity']).toBe(12);
      expect(bodyGetById['price']).toBe(29.32);
    });
  });

  describe('UPDATE', () => {
    it('should UPDATE livro', () => {
      expect(responseUPDATE.status).toBe(200);
      expect(bodyUPDATE['id']).toBe(userIdToDelet);
      expect(typeof bodyUPDATE['id']).toBe('string');
      expect(typeof bodyUPDATE['name']).toBe('string');
      expect(typeof bodyUPDATE['price']).toBe('number');
      expect(typeof bodyUPDATE['quantity']).toBe('number');
      expect(bodyUPDATE['quantity']).toBe(39);
      expect(bodyUPDATE['price']).toBe(10.99);
    });
  });

  describe('DELETE', () => {
    it('should DELETE livro', () => {
      expect(respondeDELETE.status).toBe(200);
    });
  });
});

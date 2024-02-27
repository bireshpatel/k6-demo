import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import * as constants from '../test_common/constants/constants_uri.js';
import {
  getUsers,
  addUser
} from '../test_common/common_functions/endpoints.js';

export const options = {
  thresholds: {
    // fail the test if any checks fail or any requests fail
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

export function handleSummary(data) {
  return {
    "./results/functional_test_results/k6_functional_test.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    "./results/functional_test_results/k6_functional_test.txt": textSummary(data, {
      indent: " ",
      enableColors: false
    }),
  };
}

export default async function testSuite() {
  getAllUsers();
  addNewUser();
}

let response;
export async function getAllUsers() {
  describe('Verify GET all users from a page', async () => {
    let pageNo = Math.floor(Math.random() * 9);
    response = getUsers(constants.BASE_URI + constants.USERS_URI + constants.PAGE_URI + pageNo);
    expect(response.status, "GET all users from a page").to.equal(200);
  })
}

export async function addNewUser() {
  describe('Verify Add(POST) user', async () => {
    response = addUser(constants.BASE_URI + constants.USERS_URI);
    expect(response.status, "User added with POST request").to.equal(201);
    expect(response.request.body.name, "name").to.not.be.null;
    expect(response.request.body.job, "job").to.not.be.null;
  })
}
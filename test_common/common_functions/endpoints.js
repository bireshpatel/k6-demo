import http from "k6/http";
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export function getUsers(baseUrl) {
    console.log("URI: " + baseUrl);
    return http.get(baseUrl);
}

export function addUser(baseUrl) {
    const header = {
        "Content-Type": "application/json"
    };
    const payload = {
        "name": faker.name.firstName(),
        "job": faker.name.jobDescriptor()
    };
    return http.post(baseUrl, JSON.stringify(payload), header);
}
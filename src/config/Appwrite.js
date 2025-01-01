import {Client, Account, Databases} from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("676c2deb001ccbfd8c6f");

export const account = new Account(client);
export const database = new Databases(client, "676c2eaa002000a2f195");
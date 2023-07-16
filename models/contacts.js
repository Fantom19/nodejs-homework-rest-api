import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join("models", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find(({ id }) => id === contactId);
  return res;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = contacts[index];
  contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

export const addContact = async (body) => {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { ...body, id };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

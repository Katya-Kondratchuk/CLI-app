const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find(
    contact => contact.id === contactId.toString()
  );
  return findContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    contact => contact.id === contactId.toString()
  );
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };

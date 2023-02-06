const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const argv = require('yargs').argv;
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const getContact = await getContactById(id);
      console.table(getContact);
      break;

    case 'add':
      const addContactToList = await addContact(name, email, phone);
      console.table(addContactToList);
      break;

    case 'remove':
      const removeContactFromList = await removeContact(id);
      console.table(removeContactFromList);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

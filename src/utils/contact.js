import * as Contacts from 'expo-contacts';
export const fetchContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  console.log('status : ');
  console.log(status);

  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      data.forEach((contact) => {
        console.log('Name:', contact.name);
        if (contact.phoneNumbers) {
          contact.phoneNumbers.forEach((phone) => {
            console.log('Phone Number:', phone.number);
          });
        }
        console.log('-------------------------');
      });
    }
  }
};

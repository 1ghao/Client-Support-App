import LoginScreen from '../../screens/login/loginScreen';
import ContactsScreen from '../../screens/contacts/contactsScreen';
import MessagesScreen from '../../screens/messages/messagesScreen';

interface Route {
  name: string;
  component: React.ComponentType<any>;
}

export const routes: Route[] = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Contacts',
    component: ContactsScreen,
  },
  {
    name: 'Messages',
    component: MessagesScreen,
  },
];

import LoginScreen from '../../screens/login/LoginScreen';
import ContactsScreen from '../../screens/contacts/ContactsScreen';
import MessagesScreen from '../../screens/messages/MessagesScreen';
import HomeScreen from '../../screens/home/HomeScreen';
import SplashScreen from '../../screens/login/SplashScreen';

interface Route {
  name: string;
  component: React.ComponentType<any>;
}

export const routes: Route[] = [
  {
    name: 'Auth',
    component: SplashScreen,
  },
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
  {
    name: 'Home',
    component: HomeScreen,
  },
];

import LoginScreen from '../../screens/login/LoginScreen';
import ContactsScreen from '../../screens/contacts/ContactsScreen';
import MessagesScreen from '../../screens/chat/MessagesScreen';
import HomeScreen from '../../screens/home/HomeScreen';
import SplashScreen from '../../screens/login/SplashScreen';
import ChatScreen from '../../screens/chat/ChatScreen';

interface Route {
  name: string;
  component: React.ComponentType<any>;
}

export const routes: Route[] = [
  {
    name: 'Splash',
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
    name: 'Chat',
    component: ChatScreen,
  },
  {
    name: 'Home',
    component: HomeScreen,
  },
];

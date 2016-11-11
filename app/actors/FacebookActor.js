import FacebookStore from '../stores/FacebookStore';
import FacebookActions from '../actions/FacebookActions';
import UserActions from '../actions/UserActions';
import ListActions from '../actions/ListActions';

let isLoggedIn = FacebookStore.getIsLoggedIn();

export default function(store) {
  const storeIsLoggedIn = FacebookStore.getIsLoggedIn();

  if(!!storeIsLoggedIn && !isLoggedIn) {
    UserActions.loginFacebook.defer(FacebookStore.getAuth());
    FacebookActions.getMe.defer();
  }

  if(!storeIsLoggedIn && !!isLoggedIn) {
    //Had to defer action. Dispatch issue otherwise ...
    UserActions.logoutFacebook.defer();
    ListActions.clear.defer();
  }

  isLoggedIn = storeIsLoggedIn;
}

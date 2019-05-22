import { createStackNavigator } from 'react-navigation';
import SearchHome from './SearchHome';
import SalonSearch from './SalonSearch';
import ViewSalonProfile from '../common/ViewSalonProfile';


export default createStackNavigator({
	SearchHome,
	SalonSearch,
	ViewSalonProfile,

});
import { createStackNavigator } from 'react-navigation';
import Home from './home';
import SalonPage from './SalonPage'
import HairstyleWorkList from './HairstyleWorkList'
import HairstyleWork from './HairstyleWork'
import ViewSalonProfile from './ViewSalonProfile'
import ViewProfile from './ViewProfile'

export default createStackNavigator({
    Home,
    HairstyleWorkList,
    SalonPage,
    HairstyleWork,
    ViewSalonProfile,
    ViewProfile
});
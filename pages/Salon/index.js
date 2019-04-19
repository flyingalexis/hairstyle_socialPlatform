import { createStackNavigator } from 'react-navigation';
import Home from './home';
import SalonPage from './SalonPage'
import HairstyleWorkList from './HairstyleWorkList'

export default createStackNavigator({
    Home,
    HairstyleWorkList,
    SalonPage
});
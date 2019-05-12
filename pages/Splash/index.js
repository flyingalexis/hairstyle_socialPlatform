import { createStackNavigator } from 'react-navigation';
import Splash from './Splash';
import HairstyleWork from '../common/HairstyleWork';
import ViewSalonProfile from '../common/ViewSalonProfile';
import ViewProfile from '../common/ViewProfile';

export default createStackNavigator({
    Splash,
    HairstyleWork,
    ViewSalonProfile,
    ViewProfile,
});
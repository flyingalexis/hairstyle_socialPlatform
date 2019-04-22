import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import CreateSalon from './CreateSalon';
import JoinSalon from './JoinSalon';

export default createBottomTabNavigator({
    CreateSalon: createStackNavigator({CreateSalon}),
    JoinSalon: createStackNavigator({JoinSalon})
});
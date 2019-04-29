import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import SalonPage from './SalonPage';
import ManageMember from './ManageMember';
import navOptions from '../../utils/drawerBarNavOptions'

export default createBottomTabNavigator({
    SalonPage: createStackNavigator({SalonPage}),
    ManageMember: createStackNavigator({ManageMember})
})
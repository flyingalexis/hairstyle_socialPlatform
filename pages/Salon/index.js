import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import SalonPage from './SalonPage';
import ManageMember from './ManageMember';
import navOptions from '../../utils/drawerBarNavOptions'

// export default createStackNavigator({
//     Home:{ 
//             screen: createBottomTabNavigator({
//                 SalonPage:{
//                     screen: SalonPage,
//                     navigationOptions: {
//                         header: null //Need to set header as null.
//                     }
//                 },
//                 ManageMember:{
//                     screen: ManageMember,
//                     navigationOptions: {
//                         header: null //Need to set header as null.
//                     }
//                 }
//             }),
//             navigationOptions: navOptions
//         }
// });

// export default createBottomTabNavigator({
//     SalonPage:{
//         screen: createStackNavigator({SalonPage})
//     },
//     ManageMember
// })

export default createBottomTabNavigator({
    SalonPage: createStackNavigator({SalonPage}),
    ManageMember: createStackNavigator({ManageMember})
})
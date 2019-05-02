import { createStackNavigator } from 'react-navigation';
import CategorySearch from './CategorySearch';
import SalonPage from './SalonPage'
import HairstyleWorkList from './HairstyleWorkList'
import HairstyleWork from './HairstyleWork'
import ViewSalonProfile from './ViewSalonProfile'
import ViewProfile from './ViewProfile'
import SearchHome from './SearchHome'
import TagSearch from './TagSearch'

export default createStackNavigator({
    SearchHome,
    CategorySearch,
    HairstyleWorkList,
    SalonPage,
    HairstyleWork,
    ViewSalonProfile,
    ViewProfile,
    TagSearch
});
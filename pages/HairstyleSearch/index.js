import { createStackNavigator } from 'react-navigation';
import CategorySearch from './CategorySearch';
import HairstyleWorkList from './HairstyleWorkList'
import HairstyleWork from '../common/HairstyleWork'
import ViewSalonProfile from '../common/ViewSalonProfile'
import ViewProfile from '../common/ViewProfile'
import SearchHome from './SearchHome'
import TagSearch from './TagSearch'

export default createStackNavigator({
    SearchHome,
    CategorySearch,
    HairstyleWorkList,
    HairstyleWork,
    ViewSalonProfile,
    ViewProfile,
    TagSearch
});
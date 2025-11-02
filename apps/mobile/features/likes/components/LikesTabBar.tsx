import { TabBar } from 'react-native-tab-view';
import type { TabBarProps } from 'react-native-tab-view';

type LikesTabBarProps = TabBarProps<{ key: string; title: string }>;

export const LikesTabBar = (props: LikesTabBarProps) => {
  return (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e3dd'
      }}
      indicatorStyle={{ backgroundColor: '#5DBAEB', height: 2 }}
      activeColor='#5DBAEB'
      inactiveColor='#25231F'
      tabStyle={{ paddingVertical: 8 }}
    />
  );
};

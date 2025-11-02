import { Container, Text, Button, ScreenWrapper } from '@/components/bases';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  ReceivedLikes,
  SkippedLikes,
  LikesTabBar
} from '@/features/likes/components';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

const renderScene = SceneMap({
  first: ReceivedLikes,
  second: SkippedLikes
});

const routes = [
  { key: 'first', title: 'いいね！' },
  { key: 'second', title: 'スキップ一覧' }
];

export default function Likes() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <Container scrollEnabled={false} isPaddingTop={true}>
      <View className='-mx-5 flex-1'>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => <LikesTabBar {...props} />}
        />
      </View>
    </Container>
  );
}

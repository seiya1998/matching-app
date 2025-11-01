import { Container } from '@/components/bases';
import { Lists } from '@/components/modules';
import { View, TouchableHighlight } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';

const searchHistories = [
  {
    id: 1,
    conditions: '東京都、28歳〜33歳、一人暮らし、土日休み、24時間以内'
  },
  {
    id: 2,
    conditions:
      '神奈川県、25歳〜30歳、実家暮らし、平日休み、3日以内、自己紹介文あり'
  },
  {
    id: 3,
    conditions:
      '大阪府、30歳〜35歳、一人暮らし、土日休み、1週間以内、サブ写真あり'
  },
  {
    id: 4,
    conditions:
      '北海道、26歳〜31歳、一人暮らし、土日休み、24時間以内、自己紹介文あり、サブ写真あり'
  },
  {
    id: 5,
    conditions: '福岡県、27歳〜32歳、同居人あり、不定休、3日以内'
  },
  {
    id: 6,
    conditions:
      '愛知県、24歳〜29歳、一人暮らし、土日休み、24時間以内、自己紹介文あり'
  },
  {
    id: 7,
    conditions:
      '京都府、29歳〜34歳、実家暮らし、土日休み、1週間以内、サブ写真あり'
  },
  {
    id: 8,
    conditions:
      '埼玉県、26歳〜30歳、一人暮らし、祝日休み、24時間以内、自己紹介文あり、サブ写真あり'
  },
  {
    id: 9,
    conditions: '千葉県、25歳〜32歳、同居人あり、土日休み、3日以内'
  },
  {
    id: 10,
    conditions:
      '兵庫県、28歳〜35歳、一人暮らし、平日休み、1週間以内、自己紹介文あり'
  }
];

export default function SearchHistory() {
  return (
    <Container isPaddingTop={false} style=''>
      <View className='-mx-5'>
        <FlashList
          data={searchHistories}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => {
                router.replace('/(app)/(tabs)');
              }}
              underlayColor='#f3f4f6'
              activeOpacity={0.95}
            >
              <View className='px-5'>
                <Lists
                  title={item.conditions}
                  listType='M'
                  leftIconType='search'
                  isShowBottomBorder={index !== searchHistories.length - 1}
                  isShowRightIcon={false}
                />
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Container>
  );
}

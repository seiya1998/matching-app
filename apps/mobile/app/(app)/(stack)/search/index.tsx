import { Container, Text, Button } from '@/components/bases';
import { Lists, ToggleSwitch } from '@/components/modules';
import { useState } from 'react';
import {
  BODY_TYPES,
  HOLIDAYS,
  EDUCATION_LEVELS,
  ANNUAL_INCOMES,
  BLOOD_TYPES,
  LIVING_SITUATIONS,
  SIBLING_POSITIONS,
  SPOKEN_LANGUAGES,
  SMOKING_HABITS,
  ALCOHOL_HABITS,
  MARITAL_STATUSES,
  CHILDREN_STATUSES,
  MARRIAGE_INTENTIONS,
  DESIRES_CHILDREN,
  HOUSEWORK_CHILDCARE_STYLES,
  MEETING_PREFERENCES,
  DATE_EXPENSE_PREFERENCES,
  LAST_LOGIN_PERIODS
} from '@/values/userProfile';
import { FilterSection } from '@/features/search/components';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Search() {
  // State for each filter
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<
    string[]
  >([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
    []
  );
  const [selectedBloodTypes, setSelectedBloodTypes] = useState<string[]>([]);
  const [selectedLivingSituations, setSelectedLivingSituations] = useState<
    string[]
  >([]);
  const [selectedSiblingPositions, setSelectedSiblingPositions] = useState<
    string[]
  >([]);
  const [selectedSpokenLanguages, setSelectedSpokenLanguages] = useState<
    string[]
  >([]);
  const [selectedSmokingHabits, setSelectedSmokingHabits] = useState<string[]>(
    []
  );
  const [selectedAlcoholHabits, setSelectedAlcoholHabits] = useState<string[]>(
    []
  );
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
    string[]
  >([]);
  const [selectedChildrenStatuses, setSelectedChildrenStatuses] = useState<
    string[]
  >([]);
  const [selectedMarriageIntentions, setSelectedMarriageIntentions] = useState<
    string[]
  >([]);
  const [selectedDesiresChildren, setSelectedDesiresChildren] = useState<
    string[]
  >([]);
  const [
    selectedHouseworkChildcareStyles,
    setSelectedHouseworkChildcareStyles
  ] = useState<string[]>([]);
  const [selectedMeetingPreferences, setSelectedMeetingPreferences] = useState<
    string[]
  >([]);
  const [selectedDateExpensePreferences, setSelectedDateExpensePreferences] =
    useState<string[]>([]);
  const [selectedLastLoginPeriods, setSelectedLastLoginPeriods] = useState<
    string[]
  >([]);

  const [isIntroductionPresent, setIsIntroductionPresent] =
    useState<boolean>(false);

  const insets = useSafeAreaInsets();

  // Toggle handlers
  const createToggleHandler =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) => {
      setter((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };

  return (
    <>
      <Container isPaddingTop={false} style='mt-5'>
        {/* 検索モード切り替え */}
        <View className='mb-10 flex-row gap-2'>
          <View className='flex-1'>
            <Button
              text='検索履歴から探す'
              variant='secondary'
              size='small'
              onPress={() => {
                console.log('検索履歴から探す');
              }}
            />
          </View>
          <View className='flex-1'>
            <Button
              text='前回の条件'
              variant='secondary'
              size='small'
              onPress={() => {
                console.log('前回の条件');
              }}
            />
          </View>
        </View>

        {/* ヘッダー: タイトル + 保存リンク */}
        <View className='mb-5 flex-row items-center justify-between'>
          <Text className='text-xl font-bold text-body'>
            プロフィールで絞り込み
          </Text>
          <Button
            onPress={() => {
              console.log('この条件を保存');
            }}
          >
            <Text className='text-m font-bold text-primary'>
              この条件を保存
            </Text>
          </Button>
        </View>

        <View className='mb-3'>
          <Lists
            title='居住地（都道府県）'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            isShowRightIcon={true}
            rightComponent={
              <Text className='mr-2 pt-1 text-l text-primary'>北海道</Text>
            }
          />
        </View>

        <View className='mb-3'>
          <Lists
            title='居住地（市区町村）'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            isShowRightIcon={true}
            rightComponent={
              <Text className='mr-2 pt-1 text-l text-primary'>札幌市</Text>
            }
          />
        </View>

        <View className='mb-3'>
          <Lists
            title='年齢'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            isShowRightIcon={true}
            rightComponent={
              <View className='flex flex-row'>
                <Text className='mr-1 pt-1 text-l text-primary'>30歳</Text>
                <Text className='mr-1 pt-1 text-l text-primary'>〜</Text>
                <Text className='mr-2 pt-1 text-l text-primary'>30歳</Text>
              </View>
            }
          />
        </View>

        <View className='mb-5'>
          <Lists
            title='身長'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            isShowRightIcon={true}
            rightComponent={
              <View className='flex flex-row'>
                <Text className='mr-1 pt-1 text-l text-primary'>168cm</Text>
                <Text className='mr-1 pt-1 text-l text-primary'>〜</Text>
                <Text className='mr-2 pt-1 text-l text-primary'>180cm</Text>
              </View>
            }
          />
        </View>

        <FilterSection
          title='体型'
          options={BODY_TYPES}
          selectedValues={selectedBodyTypes}
          onValueChange={createToggleHandler(setSelectedBodyTypes)}
        />

        <FilterSection
          title='休日'
          options={HOLIDAYS}
          selectedValues={selectedHolidays}
          onValueChange={createToggleHandler(setSelectedHolidays)}
        />

        <FilterSection
          title='学歴'
          options={EDUCATION_LEVELS}
          selectedValues={selectedEducationLevels}
          onValueChange={createToggleHandler(setSelectedEducationLevels)}
        />

        <FilterSection
          title='年収'
          options={ANNUAL_INCOMES}
          selectedValues={selectedAnnualIncomes}
          onValueChange={createToggleHandler(setSelectedAnnualIncomes)}
        />

        <FilterSection
          title='血液型'
          options={BLOOD_TYPES}
          selectedValues={selectedBloodTypes}
          onValueChange={createToggleHandler(setSelectedBloodTypes)}
        />

        <FilterSection
          title='同居人'
          options={LIVING_SITUATIONS}
          selectedValues={selectedLivingSituations}
          onValueChange={createToggleHandler(setSelectedLivingSituations)}
        />

        <FilterSection
          title='兄弟姉妹'
          options={SIBLING_POSITIONS}
          selectedValues={selectedSiblingPositions}
          onValueChange={createToggleHandler(setSelectedSiblingPositions)}
        />

        <FilterSection
          title='話せる言語'
          options={SPOKEN_LANGUAGES}
          selectedValues={selectedSpokenLanguages}
          onValueChange={createToggleHandler(setSelectedSpokenLanguages)}
        />

        <FilterSection
          title='タバコ'
          options={SMOKING_HABITS}
          selectedValues={selectedSmokingHabits}
          onValueChange={createToggleHandler(setSelectedSmokingHabits)}
        />

        <FilterSection
          title='お酒'
          options={ALCOHOL_HABITS}
          selectedValues={selectedAlcoholHabits}
          onValueChange={createToggleHandler(setSelectedAlcoholHabits)}
        />

        <FilterSection
          title='結婚歴'
          options={MARITAL_STATUSES}
          selectedValues={selectedMaritalStatuses}
          onValueChange={createToggleHandler(setSelectedMaritalStatuses)}
        />

        <FilterSection
          title='子供の有無'
          options={CHILDREN_STATUSES}
          selectedValues={selectedChildrenStatuses}
          onValueChange={createToggleHandler(setSelectedChildrenStatuses)}
        />

        <FilterSection
          title='結婚に対する意思'
          options={MARRIAGE_INTENTIONS}
          selectedValues={selectedMarriageIntentions}
          onValueChange={createToggleHandler(setSelectedMarriageIntentions)}
        />

        <FilterSection
          title='子供が欲しいか'
          options={DESIRES_CHILDREN}
          selectedValues={selectedDesiresChildren}
          onValueChange={createToggleHandler(setSelectedDesiresChildren)}
        />

        <FilterSection
          title='家事・育児'
          options={HOUSEWORK_CHILDCARE_STYLES}
          selectedValues={selectedHouseworkChildcareStyles}
          onValueChange={createToggleHandler(
            setSelectedHouseworkChildcareStyles
          )}
        />

        <FilterSection
          title='出会うまでの希望'
          options={MEETING_PREFERENCES}
          selectedValues={selectedMeetingPreferences}
          onValueChange={createToggleHandler(setSelectedMeetingPreferences)}
        />

        <FilterSection
          title='初回デート費用'
          options={DATE_EXPENSE_PREFERENCES}
          selectedValues={selectedDateExpensePreferences}
          onValueChange={createToggleHandler(setSelectedDateExpensePreferences)}
        />

        <View className='mb-10 border-b-2 border-gray-300 text-xl'></View>

        <Text className='mb-5 text-xl font-bold text-body'>表示設定</Text>
        <FilterSection
          title='最終ログイン'
          options={LAST_LOGIN_PERIODS}
          selectedValues={selectedLastLoginPeriods}
          onValueChange={createToggleHandler(setSelectedLastLoginPeriods)}
        />
        <View className='mb-5'>
          <Lists
            title='自己紹介文あり'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            rightComponent={
              <ToggleSwitch
                isEnabled={isIntroductionPresent}
                onToggle={() => setIsIntroductionPresent((prev) => !prev)}
              />
            }
          />
        </View>
        <View className='mb-5'>
          <Lists
            title='サブ写真あり'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            rightComponent={
              <ToggleSwitch
                isEnabled={isIntroductionPresent}
                onToggle={() => setIsIntroductionPresent((prev) => !prev)}
              />
            }
          />
        </View>
        <View className='mb-5'>
          <Lists
            title='登録が3日以内'
            isTitleBold
            listType='L'
            isShowBottomBorder={false}
            rightComponent={
              <ToggleSwitch
                isEnabled={isIntroductionPresent}
                onToggle={() => setIsIntroductionPresent((prev) => !prev)}
              />
            }
          />
        </View>
      </Container>

      {/* 追従する検索ボタン */}
      <View
        className='border-t border-gray-3 bg-white px-4 py-5'
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <View className='flex-row gap-2'>
          {/* リセットボタン */}
          <View className='flex-1'>
            <Button
              text='リセット'
              size='large'
              className='border-gray-6 bg-gray-6'
              textStyle='text-white'
              onPress={() => {
                console.log('リセット実行');
              }}
            />
          </View>

          <View className='flex-1'>
            <Button
              text='この条件で検索'
              variant='primary'
              size='large'
              onPress={() => {
                console.log('検索実行');
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

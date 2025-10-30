import { Container, Text } from '@/components/bases';
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
import { View } from 'react-native';

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
    <Container isPaddingTop={false} style='mt-5 mb-20'>
      <Text className='mb-5 text-xl font-bold text-body'>
        プロフィールで絞り込み
      </Text>

      <View className='mb-10'>
        <Lists
          title='年齢'
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

      <View className='mb-10'>
        <Lists
          title='身長'
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
        onValueChange={createToggleHandler(setSelectedHouseworkChildcareStyles)}
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
  );
}

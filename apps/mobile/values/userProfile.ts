/**
 * 体型
 */
export const BODY_TYPES = [
  { value: 'SLIM', label: 'スリム' },
  { value: 'SLIGHTLY_SLIM', label: 'やや細め' },
  { value: 'AVERAGE', label: '普通' },
  { value: 'GLAMOROUS', label: 'グラマー' },
  { value: 'MUSCULAR', label: '筋肉質' },
  { value: 'SLIGHTLY_CHUBBY', label: 'ややぽっちゃり' },
  { value: 'CHUBBY', label: 'ぽっちゃり' }
] as const;

/**
 * 休日
 */
export const HOLIDAYS = [
  { value: 'WEEKDAYS', label: '平日' },
  { value: 'WEEKENDS', label: '土日祝' },
  { value: 'FLEXIBLE', label: '不定期' },
  { value: 'OTHER', label: 'その他' }
] as const;

/**
 * 学歴
 */
export const EDUCATION_LEVELS = [
  { value: 'HIGH_SCHOOL', label: '高卒' },
  { value: 'VOCATIONAL_SCHOOL', label: '専門・短大卒' },
  { value: 'UNIVERSITY', label: '大卒' },
  { value: 'GRADUATE_SCHOOL', label: '大学院卒' },
  { value: 'OTHER', label: 'その他' }
] as const;

/**
 * 年収
 */
export const ANNUAL_INCOMES = [
  { value: 'LESS_THAN_2M', label: '200万円未満' },
  { value: '2M_TO_4M', label: '200〜400万円' },
  { value: '4M_TO_6M', label: '400〜600万円' },
  { value: '6M_TO_8M', label: '600〜800万円' },
  { value: '8M_TO_10M', label: '800〜1000万円' },
  { value: '10M_TO_15M', label: '1000〜1500万円' },
  { value: '15M_TO_20M', label: '1500〜2000万円' },
  { value: '20M_TO_30M', label: '2000〜3000万円' },
  { value: 'MORE_THAN_30M', label: '3000万円以上' }
] as const;

/**
 * 血液型
 */
export const BLOOD_TYPES = [
  { value: 'A', label: 'A型' },
  { value: 'B', label: 'B型' },
  { value: 'O', label: 'O型' },
  { value: 'AB', label: 'AB型' },
  { value: 'UNKNOWN', label: '不明' }
] as const;

/**
 * 同居人
 */
export const LIVING_SITUATIONS = [
  { value: 'ALONE', label: '一人暮らし' },
  { value: 'WITH_FAMILY', label: '実家暮らし' },
  { value: 'WITH_ROOMMATE', label: 'ルームシェア' },
  { value: 'WITH_PET', label: 'ペットと一緒' },
  { value: 'OTHER', label: 'その他' }
] as const;

/**
 * 兄弟姉妹
 */
export const SIBLING_POSITIONS = [
  { value: 'ELDEST', label: '長男/長女' },
  { value: 'SECOND', label: '次男/次女' },
  { value: 'THIRD', label: '三男/三女' },
  { value: 'ONLY_CHILD', label: '一人っ子' },
  { value: 'OTHER', label: 'その他' }
] as const;

/**
 * 話せる言語（使用頻度順）
 */
export const SPOKEN_LANGUAGES = [
  { value: 'JAPANESE', label: '日本語' },
  { value: 'ENGLISH', label: '英語' },
  { value: 'CHINESE', label: '中国語' },
  { value: 'KOREAN', label: '韓国語' },
  { value: 'SPANISH', label: 'スペイン語' },
  { value: 'FRENCH', label: 'フランス語' },
  { value: 'ARABIC', label: 'アラビア語' },
  { value: 'PORTUGUESE', label: 'ポルトガル語' },
  { value: 'RUSSIAN', label: 'ロシア語' },
  { value: 'GERMAN', label: 'ドイツ語' },
  { value: 'HINDI', label: 'ヒンディー語' },
  { value: 'VIETNAMESE', label: 'ベトナム語' },
  { value: 'THAI', label: 'タイ語' },
  { value: 'TAGALOG', label: 'タガログ語' },
  { value: 'TURKISH', label: 'トルコ語' },
  { value: 'ITALIAN', label: 'イタリア語' },
  { value: 'URDU', label: 'ウルドゥー語' },
  { value: 'INDONESIAN', label: 'インドネシア語' },
  { value: 'PERSIAN', label: 'ペルシア語' },
  { value: 'MALAY', label: 'マレー語' },
  { value: 'DUTCH', label: 'オランダ語' },
  { value: 'GREEK', label: 'ギリシャ語' },
  { value: 'OTHER', label: 'その他' }
] as const;

/**
 * タバコ
 */
export const SMOKING_HABITS = [
  { value: 'NON_SMOKER', label: '吸わない' },
  { value: 'SMOKER', label: '吸う' },
  { value: 'E_CIGARETTE', label: '吸う（電子タバコ）' },
  { value: 'QUIT_IF_PARTNER_DISLIKES', label: '相手が嫌ならやめる' },
  { value: 'NOT_IN_FRONT_OF_NON_SMOKERS', label: '非喫煙者の前では吸わない' },
  { value: 'OCCASIONAL_SMOKER', label: '時々吸う' }
] as const;

/**
 * お酒
 */
export const ALCOHOL_HABITS = [
  { value: 'NON_DRINKER', label: '飲まない' },
  { value: 'DRINKER', label: '飲む' },
  { value: 'OCCASIONAL_DRINKER', label: '時々飲む' }
] as const;

/**
 * 結婚歴
 */
export const MARITAL_STATUSES = [
  { value: 'NEVER_MARRIED', label: '未婚' },
  { value: 'DIVORCED', label: '離婚歴あり' },
  { value: 'WIDOWED', label: '死別' }
] as const;

/**
 * 子供の有無
 */
export const CHILDREN_STATUSES = [
  { value: 'NONE', label: 'いない' },
  { value: 'HAS_CHILDREN_LIVING_TOGETHER', label: '同居中' },
  { value: 'HAS_CHILDREN_LIVING_SEPARATELY', label: '別居中' }
] as const;

/**
 * 結婚に対する意思
 */
export const MARRIAGE_INTENTIONS = [
  { value: 'ASAP', label: 'すぐにでもしたい' },
  { value: 'WITHIN_2_3_YEARS', label: '2-3年のうちにしたい' },
  { value: 'IF_GOOD_PARTNER', label: '良い人がいれば' },
  { value: 'DISCUSS_WITH_PARTNER', label: '相手と相談して考えたい' },
  { value: 'UNSURE', label: 'わからない' }
] as const;

/**
 * 子供が欲しいか
 */
export const DESIRES_CHILDREN = [
  { value: 'WANT', label: '欲しい' },
  { value: 'DO_NOT_WANT', label: '欲しくない' },
  { value: 'DISCUSS_WITH_PARTNER', label: '相手と相談して決める' },
  { value: 'UNSURE', label: 'わからない' }
] as const;

/**
 * 家事・育児
 */
export const HOUSEWORK_CHILDCARE_STYLES = [
  { value: 'ACTIVELY_PARTICIPATE', label: '積極的に参加したい' },
  { value: 'PREFER_TO_PARTICIPATE', label: 'できれば参加したい' },
  { value: 'COOPERATE_TOGETHER', label: '2人で協力したい' },
  { value: 'PREFER_TO_LEAVE_TO_PARTNER', label: 'できれば相手に任せたい' },
  { value: 'LEAVE_TO_PARTNER', label: '相手に任せたい' }
] as const;

/**
 * 出会うまでの希望
 */
export const MEETING_PREFERENCES = [
  { value: 'MEET_AFTER_MATCH', label: 'マッチング後にまずは会いたい' },
  { value: 'MEET_IF_COMPATIBLE', label: '気が合えば会いたい' },
  { value: 'MESSAGE_FIRST', label: 'メッセージを重ねてから会いたい' }
] as const;

/**
 * 初回デート費用
 */
export const DATE_EXPENSE_PREFERENCES = [
  { value: 'SPLIT', label: '割り勘' },
  { value: 'I_PAY_ALL', label: '自分が全て払う' },
  { value: 'I_PAY_MORE', label: '自分が多めに払う' },
  { value: 'PARTNER_PAYS_ALL', label: '相手に全て払って欲しい' },
  { value: 'PARTNER_PAYS_MORE', label: '相手に多く払って欲しい' },
  { value: 'WHOEVER_HAS_MORE', label: '持っている方が払う' },
  { value: 'DISCUSS_WITH_PARTNER', label: '相手と相談して決める' }
] as const;

/**
 * 最終ログイン
 */
export const LAST_LOGIN_PERIODS = [
  { value: 'ONLINE', label: 'オンライン' },
  { value: 'WITHIN_24_HOURS', label: '24時間以内' },
  { value: 'WITHIN_3_DAYS', label: '3日以内' },
  { value: 'WITHIN_1_WEEK', label: '1週間以内' },
  { value: 'WITHIN_2_WEEKS', label: '2週間以内' },
  { value: 'WITHIN_1_MONTH', label: '1ヶ月以内' },
  { value: 'WITHIN_3_MONTHS', label: '3ヶ月以内' },
  { value: 'MORE_THAN_3_MONTHS', label: '3ヶ月以上' }
] as const;

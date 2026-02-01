-- CreateTable
CREATE TABLE `r_user_introductions` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,

    UNIQUE INDEX `r_user_introductions_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_introduction_updates` (
    `id` VARCHAR(191) NOT NULL,
    `user_introduction_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_user_languages` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `language` ENUM('JAPANESE', 'ENGLISH', 'CHINESE', 'HINDI', 'SPANISH', 'RUSSIAN', 'FRENCH', 'ARABIC', 'PORTUGUESE', 'MALAY', 'BENGALI', 'GERMAN', 'URDU', 'ITALIAN', 'KOREAN', 'VIETNAMESE', 'PERSIAN', 'TAGALOG', 'THAI', 'TURKISH', 'OTHER') NOT NULL,

    UNIQUE INDEX `r_user_languages_user_id_language_key`(`user_id`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_language_updates` (
    `id` VARCHAR(191) NOT NULL,
    `user_language_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_user_personality_types` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `personality_type` ENUM('KIND', 'STRAIGHTFORWARD', 'DECISIVE', 'GENTLE', 'APPROACHABLE', 'CHEERFUL', 'INDOOR', 'OUTDOOR', 'EARNEST', 'INTELLECTUAL', 'SINCERE', 'METICULOUS', 'OPTIMISTIC', 'SHY', 'ALWAYS_SMILING', 'ELEGANT', 'COMPOSED', 'HUMBLE', 'STRICT', 'COMPASSIONATE', 'LONELY', 'SOCIABLE', 'COOL_HEADED', 'CURIOUS', 'FAMILY_ORIENTED', 'CAREER_ORIENTED', 'RESPONSIBLE', 'CARING', 'GOOD_TALKER', 'GOOD_LISTENER', 'REFRESHING', 'ACTION_ORIENTED', 'RATIONAL', 'COMPETITIVE', 'FUNNY', 'PASSIONATE', 'PERCEPTIVE', 'ATTENTIVE', 'BOLD', 'TOLERANT', 'GENEROUS', 'NATURAL', 'GENUINE', 'EASYGOING', 'RESERVED', 'MOODY') NOT NULL,

    UNIQUE INDEX `r_user_personality_types_user_id_personality_type_key`(`user_id`, `personality_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_personality_type_updates` (
    `id` VARCHAR(191) NOT NULL,
    `user_personality_type_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_user_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `blood_type` ENUM('A', 'B', 'O', 'AB') NULL,
    `height` INTEGER NULL,
    `body_type` ENUM('SLIM', 'AVERAGE', 'GLAMOROUS', 'ATHLETIC', 'CHUBBY', 'HEAVY') NULL,
    `residence_prefecture` VARCHAR(191) NULL,
    `residence_city` VARCHAR(191) NULL,
    `birthplace` VARCHAR(191) NULL,
    `workplace_prefecture` VARCHAR(191) NULL,
    `workplace_city` VARCHAR(191) NULL,
    `sibling_position` ENUM('ELDEST', 'SECOND', 'THIRD', 'ONLY_CHILD', 'OTHER') NULL,
    `education_level` ENUM('HIGH_SCHOOL', 'COLLEGE', 'UNIVERSITY', 'GRADUATE_SCHOOL', 'OTHER') NULL,
    `school_name` VARCHAR(191) NULL,
    `annual_income_range` ENUM('BELOW_200', 'BETWEEN_200_400', 'BETWEEN_400_600', 'BETWEEN_600_800', 'BETWEEN_800_1000', 'BETWEEN_1000_1500', 'BETWEEN_1500_2000', 'BETWEEN_2000_3000', 'ABOVE_3000') NULL,
    `occupation` ENUM('LISTED_COMPANY', 'FINANCE', 'GOVERNMENT', 'MILITARY', 'FIREFIGHTER', 'CONSULTANT', 'EXECUTIVE', 'MAJOR_COMPANY', 'MAJOR_FOREIGN', 'MAJOR_TRADING', 'FOREIGN_FINANCE', 'SALES', 'DOCTOR', 'PHARMACIST', 'MEDICAL', 'NURSE', 'BEAUTY', 'LAWYER', 'ACCOUNTANT', 'TAX_ACCOUNTANT', 'AVIATION', 'ADVERTISING', 'MEDIA', 'EDUCATION', 'IT', 'FOOD', 'TRAVEL', 'DISTRIBUTION', 'PHARMACEUTICAL', 'INSURANCE', 'REAL_ESTATE', 'CONSTRUCTION', 'TELECOMMUNICATIONS', 'MANUFACTURING', 'WEB', 'ENGINEER', 'DESIGNER', 'CREATOR', 'SERVICE', 'CHEF_NUTRITIONIST', 'APPAREL', 'ENTERTAINMENT', 'ATHLETE', 'ANNOUNCER', 'ENTERTAINER_MODEL', 'RECEPTIONIST', 'SECRETARY', 'OFFICE_WORKER', 'WELFARE', 'CHILDCARE', 'COMPANY_EMPLOYEE', 'STUDENT', 'SELF_EMPLOYED', 'FREELANCE', 'BRIDAL', 'OTHER') NULL,
    `occupation_name` VARCHAR(191) NULL,
    `holiday` ENUM('WEEKENDS', 'WEEKDAYS', 'IRREGULAR', 'OTHER') NULL,
    `drinking_habit` ENUM('NEVER', 'SOMETIMES', 'REGULARLY') NULL,
    `smoking_habit` ENUM('NEVER', 'SOMETIMES', 'REGULARLY', 'E_CIGARETTE', 'WILL_QUIT_FOR_PARTNER', 'NOT_AROUND_NONSMOKERS') NULL,
    `living_situation` ENUM('ALONE', 'ROOMSHARE', 'WITH_PET', 'WITH_FAMILY', 'OTHER') NULL,
    `marital_history` ENUM('NEVER_MARRIED', 'DIVORCED', 'WIDOWED') NULL,
    `has_children` ENUM('NONE', 'LIVING_TOGETHER', 'NOT_TOGETHER') NULL,
    `marriage_intention` ENUM('ASAP', 'WITHIN_2_3_YEARS', 'IF_RIGHT', 'DISCUSS', 'UNSURE') NULL,
    `wants_children` ENUM('YES', 'NO', 'DISCUSS', 'UNSURE') NULL,
    `housework_childcare` ENUM('WILLING', 'IF_POSSIBLE', 'COOPERATE', 'PREFER_PARTNER', 'LEAVE_TO_PARTNER') NULL,
    `meeting_preference` ENUM('RIGHT_AWAY', 'IF_WE_CLICK', 'AFTER_CHATTING') NULL,
    `date_expense` ENUM('SPLIT_EQUALLY', 'I_PAY_ALL', 'I_PAY_MORE', 'PARTNER_PAYS_ALL', 'PARTNER_PAYS_MORE', 'WHOEVER_CAN', 'DISCUSS') NULL,
    `sociability` ENUM('LOVES_GROUPS', 'PREFERS_ALONE', 'QUICK_TO_BOND', 'GRADUALLY') NULL,

    UNIQUE INDEX `r_user_profiles_user_id_key`(`user_id`),
    INDEX `r_user_profiles_residence_prefecture_residence_city_idx`(`residence_prefecture`, `residence_city`),
    INDEX `r_user_profiles_workplace_prefecture_workplace_city_idx`(`workplace_prefecture`, `workplace_city`),
    INDEX `r_user_profiles_height_idx`(`height`),
    INDEX `r_user_profiles_blood_type_idx`(`blood_type`),
    INDEX `r_user_profiles_body_type_idx`(`body_type`),
    INDEX `r_user_profiles_birthplace_idx`(`birthplace`),
    INDEX `r_user_profiles_sibling_position_idx`(`sibling_position`),
    INDEX `r_user_profiles_education_level_idx`(`education_level`),
    INDEX `r_user_profiles_annual_income_range_idx`(`annual_income_range`),
    INDEX `r_user_profiles_occupation_idx`(`occupation`),
    INDEX `r_user_profiles_holiday_idx`(`holiday`),
    INDEX `r_user_profiles_drinking_habit_idx`(`drinking_habit`),
    INDEX `r_user_profiles_smoking_habit_idx`(`smoking_habit`),
    INDEX `r_user_profiles_living_situation_idx`(`living_situation`),
    INDEX `r_user_profiles_marital_history_idx`(`marital_history`),
    INDEX `r_user_profiles_has_children_idx`(`has_children`),
    INDEX `r_user_profiles_marriage_intention_idx`(`marriage_intention`),
    INDEX `r_user_profiles_wants_children_idx`(`wants_children`),
    INDEX `r_user_profiles_housework_childcare_idx`(`housework_childcare`),
    INDEX `r_user_profiles_meeting_preference_idx`(`meeting_preference`),
    INDEX `r_user_profiles_date_expense_idx`(`date_expense`),
    INDEX `r_user_profiles_sociability_idx`(`sociability`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_profile_updates` (
    `id` VARCHAR(191) NOT NULL,
    `user_profile_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_devices` (
    `id` VARCHAR(191) NOT NULL,
    `device_id` VARCHAR(191) NOT NULL,
    `device_model_id` VARCHAR(191) NOT NULL,
    `expo_push_token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `r_devices_device_id_key`(`device_id`),
    INDEX `r_devices_device_id_idx`(`device_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_users` (
    `id` VARCHAR(191) NOT NULL,
    `device_id` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `birth_year` INTEGER NOT NULL,
    `birth_month` INTEGER NOT NULL,
    `birth_day` INTEGER NOT NULL,
    `current_membership_status` ENUM('FREE', 'PREMIUM', 'LAPSED', 'CANCELED') NOT NULL,
    `current_verification_status` ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED') NOT NULL,
    `current_login_status` ENUM('LOGGED_OUT', 'LOGGED_IN') NOT NULL,

    UNIQUE INDEX `r_users_device_id_key`(`device_id`),
    INDEX `r_users_gender_birth_year_idx`(`gender`, `birth_year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `r_user_introductions` ADD CONSTRAINT `r_user_introductions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_user_introduction_updates` ADD CONSTRAINT `e_user_introduction_updates_user_introduction_id_fkey` FOREIGN KEY (`user_introduction_id`) REFERENCES `r_user_introductions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_user_languages` ADD CONSTRAINT `r_user_languages_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_user_language_updates` ADD CONSTRAINT `e_user_language_updates_user_language_id_fkey` FOREIGN KEY (`user_language_id`) REFERENCES `r_user_languages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_user_personality_types` ADD CONSTRAINT `r_user_personality_types_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_user_personality_type_updates` ADD CONSTRAINT `e_user_personality_type_updates_user_personality_type_id_fkey` FOREIGN KEY (`user_personality_type_id`) REFERENCES `r_user_personality_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_user_profiles` ADD CONSTRAINT `r_user_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_user_profile_updates` ADD CONSTRAINT `e_user_profile_updates_user_profile_id_fkey` FOREIGN KEY (`user_profile_id`) REFERENCES `r_user_profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_users` ADD CONSTRAINT `r_users_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `r_devices`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

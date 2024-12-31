import React, {useCallback, useRef} from 'react';
import {
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import EditProfileModalSheet from '@/components/organisms/Profile/EditProfileModalSheet/EditProfileModalSheet';
import {PHOTO_URL_END_POINT} from '@/api/config/endpoint';
import {ThemedText} from '@/components/atoms';
import MenuItemList from '@/components/organisms/Profile/MenuItemList/MenuItemList';
import ProfileInfo from '@/components/organisms/Profile/ProfileInfo/ProfileInfo';
import {SafeScreen} from '@/components/template';
import {useTheme} from '@/context/ThemeProvider';
import {useGetUserAccountInfoQuery} from '@/store/features/user/userApi';
import {ContrastIcon} from '@/utils/svg/icon.common';
import {SwitchOffIcon, SwitchOnIcon} from '@/utils/svg/icon.profile';

const ProfileScreen = () => {
  const {colorScheme, toggleTheme, useSystemTheme, toggleSystemTheme} =
    useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  /**
   * Handle profile edit modal changes
   */
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const {data, isSuccess} = useGetUserAccountInfoQuery('getUserAccountInfo');

  const fetchImage =
    data?.image === null
      ? require('@/assets/images/profile-img.png')
      : {uri: `${PHOTO_URL_END_POINT}/${data?.image}`};

  return (
    <SafeScreen>
      {!isSuccess ? (
        <ActivityIndicator
          className="flex-1"
          size={isTablet() ? 'large' : 'small'}
          color={'#8F5F43'}
        />
      ) : (
        <>
          <ImageBackground
            source={fetchImage}
            className="h-72 md:h-[500px] shadow-lg"
            blurRadius={10}>
            {/* Toggle Dark/Light Mode */}
            <Pressable
              disabled={useSystemTheme}
              className="absolute top-2 md:top-8 right-4 md:right-8 bg-ecomm-text-black p-2 md:p-4 rounded-xl md:rounded-3xl"
              onPress={toggleTheme}>
              <ContrastIcon
                colorScheme={colorScheme}
                stroke={useSystemTheme ? '#9299A3' : '#FFF'}
              />
            </Pressable>
            {/* Toggle Dark/Light Mode */}

            <ProfileInfo name={data.name} image={fetchImage} />
          </ImageBackground>
          {/* Menu Items List */}
          <MenuItemList onPressMyDetail={handlePresentModalPress} />
          {/* Menu Items List */}

          {/* Use System Theme*/}
          <View className="flex-row items-center mx-10">
            <ThemedText className="mr-3 md:mr-6" size={'md_16'}>Use System Theme</ThemedText>
            <Pressable onPress={toggleSystemTheme}>
              {useSystemTheme ? <SwitchOnIcon /> : <SwitchOffIcon />}
            </Pressable>
          </View>
          {/* Use System Theme*/}

          <EditProfileModalSheet
            colorScheme={colorScheme}
            bottomSheetModalRef={bottomSheetModalRef}
            data={data}
          />
        </>
      )}
    </SafeScreen>
  );
};

export default ProfileScreen;

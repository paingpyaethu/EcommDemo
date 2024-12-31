import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Pressable,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {FormProvider, useForm} from 'react-hook-form';
import {ProfileFormValues, profileFormSchema} from '@/types/schemas/profile';
import {zodResolver} from '@hookform/resolvers/zod';
import {ImagePickerBottomSheet, ThemedTextInput} from '@/components/molecules';
import {Image} from 'react-native';
import {cn} from '@/utils/twutil';
import {CameraIcon} from '@/utils/svg/icon.profile';
import {PHOTO_URL_END_POINT} from '@/api/config/endpoint';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {isTablet} from 'react-native-device-info';
import {useUpdateUserDataMutation} from '@/store/features/user/userApi';
import ImageCropPicker from 'react-native-image-crop-picker';
import {showToast} from '@/utils/toastConfig';
import {useHeaderHeight} from '@react-navigation/elements';

const {height} = Dimensions.get('window');

interface EditProfileModalSheetProps {
  colorScheme: string;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  data: {
    email: string;
    name: string;
    image: string;
  };
}
const EditProfileModalSheet = ({
  colorScheme,
  bottomSheetModalRef,
  data,
}: EditProfileModalSheetProps) => {
  /**
   * Initialize form with react-hook-form and Zod resolver for validation
   */
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: data.email,
      name: data.name,
    },
    mode: 'onChange',
  });

  const headerHeight = useHeaderHeight();

  // State for image picker and image preview
  const [openImagePickerBottomSheet, setOpenImagePickerBottomSheet] =
    useState(false);
  const [imagePreview, setImagePreview] = useState<any | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  /**
   * Handle image picker bottom sheet changes
   */
  const handleSheetChanges = useCallback((index: number) => {
    setOpenImagePickerBottomSheet(index !== -1);
    index === -1 && bottomSheetModalRef.current?.present();
  }, []);

  /**
   * Open the camera for capturing an image
   */
  const handleOpenCamera = useCallback(() => {
    ImageCropPicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: false,
      mediaType: 'photo',
    })
      .then(response => {
        setImagePreview({
          uri: response.path,
          type: response.mime,
          fileName: response.path.split('/').pop(),
        });
        closeImagePicker();
      })
      .catch(error => handlePickerError(error));
  }, []);

  /**
   * Open the gallery for selecting an image
   */
  const handleOpenGallery = useCallback(() => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      mediaType: 'photo',
    })
      .then(response => {
        setImagePreview({
          uri: response.path,
          type: response.mime,
          fileName: response.path.split('/').pop(),
        });
        closeImagePicker();
      })
      .catch(error => handlePickerError(error));
  }, []);

  /**
   * Close the image picker and reopen the modal
   */
  const closeImagePicker = () => {
    bottomSheetModalRef.current?.present();
    bottomSheetRef.current?.close();
  };

  /**
   * Handle errors from image picker
   */
  const handlePickerError = (error: any) => {
    closeImagePicker();
    Alert.alert(error.message ? error.message : 'Image picker error');
  };

  const [updateUserDataMutation, {isLoading}] = useUpdateUserDataMutation();

  const onSubmit = async (values: ProfileFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);

    if (imagePreview) {
      formData.append('image', {
        uri: imagePreview.uri,
        type: imagePreview.type,
        name: imagePreview.fileName,
      });
    }

    try {
      const payload = await updateUserDataMutation(formData).unwrap();
      if (payload.success) {
        bottomSheetModalRef.current?.close();
        showToast({
          text1: 'Update successful!',
          topOffset: headerHeight + height * 0.03,
        });
      } else {
        Alert.alert('Update failed', 'Please try again.');
      }
    } catch (error) {
      console.log('Error updating user data:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  const fetchImage =
    data.image === null || data.image === 'null'
      ? require('@/assets/images/profile-img.png')
      : {uri: `${PHOTO_URL_END_POINT}/${data.image}`};

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enablePanDownToClose
        keyboardBehavior="fillParent"
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: colorScheme === 'light' ? '#f8fafc' : '#18181b',
        }}
        handleIndicatorStyle={{
          backgroundColor: colorScheme === 'light' ? '#000000' : '#f8fafc',
        }}>
        <FormProvider {...form}>
          <BottomSheetView>
            <View className="px-6 md:px-12 my-6 md:my-12">
              <View className="items-center">
                <View className="relative items-center">
                  <Image
                    source={imagePreview ? imagePreview : fetchImage}
                    className={cn(
                      'w-20 h-20 md:w-40 md:h-40 rounded-full border-2 md:border-[4px] border-ecomm-primary',
                    )}
                  />
                  <Pressable
                    className={cn(
                      'absolute bg-ecomm-primary-dark rounded-full bottom-0 -right-1 p-1 md:p-2',
                    )}
                    onPress={() => {
                      setOpenImagePickerBottomSheet(true);
                      bottomSheetModalRef.current?.close();
                    }}>
                    <CameraIcon />
                  </Pressable>
                </View>
              </View>
              <ThemedTextInput
                testID="email"
                label="Email"
                name="email"
                isDisabled
              />
              <ThemedTextInput testID="name" label="Name" name="name" />
              <ThemedButton
                testID="userDataUpdateButton"
                onPress={form.handleSubmit(onSubmit)}>
                {isLoading ? (
                  <ActivityIndicator
                    color={'#fff'}
                    size={isTablet() ? 'large' : 'small'}
                  />
                ) : (
                  <ThemedText variant={'button'}>Submit</ThemedText>
                )}
              </ThemedButton>
            </View>
          </BottomSheetView>
        </FormProvider>
      </BottomSheetModal>
      {openImagePickerBottomSheet && (
        <ImagePickerBottomSheet
          colorScheme={colorScheme}
          bottomSheetRef={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
          handleOpenCamera={handleOpenCamera}
          handleOpenGallery={handleOpenGallery}
        />
      )}
    </>
  );
};

export default EditProfileModalSheet;

import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  CameraPickerSheetIcon,
  GalleryPickerSheetIcon,
} from '@/utils/svg/icon.profile';
import {ThemedText} from '@/components/atoms';

interface ImagePickerBottomSheetProps {
  colorScheme: string;
  bottomSheetRef: React.RefObject<BottomSheet>;
  handleSheetChanges: (index: number) => void;
  handleOpenCamera: () => void;
  handleOpenGallery: () => void;
}
const ImagePickerBottomSheet = ({
  colorScheme,
  bottomSheetRef,
  handleSheetChanges,
  handleOpenCamera,
  handleOpenGallery,
}: ImagePickerBottomSheetProps) => {
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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? '#f8fafc' : '#18181b',
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === 'light' ? '#000000' : '#f8fafc',
      }}>
      <BottomSheetView
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Pressable
          className="flex-1 items-center mb-3 md:mb-6"
          onPress={handleOpenCamera}>
          <CameraPickerSheetIcon
            fill={colorScheme === 'light' ? '#1C274C' : '#FFFFFF'}
          />
          <ThemedText>Camera</ThemedText>
        </Pressable>
        <Pressable
          className="flex-1 items-center mb-3 md:mb-6"
          onPress={handleOpenGallery}>
          <GalleryPickerSheetIcon
            fill={colorScheme === 'light' ? '#1C274C' : '#FFFFFF'}
          />
          <ThemedText>Gallery</ThemedText>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ImagePickerBottomSheet;

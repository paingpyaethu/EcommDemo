import {ThemedButton, ThemedText} from '@/components/atoms';
import {ThemedTextInput} from '@/components/molecules';
import {KeyboardAvoidingLayout, SafeScreen} from '@/components/template';
import {categoryData, colorData, sizeData} from '@/constant';
import {useTheme} from '@/context/ThemeProvider';
import {useCreateProductMutation} from '@/store/features/product/productApi';
import {ProductFormValues, productFormSchema} from '@/types/schemas/product';
import {goBack} from '@/utils/navigationUtil';
import {GalleryPickerSheetIcon} from '@/utils/svg/icon.profile';
import {showToast} from '@/utils/toastConfig';
import {cn} from '@/utils/twutil';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useCallback, useState} from 'react';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {Image} from 'react-native';
import {View, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import {isTablet} from 'react-native-device-info';
import ImageCropPicker from 'react-native-image-crop-picker';

const CreateProductScreen = () => {
  const {colorScheme} = useTheme();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      colors: [],
      sizes: [],
    },
  });

  const [imageUri, setImageUri] = useState<any | null>(null);
  const [categories] = useState(categoryData);
  const [availableColors] = useState(colorData);
  const [availableSizes] = useState(sizeData);

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
        setImageUri({
          uri: response.path,
          type: response.mime,
          fileName: response.path.split('/').pop(),
        });
      })
      .catch(error => {
        Alert.alert(error.message ? error.message : 'Image picker error');
      });
  }, []);

  const toggleSelect = (
    selectedId: number,
    fieldValue: number[],
    setField: (value: number[]) => void,
  ) => {
    if (fieldValue.includes(selectedId)) {
      setField(fieldValue.filter(id => id !== selectedId));
    } else {
      setField([...fieldValue, selectedId]);
    }
  };

  const [createProductMutation, {isLoading}] = useCreateProductMutation();

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('categoryId', values.categoryId);
      formData.append('colors', JSON.stringify(values.colors));
      formData.append('sizes', JSON.stringify(values.sizes));
      if (imageUri) {
        formData.append('image', {
          uri: imageUri.uri,
          type: imageUri.type,
          name: imageUri.fileName,
        });
      }
      const payload = await createProductMutation(formData).unwrap();
      if (payload.success) {
        showToast({
          text1: 'Product created successfully',
        });
        goBack();
      }
    } catch (error: any) {
      console.error('Error submitting product data:', error);
      showToast({
        type: 'error',
        text1: error?.data?.message ?? 'Something went wrong!',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <SafeScreen>
        <View className="mx-4 md:mx-8 my-3 md:my-6">
          <KeyboardAvoidingLayout>
            <ThemedTextInput label="Name" name="name" />
            <ThemedTextInput label="Description" name="description" />
            <ThemedTextInput label="Price" name="price" />

            <Controller
              control={form.control}
              name="categoryId"
              render={({field: {value, onChange}}) => (
                <View className="space-y-2">
                  <ThemedText variant={'grey'} weight={'medium'}>
                    Select Category
                  </ThemedText>
                  <View className="flex-row flex-wrap mb-1 md:mb-2">
                    {categories.map(category => (
                      <TouchableOpacity
                        key={category.id}
                        className={cn(
                          'rounded-md md:rounded-xl border md:border-2 border-ecomm-grey mx-1 md:mx-2 justify-center py-1 md:py-2 px-3 md:px-6 mb-2 md:mb-4',
                          value === String(category.id) &&
                            'bg-slate-400 dark:bg-slate-800',
                        )}
                        onPress={() => onChange(String(category.id))}>
                        <ThemedText>{category.name}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
            {form.formState.errors.categoryId && (
              <ThemedText variant={'error'}>
                {form.formState.errors.categoryId.message}
              </ThemedText>
            )}

            <Controller
              control={form.control}
              name="colors"
              render={({field: {value, onChange}}) => (
                <View className="space-y-2 mt-1 md:mt-2">
                  <ThemedText variant={'grey'} weight={'medium'}>
                    Select Colors:
                  </ThemedText>
                  <View className="flex-row flex-wrap mb-1 md:mb-2">
                    {availableColors.map(color => (
                      <TouchableOpacity
                        key={color.id}
                        className={cn(
                          'w-8 h-8 md:w-16 md:h-16 rounded-full border md:border-2 border-ecomm-grey mx-1 md:mx-2 justify-center',
                        )}
                        style={[{backgroundColor: color.bgColor}]}
                        onPress={() => toggleSelect(color.id, value, onChange)}>
                        <ThemedText variant={'primary'} className="text-center">
                          {value.includes(color.id) ? '✔' : ''}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
            {form.formState.errors.colors && (
              <ThemedText variant={'error'}>
                {form.formState.errors.colors.message}
              </ThemedText>
            )}

            <Controller
              control={form.control}
              name="sizes"
              render={({field: {value, onChange}}) => (
                <View className="space-y-2 mt-1 md:mt-2">
                  <ThemedText variant={'grey'} weight={'medium'}>
                    Select Sizes:
                  </ThemedText>
                  <View className="flex-row flex-wrap mb-1 md:mb-2">
                    {availableSizes.map(size => (
                      <TouchableOpacity
                        key={size.id}
                        className={cn(
                          'w-8 h-8 md:w-16 md:h-16 bg-slate-400 dark:bg-slate-800 rounded-full items-center justify-center border md:border-2 border-ecomm-grey mx-1 md:mx-2',
                        )}
                        onPress={() => toggleSelect(size.id, value, onChange)}>
                        <ThemedText
                          variant={value.includes(size.id) ? 'green' : 'button'}
                          size={'xs_12'}
                          className="text-center">
                          {size.name}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
            {form.formState.errors.sizes && (
              <ThemedText variant={'error'}>
                {form.formState.errors.sizes.message}
              </ThemedText>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center mt-4 md:mt-8 border md:border-2 rounded-lg md:rounded-2xl border-ecomm-black dark:border-white py-1 px-3 md:py-2 md:px-6"
              onPress={handleOpenGallery}>
              <GalleryPickerSheetIcon
                fill={colorScheme === 'light' ? '#1C274C' : '#FFFFFF'}
              />
              <ThemedText className="ml-2 md:ml-4">Pick an Image</ThemedText>
            </TouchableOpacity>
            {imageUri && (
              <Image
                source={imageUri}
                className="w-24 h-24 md:w-48 md:h-48 mt-2 md:mt-4 rounded-md md:rounded-xl"
              />
            )}
            <ThemedButton
              className="mt-10"
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
          </KeyboardAvoidingLayout>
        </View>
      </SafeScreen>
    </FormProvider>
  );
};

export default CreateProductScreen;

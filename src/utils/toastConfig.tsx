import {View} from 'react-native';
import Toast, {ToastShowParams} from 'react-native-toast-message';
import {ThemedText} from '@/components/atoms';

export const toastConfig = {
  success: ({text1}: {text1?: string | undefined}) => (
    <View className="mt-10 md:mt-16 bg-slate-100 dark:bg-gray-700 border-l-4 md:border-l-8 border-l-emerald-900 dark:border-l-emerald-400 rounded-tr-md md:rounded-tr-xl rounded-br-md md:rounded-br-xl shadow-md py-4 md:py-8 px-6 md:px-16">
      <ThemedText weight={'bold'}>{text1}</ThemedText>
    </View>
  ),
  error: ({text1}: {text1?: string | undefined}) => (
    <View className="mt-10 md:mt-16 bg-slate-100 dark:bg-gray-700 border-l-4 md:border-l-8 border-l-ecomm-text-error dark:border-l-ecomm-text-error-dark rounded-tr-md md:rounded-tr-xl rounded-br-md md:rounded-br-xl shadow-md py-4 md:py-8 px-6 md:px-16">
      <ThemedText weight={'bold'}>{text1}</ThemedText>
    </View>
  ),
};

export const showToast = (params: ToastShowParams) => {
  Toast.show({
    type: params.type ?? 'success',
    position: params.position ?? 'top',
    text1: params.text1,
    visibilityTime: 5000,
    autoHide: true,
    topOffset: params.topOffset,
  });
};

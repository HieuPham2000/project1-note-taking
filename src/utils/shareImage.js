import { ActivityIndicator,
   Button, 
   Clipboard, 
   Image, 
   Share, 
   Alert } from 'react-native';

export const shareImage = (image) => {
  Share.share({
    message: image,
    title: 'Check out this photo',
    url: image,
  });
};

export const copyToClipboard = (image) => {
  Clipboard.setString(image);
  Alert.alert('Thông báo', 'Đã lưu đường dẫn ảnh vào bộ nhớ tạm!');
};
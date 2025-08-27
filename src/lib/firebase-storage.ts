import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth } from '@/lib/firebase'; // Your existing firebase config

export const uploadProfileImage = async (file: File): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload images');
  }

  // Validate file
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    throw new Error('Image must be less than 5MB');
  }

  const storage = getStorage();
  const fileExtension = file.name.split('.').pop();
  const fileName = `profile-${Date.now()}.${fileExtension}`;
  const storageRef = ref(storage, `profile-images/${auth.currentUser.uid}/${fileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

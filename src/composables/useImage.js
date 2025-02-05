import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uid } from "uid";

export default function useImage() {

  const url = ref(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Verifica que el archivo sea una imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen.');
        return;
      }

      // Almacenar en storage firebase
      const storage = useFirebaseStorage()
      const type = file.type;
      const extension = type.substring(type.indexOf('/') + 1, type.length);
      const filename = `${uid()}.${extension}`;
      const sRef = storageRef(storage, '/products/' + filename);
      const uploadTask = uploadBytesResumable(sRef, file);

      uploadTask.on('state_changed',
        () => { },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            url.value = downloadURL
          })
        }
      );
    }
  };

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null
  });

  return {
    onFileChange,
    url,
    isImageUploaded
  };
}

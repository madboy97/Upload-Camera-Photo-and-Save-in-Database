import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {storage } from './config.js';


const App = () => {
  const [image, setImage] = useState(null);
  const sendImage = async () => {
    
    let resullt = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!resullt.canceled) {
      setImage(resullt.uri);
    }
  };
  useEffect(() => {
    const uploadImage = async () => {
      alert('Image is Uploading! Wait!')

      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };
      
      const storageRef = ref(storage, 'image/' + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
         
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          
          switch (error.code) {
            case 'storage/unauthorized':
              alert('storage not authorized')
              
              break;
            case 'storage/canceled':
              alert('Storeage not accessed')
              
              break;

              

            case 'storage/unknown':
              alert('unknown storage access')
              
              break;
          }
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            alert('Image Has Been Uploaded')
          });
        }
      );
    }
    if (image != null) {
      
      uploadImage(),
        setImage(null);
    }
  }, [image])

  return (
    <View style={{ flex: 1}}>
      
      <View style={{alignItems:'center'}}>
      <TouchableOpacity
          style={{ backgroundColor: "skyblue", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, marginTop:200}}
          onPress={sendImage}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 30 }}>Click a Photo</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

export default App;
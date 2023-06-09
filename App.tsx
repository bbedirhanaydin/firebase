import React from 'react';
import {SafeAreaView, Text, Pressable, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const App = () => {
  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(res => console.log('Sign in'))
      .catch(error => console.log(error));
  };

  const logout = () => {
    auth()
      .signOut()
      .then(res => console.log('Sign out'))
      .catch(error => console.log(error));
  };

  const checkOut = () => {
    const user = auth().currentUser;
    console.log(user);
  };
  //check Out da currentUser la kullanıcının mevcut oturum durumunu kontrol ediyoruz.
  //Null gelirse mevcut oturumu yok. Oturum açıksa bilgileri verecek. oturum bilgilerini tutar.

  const checkDB = () => {
    const reference = database().ref('books');
    reference.on('value', snapshot => {
      console.log(snapshot.val());
    });
  };
  //once içindeki value değeri ile ne istediğimizi belirleriz mesela en son ekleneni getir diyebiliriz.

  const listenDB = () => {
    const reference = database().ref('books');
    reference.on('value', snapshot => {
      console.log('User data: ', snapshot.val());
    });
  };

  // Değişiklikler takip eden bir listener oluşturduk. Her değişiklikte tetiklenecek.
  //DB de bir şey kaldırıldığı anda listenDB tetikleniyor ve kodda belirttiğimiz gibi verinin güncel halini
  //consolda gördük. Her değişiklikte listenDB tetiklenir ve çalışır.
  //ref kısımnda books altındaki 3 ismini verdiğimiz elemana ulaşmak istersek books/3 diye belirtiriz.

  const setDB = () => {
    const reference = database().ref('car/rentable');
    reference.set({
      brand: 'Audi',
      model: 'A8',
      price: 128,
    });
  };

  // buradaki en öndemli detaylardan biri car/rentable yolu DB de yok buna rağmen önce bu yolu oluituruyor sonra objeyi buraya set ediyor.
  //car>rentable>{} şeklinde oluşuyor.
  // objede verdiğimiz değerleri değiştirip setDB çalıştırırsak oluşturduğu objenin üstünde bu değişiklikleri yapacak.

  const updateDB = () => {
    const reference = database().ref('car/rentable');
    reference.update({
      model: 'A5',
      color: 'gray',
    });
  };

  //belirtilen yoldaki model bilgisini güncelledik tüm yolu değil sadece o kısmı model bilgisini güncelliyor.
  //obje içine yeni bir eleman eklemek için de kullanılır.
  // model bilgisini değiştirecek color olmadığı için ekleyecek.

  const pushDB = () => {
    const reference = database().ref('car/rentable');
    reference.push({
      brand: 'Passat',
      model: '81',
      price: 650,
    });
  };

  //belirtilen yol içerisinde özel bir key oluşturur ve bunun içinde bilgileri gönderir.
  //car>rentable>oluşturduğu key yani [] oluşturur >{}

  const removeDB = async () => {
    const reference = await database().ref('car/rentable/color');
    reference.remove();
  };

  // yolda silinecek datayı belirttim car>rentable içindeki color bilgisini sil dedim.

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Hello Firebase</Text>
      <Pressable style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={checkOut}>
        <Text style={styles.buttonText}>Check User</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={checkDB}>
        <Text style={styles.buttonText}>Check DB</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={listenDB}>
        <Text style={styles.buttonText}>Listen DB</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={setDB}>
        <Text style={styles.buttonText}>Set DB</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={updateDB}>
        <Text style={styles.buttonText}>Update DB</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={pushDB}>
        <Text style={styles.buttonText}>Push DB</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={removeDB}>
        <Text style={styles.buttonText}>Remove DB</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#73BBC9',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 8,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  headerText: {
    fontSize: 30,
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 20,
    color: '#116A7B',
  },
});

export default App;

/* Firebase NoSQL yapıdadır. SQL yapısından farklı bir depolama mantığı vardır.
SQL de veriler ayrı ayrı gruplar halinde saklanırken NoSQL verileri tek bir grupta toplar.
Bir data aranırken her bir gruba tek tek bakılmak yerine tek bir grupta tüm veriler taranır.
Ayrıca NoSQL de sorgu gönderemezsiniz.*/

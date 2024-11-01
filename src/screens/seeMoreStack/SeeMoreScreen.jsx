import {
  Text,
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import CommonHeader from '../../components/commons/layout/header/CommonHeader';
import { useAuth } from '../../context/authContext';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/userApi';
import CustomButton from '../../components/commons/buttons/CustomButton';
import { globalStyles } from '../../styles/globalStyles';
import { editUserInfo } from '../../api/userApi';

export default function SeeMoreScreen() {
  const [userData, setUserData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { logOut } = useAuth();
  const fetchUserData = async () => {
    try {
      const data = await getUserInfo();
      setUserData(data);
      setEditedData(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    console.log(editedData);
    try {
      const result = await editUserInfo(editedData);
      if (result.success) {
        Alert.alert('회원정보 수정', '회원정보 수정이 완료되었습니다.', [
          {
            text: '확인',
            onPress: () => {
              setUserData(editedData);
              setModalVisible(false);
            },
          },
        ]);
      } else {
        console.error('사용자 정보 수정 실패:', result.message);
        alert(`수정 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };
  return (
    <MainWrapper>
      <MainContainer>
        <CommonHeader
          leftText="사용자 정보"
          rightText="수정"
          onPress={() => setModalVisible(true)}
        />
        {userData ? (
          <View style={styles.formWrapper}>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>이름</Text>
              <Text style={styles.contentData}>{userData.name}</Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>성별</Text>
              <Text style={styles.contentData}>
                {userData.profile.gender === 'MALE' ? '남성' : '여성'}
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>나이</Text>
              <Text style={styles.contentData}>{userData.profile.age}세</Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>키</Text>
              <Text style={styles.contentData}>
                {userData.profile.height}cm
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>체중</Text>
              <Text style={styles.contentData}>
                {userData.profile.weight}kg
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>사용자 목표</Text>
              <Text style={styles.contentData}>
                {userData.profile.goal === 'DIET' ? '다이어트' : '유지어트'}
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>목표 체중</Text>
              <Text style={styles.contentData}>
                {userData.profile.targetWeight}kg
              </Text>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </MainContainer>
      <MainContainer>
        <CommonHeader leftText="계정 정보" />
        {userData ? (
          <View style={styles.formWrapper}>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>이메일</Text>
              <Text style={styles.contentData}>{userData.email}</Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>비밀번호</Text>
              <Text style={styles.contentData}>*****</Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>전화번호</Text>
              <Text style={styles.contentData}>{userData.phoneNumber}</Text>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </MainContainer>
      <CustomButton
        onPress={() => {
          Alert.alert(
            '로그아웃',
            '로그아웃 하시겠습니까?',
            [
              {
                text: '취소',
                onPress: () => console.log('로그아웃 취소됨'),
                style: 'cancel',
              },
              {
                text: '로그아웃',
                onPress: () => logOut(),
              },
            ],
            { cancelable: true },
          );
        }}
        title="로그아웃"
      />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CommonHeader leftText="사용자 정보 수정" />
            <View style={styles.modalTextWrapper}>
              <Text>이름</Text>
              <TextInput
                editable={false}
                style={[styles.input, styles.disabledInput]}
                value={editedData.name}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, name: text })
                }
              />
            </View>
            <View style={styles.modalTextWrapper}>
              <Text>성별</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={editedData.profile?.gender === 'MALE' ? '남성' : '여성'}
                editable={false}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, name: text })
                }
              />
            </View>
            <View style={styles.modalTextWrapper}>
              <Text>나이</Text>
              <TextInput
                style={styles.input}
                value={
                  editedData.profile?.age ? String(editedData.profile.age) : ''
                }
                keyboardType="number-pad"
                onChangeText={(text) =>
                  setEditedData({
                    ...editedData,
                    profile: { ...editedData.profile, age: parseInt(text, 10) },
                  })
                }
              />
            </View>
            <View style={styles.modalTextWrapper}>
              <Text>키</Text>
              <TextInput
                style={styles.input}
                value={
                  editedData.profile?.height
                    ? String(editedData.profile.height)
                    : ''
                }
                keyboardType="number-pad"
                onChangeText={(text) =>
                  setEditedData({
                    ...editedData,
                    profile: {
                      ...editedData.profile,
                      height: parseInt(text, 10),
                    },
                  })
                }
              />
            </View>
            <View style={styles.modalTextWrapper}>
              <Text>체중</Text>
              <TextInput
                style={styles.input}
                value={
                  editedData.profile?.weight
                    ? String(editedData.profile.weight)
                    : ''
                }
                keyboardType="number-pad"
                onChangeText={(text) =>
                  setEditedData({
                    ...editedData,
                    profile: {
                      ...editedData.profile,
                      weight: parseInt(text, 10),
                    },
                  })
                }
              />
            </View>
            <View style={styles.modalTextWrapper}>
              <Text>사용자 목표</Text>
              <View style={styles.toggleButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    editedData.profile?.goal === 'DIET' &&
                      styles.selectedButton,
                  ]}
                  onPress={() =>
                    setEditedData({
                      ...editedData,
                      profile: { ...editedData.profile, goal: 'DIET' },
                    })
                  }
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      editedData.profile?.goal === 'DIET' &&
                        styles.selectedText,
                    ]}
                  >
                    다이어트
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    editedData.profile?.goal === 'MAINTAIN' &&
                      styles.selectedButton,
                  ]}
                  onPress={() =>
                    setEditedData({
                      ...editedData,
                      profile: { ...editedData.profile, goal: 'MAINTAIN' },
                    })
                  }
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      editedData.profile?.goal === 'MAINTAIN' &&
                        styles.selectedText,
                    ]}
                  >
                    유지어트
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalTextWrapper}>
              <Text>목표 체중</Text>
              <TextInput
                style={styles.input}
                value={
                  editedData.profile?.targetWeight
                    ? String(editedData.profile.targetWeight)
                    : ''
                }
                keyboardType="number-pad"
                onChangeText={(text) =>
                  setEditedData({
                    ...editedData,
                    profile: {
                      ...editedData.profile,
                      targetWeight: parseInt(text, 10),
                    },
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton
                onPress={handleSave}
                title="수정하기"
                buttonStyle={{ width: 100 }}
                containerStyle={{
                  width: 'auto',
                  paddingHorizontal: 0,
                  marginBottom: 0,
                }}
              />
              <Button title="취소" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
    margin: 10,
  },
  contentTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  contentData: {
    flex: 1,
    paddingLeft: 50,
  },

  // modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    width: '50%',
    borderBottomWidth: 1,
    padding: 10,
  },
  disabledInput: {
    backgroundColor: '#F0F0F0',
    color: '#A9A9A9',
  },

  // 토글
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  selectedButton: {
    backgroundColor: globalStyles.mainColor,
  },
  toggleButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'white',
  },

  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
});

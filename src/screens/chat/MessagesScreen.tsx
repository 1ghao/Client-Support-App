/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getRecentChatList} from '../../request/chat';
import {pxToDp} from '../../utils/screen-utils';
import {
  formatTimestamp4,
  formatTimestamp6,
  formatTimestamp7,
  getCurrentTimeMap,
} from '../../utils/time-utils';
import {toastError} from '../../utils/toasts';
import HeaderNav from '../../components/HeaderNav';

interface RecentChat {
  avatar: string;
  content: string;
  content_type: string;
  id: number;
  is_collect: string;
  is_translate: string;
  nickname: string;
  state: string;
  timestamp: number;
  u_timestamp: number;
  unreadnum: number;
}

function handleTime(time: number) {
  const today = Date.now() / 1000;
  const inputTimeMap = getCurrentTimeMap(time);
  const currentTimeMap = getCurrentTimeMap(today);

  if (formatTimestamp6(time) === formatTimestamp6(today)) {
    return formatTimestamp7(time);
  }

  if (
    currentTimeMap.day - 1 === inputTimeMap.day &&
    formatTimestamp4(time) === formatTimestamp4(today)
  ) {
    return '昨天';
  }

  if (currentTimeMap.year === inputTimeMap.year) {
    return `${inputTimeMap.month}月${inputTimeMap.day}日`;
  }

  return `${inputTimeMap.year}年${inputTimeMap.month}月${inputTimeMap.day}日`;
}

const MessagesScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RecentChat[]>([]);
  const [moreData, setMoreData] = useState(true);
  const currentPage = useRef(1);

  async function reqRecentMessages() {
    try {
      setIsLoading(true);
      const res = await getRecentChatList({
        page: currentPage.current,
      });
      if (res.data?.data.length === 0) {
        setMoreData(false);
        return;
      }
      if (currentPage.current === 1) {
        setData(res.data.data);
      } else {
        setData(oldData => [...oldData, ...res.data.data]);
      }
    } catch (error) {
      console.error('Failed to fetch recent messages:', error);
      toastError(String(error));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  function reqNewMessages() {
    currentPage.current = 1;
    setMoreData(true);
    reqRecentMessages();
  }

  useEffect(() => {
    reqRecentMessages();
  }, []);

  const renderItem = useCallback((chat: RecentChat) => {
    return (
      <TouchableOpacity
        onPress={() => [
          navigation.navigate('Chat', {
            uid: chat.id,
          }),
        ]}
        style={{
          height: pxToDp(80),
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          gap: pxToDp(10),
          backgroundColor: '#FFFFFF',
          padding: pxToDp(10),
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: chat.avatar}}
            resizeMode="cover"
            style={{
              width: pxToDp(50),
              height: pxToDp(50),
              borderRadius: pxToDp(5),
            }}
          />
          {chat.state === 'offline' && (
            <View
              style={{
                height: pxToDp(12),
                width: pxToDp(12),
                borderRadius: pxToDp(6),
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                right: -pxToDp(3),
                bottom: -pxToDp(3),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: pxToDp(8),
                  width: pxToDp(8),
                  borderRadius: pxToDp(4),
                  backgroundColor: '#AAAAAA',
                }}
              />
            </View>
          )}
          {chat.unreadnum > 0 && (
            <View
              style={{
                height: pxToDp(16),
                width: pxToDp(16),
                borderRadius: pxToDp(8),
                backgroundColor: '#FD5352',
                position: 'absolute',
                right: -pxToDp(4),
                top: -pxToDp(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: pxToDp(8),
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}>
                {chat.unreadnum}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              gap: pxToDp(20),
            }}>
            <View style={{flex: 1}}>
              <Text>{chat.nickname}</Text>
              <Text numberOfLines={1}>
                {chat.content_type === 'txt' ? chat.content : ''}
              </Text>
            </View>
            <Text>{handleTime(chat.timestamp)}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: -pxToDp(10),
              left: 0,
              right: 0,
              borderBottomWidth: pxToDp(1),
              borderBottomColor: '#F3F3F3',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <>
      <HeaderNav title="最近聊天" background="#F2F2F2" />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => renderItem(item)}
        refreshControl={
          <RefreshControl
            onRefresh={reqNewMessages}
            refreshing={isLoading}
            colors={['#1F41BB']}
          />
        }
        getItemLayout={(_, index) => ({
          length: pxToDp(80),
          offset: pxToDp(80) * index,
          index,
        })}
        ListFooterComponent={
          <>
            {!moreData && (
              <View
                style={{
                  height: pxToDp(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: pxToDp(20),
                    color: '#1F41BB',
                    fontWeight: 'bold',
                  }}>
                  没有更多信息了
                </Text>
                <Text
                  style={{
                    fontSize: pxToDp(20),
                    color: '#1F41BB',
                    fontWeight: 'bold',
                  }}>
                  :(
                </Text>
              </View>
            )}
          </>
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (isLoading) {
            return;
          }
          if (!moreData) {
            return;
          }
          ++currentPage.current;
          reqRecentMessages();
        }}
        initialNumToRender={data.length}
      />
    </>
  );
};

export default MessagesScreen;

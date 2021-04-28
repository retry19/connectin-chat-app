/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import { useSubscription } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { List, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import { ChatItem } from '../../components';
import { query } from '../../constants';

const useStyles = makeStyles(() => ({
  zeroPadding: {
    padding: 0
  }
}));

function SkeletonLoading() {
  return (
    <>
      {Array.from(Array(5), (e, i) => (
        <div key={i} style={{ padding: '10px 16px', display: 'flex' }}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} style={{ marginTop: '6px' }} />
          <div style={{ padding: '0 16px' }}>
            <Skeleton animation="wave" variant="text" width={250} />
            <Skeleton animation="wave" variant="text" width={150} />
          </div>
        </div>
      ))}
    </>
  );
}

function ChatPublicRoom() {
  const { data, loading } = useSubscription(query.GET_PUBLIC_MESSAGE);
  const defaultUser = {
    isGroup: true,
    name: 'PUBLIC ROOM',
    picture: '/',
    status: 'Silahkan berghibah'
  };

  if (loading) {
    return (
      <div style={{ padding: '10px 16px', display: 'flex' }}>
        <Skeleton animation="wave" variant="circle" width={40} height={40} style={{ marginTop: '6px' }} />
        <div style={{ padding: '0 16px' }}>
          <Skeleton animation="wave" variant="text" width={250} />
          <Skeleton animation="wave" variant="text" width={150} />
        </div>
      </div>
    );
  }

  return (
    <ChatItem
      title="Ruang Publik"
      sender={data.messages[0].from_user.name}
      user={defaultUser}
      description={data.messages[0].message}
      time={moment(data.messages[0].created_at).format('LT')}
    />
  );
}

function ChatList() {
  const classes = useStyles();
  const { user } = useAuth0();
  const params = { my_user_id: user.sub };
  const { data, loading } = useSubscription(query.GET_MESSAGE_GROUP, { variables: params });
  const usersIdChatMe = [[]];
  const chats = [];

  const checkUsersChatMe = (fromUserId, toUserId) => {
    let isFoundUser = false;
    for (let index = 0; index < usersIdChatMe.length; ++index) {
      const usersId = usersIdChatMe[index];
      isFoundUser = usersId.includes(fromUserId) && usersId.includes(toUserId);
      if (isFoundUser) {
        break;
      }
    }

    if (!isFoundUser) {
      usersIdChatMe.push([fromUserId, toUserId]);
      return true;
    }

    return false;
  };

  if (!loading && data) {
    const messages = data?.messages;
    for (let index = 0; index < messages.length; ++index) {
      const message = messages[index];

      const isUserNotFound = checkUsersChatMe(message.from_user.id, message.to_user.id);
      if (isUserNotFound) {
        const time = moment(message.created_at).format('LT');
        let sender = null;

        if (message.from_user.id === user.sub) {
          sender = message.to_user;
        } else {
          sender = message.from_user;
        }

        chats.push({
          id: message.id,
          sender,
          description: message.message,
          time
        });
      }
    }
  }

  return (
    <List className={classes.zeroPadding}>
      {loading ? <SkeletonLoading /> : <ChatPublicRoom />}
      {chats?.map((chat) => (
        <ChatItem
          key={chat.id}
          sender={chat.sender.name}
          user={chat.sender}
          description={chat.description}
          photo={chat.sender.picture}
          time={chat.time}
          isDirectMessage
        />
      ))}
    </List>
  );
}

export default ChatList;

import ChatList from '../components/ChatList';
import Navbar from '../components/Navbar';
import SearchBox from '../components/SearchBox';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <Navbar />

      <SearchBox />

      <ChatList />
    </div>
  );
}

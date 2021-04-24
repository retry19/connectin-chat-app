import ChatList from '../components/ChatList';
import Navbar from '../components/Navbar';
import SearchBox from '../components/SearchBox';

export default function Home() {
  return (
    <div>
      <Navbar />

      <SearchBox />

      <ChatList />
    </div>
  );
}

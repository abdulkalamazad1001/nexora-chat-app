// import React, { useState, useEffect, useRef } from "react";
// import { useChat } from "../../context/ChatContext";
// import { useAuth } from "../../context/AuthContext";
// import { useTheme } from "../../context/ThemeContext";
// import {
//   FiSearch,
//   FiLogOut,
//   FiMoon,
//   FiSun,
//   FiSettings,
//   FiUserPlus,
// } from "react-icons/fi";
// import UserProfile from "../Profile/UserProfile";
// import FriendRequests from "../Friends/FriendRequests";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../../config/firebase";

// const ChatList = () => {
//   const { users, selectedUser, setSelectedUser, sendFriendRequest } = useChat();
//   const { currentUser, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [showProfile, setShowProfile] = useState(false);
//   const [showRequests, setShowRequests] = useState(false);
//   const [showAllUsers, setShowAllUsers] = useState(false);
//   const [friends, setFriends] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (!currentUser) return;

//     const unsubscribe = onSnapshot(
//       doc(db, "users", currentUser.uid),
//       (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           const data = docSnapshot.data();
//           setFriends(data.friends || []);
//           setPendingRequests(data.pendingRequests || []);
//           setSentRequests(data.sentRequests || []);
//         }
//       }
//     );

//     return unsubscribe;
//   }, [currentUser]);

//   const getFriends = () => {
//     const friendsList = users.filter((user) => friends.includes(user.uid));
//     if (!searchTerm) return friendsList;
//     return friendsList.filter((user) =>
//       user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const getNonFriends = () => {
//     return users.filter(
//       (user) =>
//         !friends.includes(user.uid) &&
//         !pendingRequests.includes(user.uid) &&
//         !sentRequests.includes(user.uid)
//     );
//   };

//   const hasSentRequest = (userId) => sentRequests.includes(userId);

//   return (
//     <div className="w-72 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col">
//       {/* Header */}
//       <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
//         <h2 className="text-xl font-bold neon-text">NeonChat</h2>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowAllUsers(!showAllUsers)}
//             className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
//             title="Add Friend"
//           >
//             <FiUserPlus size={18} />
//           </button>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
//             title="Toggle Theme"
//           >
//             {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="p-3">
//         <div className="relative">
//           <FiSearch
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)]"
//             size={16}
//           />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search friends..."
//             className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-cyan)] focus:neon-glow transition-all"
//           />
//         </div>
//       </div>

//       {/* Friends List or Add Friends */}
//       <div className="flex-1 overflow-y-auto">
//         {!showAllUsers ? (
//           <>
//             {/* Pending Requests Button */}
//             {pendingRequests.length > 0 && (
//               <button
//                 onClick={() => setShowRequests(true)}
//                 className="w-full px-3 py-3 mb-1 flex items-center gap-3 text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all border-b border-[var(--border-color)]"
//               >
//                 <div className="relative">
//                   <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center">
//                     <FiUserPlus size={18} />
//                   </div>
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
//                     {pendingRequests.length}
//                   </span>
//                 </div>
//                 <div className="flex-1 text-left">
//                   <p className="font-semibold text-sm">Friend Requests</p>
//                   <p className="text-xs text-[var(--text-secondary)]">
//                     {pendingRequests.length} pending
//                   </p>
//                 </div>
//               </button>
//             )}

//             {getFriends().length === 0 ? (
//               <div className="p-6 text-center">
//                 <div className="w-20 h-20 rounded-full gradient-btn mx-auto mb-4 flex items-center justify-center">
//                   <FiUserPlus size={32} />
//                 </div>
//                 <p className="text-[var(--text-secondary)] text-sm mb-3">
//                   No friends yet
//                 </p>
//                 <button
//                   onClick={() => setShowAllUsers(true)}
//                   className="gradient-btn btn-3d text-white px-4 py-2 rounded-lg text-sm font-semibold"
//                 >
//                   Add Friends
//                 </button>
//               </div>
//             ) : (
//               getFriends().map((user) => (
//                 <button
//                   key={user.uid}
//                   onClick={() => setSelectedUser(user)}
//                   className={`w-full px-3 py-3 flex items-center gap-3 transition-all ${
//                     selectedUser?.uid === user.uid
//                       ? "bg-[var(--hover-bg)] border-l-4 border-l-[var(--accent-cyan)]"
//                       : "hover:bg-[var(--hover-bg)]"
//                   }`}
//                 >
//                   <div className="relative">
//                     {user.photoURL ? (
//                       <img
//                         src={user.photoURL}
//                         alt={user.displayName}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center text-white font-semibold">
//                         {user.displayName?.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                     {user.isOnline && (
//                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[var(--bg-secondary)] rounded-full"></div>
//                     )}
//                   </div>
//                   <div className="flex-1 text-left min-w-0">
//                     <p className="font-semibold text-[var(--text-primary)] truncate">
//                       {user.displayName}
//                     </p>
//                     <p className="text-xs text-[var(--text-secondary)] truncate">
//                       {user.bio || "Online"}
//                     </p>
//                   </div>
//                 </button>
//               ))
//             )}
//           </>
//         ) : (
//           <div className="p-3">
//             <button
//               onClick={() => setShowAllUsers(false)}
//               className="text-[var(--accent-cyan)] hover:underline text-sm mb-3 font-semibold"
//             >
//               ← Back to Friends
//             </button>
//             {getNonFriends().length === 0 ? (
//               <p className="text-center text-[var(--text-secondary)] text-sm py-6">
//                 No users to add
//               </p>
//             ) : (
//               getNonFriends().map((user) => (
//                 <div
//                   key={user.uid}
//                   className="flex items-center gap-3 p-3 mb-2 glass-effect rounded-xl card-hover"
//                 >
//                   {user.photoURL ? (
//                     <img
//                       src={user.photoURL}
//                       alt={user.displayName}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center text-white font-semibold text-sm">
//                       {user.displayName?.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
//                       {user.displayName}
//                     </p>
//                     <p className="text-xs text-[var(--text-secondary)] truncate">
//                       {user.bio}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => sendFriendRequest(user.uid)}
//                     disabled={hasSentRequest(user.uid)}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
//                       hasSentRequest(user.uid)
//                         ? "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed"
//                         : "gradient-btn btn-3d text-white"
//                     }`}
//                   >
//                     {hasSentRequest(user.uid) ? "Pending" : "Add"}
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {/* Bottom User Panel */}
//       <div className="h-16 px-3 flex items-center gap-2 bg-[var(--bg-tertiary)] border-t border-[var(--border-color)]">
//         <button
//           onClick={() => setShowProfile(true)}
//           className="flex items-center gap-2 flex-1 min-w-0 hover:bg-[var(--hover-bg)] p-2 rounded-lg transition-all"
//         >
//           {currentUser?.photoURL ? (
//             <img
//               src={currentUser.photoURL}
//               alt="Profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center text-white font-semibold">
//               {currentUser?.displayName?.charAt(0).toUpperCase()}
//             </div>
//           )}
//           <div className="flex-1 min-w-0 text-left">
//             <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
//               {currentUser?.displayName}
//             </p>
//             <p className="text-xs text-green-400">● Online</p>
//           </div>
//         </button>

//         <button
//           onClick={() => setShowProfile(true)}
//           className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
//           title="Settings"
//         >
//           <FiSettings size={18} />
//         </button>

//         <button
//           onClick={() => {
//             if (window.confirm("Are you sure you want to logout?")) {
//               logout();
//             }
//           }}
//           className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all btn-3d"
//           title="Logout"
//         >
//           <FiLogOut size={18} />
//         </button>
//       </div>

//       {/* Modals */}
//       {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
//       {showRequests && (
//         <FriendRequests onClose={() => setShowRequests(false)} />
//       )}
//     </div>
//   );
// };

// export default ChatList;

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { useTheme } from "../../context/ThemeContext";
import {
  FiLogOut,
  FiUser,
  FiUserPlus,
  FiUsers,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import UserProfile from "../Profile/UserProfile";
import FriendRequests from "../Friends/FriendRequests";
import AddFriends from "../Features/AddFriends";

const ChatList = () => {
  const { currentUser, logout } = useAuth();
  const { users, setSelectedUser, selectedUser } = useChat();
  const { theme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 glass-effect rounded-xl text-[var(--accent-cyan)] hover:scale-110 transition-all shadow-lg"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-40 ${
          isCollapsed ? "w-20" : "w-80 sm:w-96 md:w-80 lg:w-96"
        } h-screen bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col transition-all duration-300`}
      >
        {/* Collapse/Expand Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-8 z-50 p-2 glass-effect rounded-full text-[var(--accent-cyan)] hover:scale-110 transition-all shadow-lg"
        >
          {isCollapsed ? (
            <FiChevronRight size={18} />
          ) : (
            <FiChevronLeft size={18} />
          )}
        </button>

        {/* Header */}
        <div className="glass-effect border-b border-[var(--border-color)] p-4 sm:p-6">
          {!isCollapsed ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-12 h-12 rounded-full object-cover neon-border cursor-pointer"
                      onClick={() => setShowProfile(true)}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center text-white font-bold text-lg neon-border cursor-pointer"
                      onClick={() => setShowProfile(true)}
                    >
                      {currentUser?.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[var(--text-primary)] font-bold text-base sm:text-lg truncate">
                      {currentUser?.displayName}
                    </h2>
                    <p className="text-[var(--text-tertiary)] text-xs truncate">
                      {currentUser?.bio || "Hey there! I'm using Nexora"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="md:hidden p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all card-hover"
                  title="Profile"
                >
                  <FiUser className="text-[var(--accent-cyan)] text-lg" />
                  <span className="text-[var(--text-tertiary)] text-[10px]">
                    Profile
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowAddFriends(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all card-hover"
                  title="Add Friends"
                >
                  <FiUserPlus className="text-[var(--accent-cyan)] text-lg" />
                  <span className="text-[var(--text-tertiary)] text-[10px]">
                    Add
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowFriendRequests(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all card-hover"
                  title="Friend Requests"
                >
                  <FiUsers className="text-[var(--accent-cyan)] text-lg" />
                  <span className="text-[var(--text-tertiary)] text-[10px]">
                    Requests
                  </span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex flex-col items-center gap-1 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all card-hover"
                  title="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <FiSun className="text-[var(--accent-cyan)] text-lg" />
                  ) : (
                    <FiMoon className="text-[var(--accent-cyan)] text-lg" />
                  )}
                  <span className="text-[var(--text-tertiary)] text-[10px]">
                    {theme === "dark" ? "Light" : "Dark"}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-12 h-12 rounded-full object-cover neon-border cursor-pointer"
                  onClick={() => setShowProfile(true)}
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center text-white font-bold text-lg neon-border cursor-pointer"
                  onClick={() => setShowProfile(true)}
                >
                  {currentUser?.displayName?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowProfile(true)}
                  className="p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all"
                  title="Profile"
                >
                  <FiUser className="text-[var(--accent-cyan)] text-lg" />
                </button>

                <button
                  onClick={() => setShowAddFriends(true)}
                  className="p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all"
                  title="Add Friends"
                >
                  <FiUserPlus className="text-[var(--accent-cyan)] text-lg" />
                </button>

                <button
                  onClick={() => setShowFriendRequests(true)}
                  className="p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all"
                  title="Friend Requests"
                >
                  <FiUsers className="text-[var(--accent-cyan)] text-lg" />
                </button>

                <button
                  onClick={toggleTheme}
                  className="p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all"
                  title="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <FiSun className="text-[var(--accent-cyan)] text-lg" />
                  ) : (
                    <FiMoon className="text-[var(--accent-cyan)] text-lg" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4">
            {!isCollapsed && (
              <h3 className="text-[var(--text-secondary)] text-xs font-semibold mb-3 px-2">
                FRIENDS — {users.length}
              </h3>
            )}

            {users.length === 0 ? (
              !isCollapsed && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                    <FiUsers className="text-[var(--text-tertiary)] text-2xl" />
                  </div>
                  <p className="text-[var(--text-tertiary)] text-sm mb-4">
                    No friends yet
                  </p>
                  <button
                    onClick={() => setShowAddFriends(true)}
                    className="gradient-btn btn-3d text-white px-6 py-2 rounded-lg text-sm font-semibold"
                  >
                    Add Friends
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.uid}
                    onClick={() => {
                      setSelectedUser(user);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center ${
                      isCollapsed ? "justify-center" : "gap-3"
                    } p-3 rounded-xl cursor-pointer transition-all card-hover ${
                      selectedUser?.uid === user.uid
                        ? "bg-[var(--accent-cyan)]/10 border-2 border-[var(--accent-cyan)]"
                        : "glass-effect hover:bg-[var(--hover-bg)]"
                    }`}
                    title={isCollapsed ? user.displayName : ""}
                  >
                    <div className="relative flex-shrink-0">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center text-white font-bold">
                          {user.displayName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
                      )}
                    </div>

                    {!isCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[var(--text-primary)] font-semibold text-sm truncate">
                            {user.displayName}
                          </h4>
                          <p className="text-[var(--text-tertiary)] text-xs truncate">
                            {user.isOnline ? "Online" : "Offline"}
                          </p>
                        </div>

                        {selectedUser?.uid === user.uid && (
                          <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="glass-effect border-t border-[var(--border-color)] p-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "justify-center gap-2"
            } bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3 rounded-xl transition-all hover:scale-105`}
            title="Logout"
          >
            <FiLogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        ></div>
      )}

      {/* Modals */}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      {showFriendRequests && (
        <FriendRequests onClose={() => setShowFriendRequests(false)} />
      )}
      {showAddFriends && (
        <AddFriends onClose={() => setShowAddFriends(false)} />
      )}
    </>
  );
};

export default ChatList;

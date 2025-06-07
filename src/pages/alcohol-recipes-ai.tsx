// Enhanced CommunityFeed with interactive elements and better UI
const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [likedPosts, setLikedPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentingOn, setCommentingOn] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "MixMasterPro",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      recipe: "Spicy Mango Margarita",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuZ28lMjBtYXJnaGFyaXRhfGVufDB8fDB8fHww",
      likes: 42,
      comments: [
        { id: 1, user: "DrinkEnthusiast", text: "This looks amazing! What type of tequila did you use?", time: "1 hour ago" },
        { id: 2, user: "HomeBartender", text: "Tried this last night - huge hit with my friends!", time: "45 mins ago" }
      ],
      time: "2 hours ago",
      saved: false
    },
    {
      id: 2,
      user: "CocktailQueen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      recipe: "Elderflower Gin Fizz",
      image: "https://images.unsplash.com/photo-1551533717-685bc1e9fafc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2luJTIwZml6enxlbnwwfHwwfHx8MA%3D%3D",
      likes: 28,
      comments: [
        { id: 1, user: "GinLover", text: "Elderflower makes everything better!", time: "30 mins ago" }
      ],
      time: "4 hours ago",
      saved: false
    },
    {
      id: 3,
      user: "BartenderBen",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      recipe: "Smoked Old Fashioned",
      image: "https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xkJTIwZmFzaGlvbmVkfGVufDB8fDB8fHww",
      likes: 56,
      comments: [],
      time: "6 hours ago",
      saved: false
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: likedPosts.includes(postId) ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
    
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              user: "You",
              text: newComment,
              time: "Just now"
            }
          ]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setNewComment('');
    setCommentingOn(null);
  };

  const filteredPosts = activeTab === 'trending' 
    ? [...posts].sort((a, b) => b.likes - a.likes) 
    : activeTab === 'recent' 
      ? [...posts].sort((a, b) => new Date(b.time) - new Date(a.time))
      : posts.filter(post => post.saved);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-wasfah-deep-teal" />
        <h3 className="text-2xl font-bold text-wasfah-deep-teal">Community Feed</h3>
      </div>
      <p className="text-gray-600 mb-6">See what others are mixing and share your creations</p>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'trending' ? 'bg-white text-wasfah-deep-teal shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'recent' ? 'bg-white text-wasfah-deep-teal shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Recent
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'saved' ? 'bg-white text-wasfah-deep-teal shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Saved
          </button>
        </div>
        
        <button className="bg-wasfah-deep-teal text-white py-2 px-4 rounded-lg text-sm hover:bg-wasfah-dark-teal transition-colors flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
          Share Your Creation
        </button>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-4 flex items-center gap-3">
                <img 
                  src={post.avatar} 
                  alt={post.user} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-wasfah-deep-teal"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100/CCCCCC/666666?text=U"; }}
                />
                <div>
                  <p className="font-medium">{post.user}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <button 
                  onClick={() => handleSave(post.id)}
                  className="ml-auto"
                  aria-label={post.saved ? "Unsave post" : "Save post"}
                >
                  <Heart className={`w-5 h-5 ${post.saved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <div className="px-4 pb-2">
                <h4 className="text-lg font-bold text-wasfah-dark-teal">{post.recipe}</h4>
              </div>
              
              <div className="relative h-64 bg-gray-100">
                <img
                  src={post.image}
                  alt={post.recipe}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/666666?text=No+Image"; }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1"
                    aria-label="Like post"
                  >
                    <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)}
                    className="flex items-center gap-1"
                    aria-label="Comment on post"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={commentingOn === post.id ? "#2F8B84" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span className="text-sm">{post.comments.length}</span>
                  </button>
                  <button className="flex items-center gap-1 ml-auto text-gray-400 hover:text-wasfah-deep-teal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                
                {commentingOn === post.id && (
                  <div className="mt-4">
                    <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
                      {post.comments.length > 0 ? (
                        post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-2">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                                {comment.user.charAt(0)}
                              </div>
                            </div>
                            <div className="bg-gray-100 px-3 py-2 rounded-lg flex-1">
                              <p className="font-medium text-sm">{comment.user}</p>
                              <p className="text-sm">{comment.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{comment.time}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-4">No comments yet</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-wasfah-deep-teal"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment.trim()}
                        className="bg-wasfah-deep-teal text-white px-3 rounded-lg disabled:opacity-50"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            {activeTab === 'saved' ? 'No saved posts yet' : 'No posts to show'}
          </h4>
          <p className="text-gray-500 mb-4">
            {activeTab === 'saved' 
              ? 'Save posts you love to find them here later' 
              : 'Be the first to share your creation!'}
          </p>
          {activeTab !== 'saved' && (
            <button className="bg-wasfah-deep-teal text-white py-2 px-4 rounded-lg text-sm hover:bg-wasfah-dark-teal transition-colors">
              Create Your First Post
            </button>
          )}
        </div>
      )}
    </div>
  );
};

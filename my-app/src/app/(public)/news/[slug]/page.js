"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function PublicNewsDetailPage() {
  const params = useParams();
  
  // DUMMY FULL CONTENT DB ROW SCHEMA 
  const [article, setArticle] = useState({
    id: "NEWS-7721",
    slug: params.slug,
    title: "New Safety Equipment Compliance Protocols Issued for Singrauli Site",
    category: "Compliance",
    author: "G K Jaiswal",
    role: "Super Admin",
    publishedDate: "2026-06-08",
    updatedDate: "2026-06-09",
    showPreviousVersion: true, // Controlled by Admin
    currentVersion: 2,
    
    // Multi-version history engine tracking logs
    history: {
      v1: {
        date: "2026-06-08",
        blocks: [
          { type: "text", content: "Initial release: Grade-A boots mandatory for zones.", style: { fontFamily: "sans-serif", color: "#334155", fontSize: "14px" } }
        ]
      }
    },

    // Rich Dynamic Editorial Content Blocks (Images can live inside content anywhere)
    contentBlocks: [
      {
        type: "text",
        content: "Following the exhaustive evaluation audit completed last week at our primary mining node sector in Singrauli, Madhya Pradesh, the central compliance council has ratified key operational protective amendments.",
        style: { fontFamily: "serif", color: "#1e293b", fontSize: "16px", fontWeight: "normal" }
      },
      {
        type: "imageRow",
        images: [
          { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600", caption: "Mandatory Grade-A Industrial Boots Stock Grid" },
          { src: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600", caption: "High Voltage Class-3 Insulated Rubber Gloves Deployment" }
        ],
        layout: "grid-cols-2" // Dynamic Shape/Columns
      },
      {
        type: "text",
        content: "CRITICAL ALERT DIRECTIVE: All active field sub-contractors failing to provision these certified items by the upcoming payroll batch execution deadline will face terminal dispatch clearance lockdowns.",
        style: { fontFamily: "sans-serif", color: "#be123c", fontSize: "14px", fontWeight: "bold" } // Custom position/color alert shape text
      }
    ],
    likes: 142
  });

  // COMMENTS COMPLEX HIERARCHY TREE STATE
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Ramesh Singh (NCL Vendor)",
      date: "2 hours ago",
      text: "Will there be any official subsidy allocation from the main depot for procurement of Class-3 gloves?",
      replies: [
        { id: 11, user: "Admin Support Desk", date: "1 hour ago", text: "Yes Ramesh, check vendor guidelines paragraph 4 for credit waivers." }
      ]
    },
    { id: 2, user: "Suresh Mehra", date: "5 hours ago", text: "Compliance rules are strict but highly required for deep mining layouts.", replies: [] }
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [viewingOldVersion, setViewingOldVersion] = useState(false);

  // Interaction handlers
  const handleLike = () => {
    if (hasLiked) {
      setArticle(p => ({ ...p, likes: p.likes - 1 }));
    } else {
      setArticle(p => ({ ...p, likes: p.likes + 1 }));
    }
    setHasLiked(!hasLiked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const freshComment = {
      id: Date.now(),
      user: "Current Registered Partner Node",
      date: "Just now",
      text: newCommentText,
      replies: []
    };
    setComments([freshComment, ...comments]);
    setNewCommentText("");
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;
    setComments(prev => prev.map(comm => {
      if (comm.id === commentId) {
        return {
          ...comm,
          replies: [...comm.replies, { id: Date.now(), user: "Current Partner Node", date: "Just now", text: replyText }]
        };
      }
      return comm;
    }));
    setReplyText("");
    setActiveReplyBox(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* TOP LEVEL NAVIGATION METADATA CRUMB */}
        <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">
            📂 <span className="font-bold text-slate-900">Newsroom</span> ➔ {article.category} ➔ <span className="font-mono text-[11px]">{article.slug}</span>
          </div>
          
          {/* VERSION HISTORY LAYER SWITCHER FOR TRANSPARENCY CONTROLS */}
          {article.showPreviousVersion && (
            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border">
              <button 
                onClick={() => setViewingOldVersion(false)}
                className={`px-2.5 py-1 text-[10px] font-black uppercase rounded ${!viewingOldVersion ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Current Version (v{article.currentVersion})
              </button>
              <button 
                onClick={() => setViewingOldVersion(true)}
                className={`px-2.5 py-1 text-[10px] font-black uppercase rounded ${viewingOldVersion ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Audited Old Version (v1)
              </button>
            </div>
          )}
        </div>

        {/* --- MAIN EDITORIAL BULLETINS CONTAINER --- */}
        <article className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          
          {/* Article Header block meta data */}
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <span className="text-[10px] font-black tracking-widest text-blue-900 uppercase bg-blue-50 px-3 py-1 rounded-md">
              {article.category} Node Broadcast
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {article.title} {viewingOldVersion && <span className="text-rose-600">[ARCHIVED LOG VERSION v1]</span>}
            </h1>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-slate-900 text-white font-black text-[10px] flex items-center justify-center rounded-lg">ED</div>
                <div>
                  <p className="font-black text-slate-800">{article.author}</p>
                  <p className="text-[10px] tracking-wider uppercase text-slate-400">{article.role}</p>
                </div>
              </div>
              <p className="text-right">
                Published: <span className="font-bold text-slate-600">{article.publishedDate}</span> <br/>
                Last Sync Mod: <span className="font-semibold">{article.updatedDate}</span>
              </p>
            </div>
          </div>

          {/* DYNAMIC BLOCKS PARSER LOGIC ENGINE */}
          <div className="space-y-6">
            {viewingOldVersion ? (
              // Rendering older logs if target active
              <div className="space-y-4">
                {article.history.v1.blocks.map((block, i) => (
                  <p key={i} style={block.style}>{block.content}</p>
                ))}
              </div>
            ) : (
              // Rendering current standard block arrays data matrix
              article.contentBlocks.map((block, index) => {
                if (block.type === "text") {
                  return (
                    <p key={index} style={block.style} className="leading-relaxed whitespace-pre-line">
                      {block.content}
                    </p>
                  );
                }
                if (block.type === "imageRow") {
                  return (
                    <div key={index} className={`grid gap-4 my-6 ${block.layout}`}>
                      {block.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="space-y-1.5">
                          <img src={img.src} alt={img.caption} className="rounded-xl object-cover w-full h-48 border border-slate-200 shadow-sm" />
                          <p className="text-[10px] font-medium text-slate-400 text-center italic">{img.caption}</p>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>

          {/* UTILITIES LINE BAR: ENGAGEMENTS COUNTERS */}
          <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${
                hasLiked ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border"
              }`}
            >
              <span>{hasLiked ? "❤️ Liked" : "🤍 Like Bulletin"}</span>
              <span className="bg-slate-900 text-white rounded px-1.5 py-0.5 text-[10px] font-mono">{article.likes}</span>
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{comments.length} Registered Opinions</span>
          </div>

        </article>

        {/* --- LIVE B2B FEEDBACK OPINIONS HUB (COMMENTS LOGICS) --- */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2">Public Comment Boards</h2>

          {/* Root Level Submission Box */}
          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              rows="3"
              required
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Submit an encrypted statement, feedback inquiry or structural adjustment parameter review..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 font-medium bg-slate-50/50"
            />
            <button type="submit" className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-slate-800">
              Post Opinion Block
            </button>
          </form>

          {/* TIERED TABS RENDER SYSTEM LIST */}
          <div className="space-y-4 divide-y divide-slate-100">
            {comments.map((comm) => (
              <div key={comm.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span className="text-slate-900 font-black">{comm.user}</span>
                  <span>{comm.date}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{comm.text}</p>
                
                {/* Actions and nested loop triggers */}
                <div className="flex items-center space-x-4 pl-1">
                  <button 
                    onClick={() => setActiveReplyBox(activeReplyBox === comm.id ? null : comm.id)}
                    className="text-[10px] font-black uppercase text-blue-900 tracking-wider hover:underline"
                  >
                    ↳ Reply to Thread
                  </button>
                </div>

                {/* NESTED LAYER REPLIES GRAPH */}
                {comm.replies.length > 0 && (
                  <div className="pl-6 border-l-2 border-slate-200 space-y-3 pt-2">
                    {comm.replies.map((rep) => (
                      <div key={rep.id} className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                          <span className="text-slate-800 font-black">{rep.user}</span>
                          <span>{rep.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">{rep.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline active comment reply text area toggle box */}
                {activeReplyBox === comm.id && (
                  <div className="pl-6 pt-2 flex gap-2">
                    <input 
                      type="text" required placeholder="Type cascading response details..."
                      value={replyText} onChange={e => setReplyText(e.target.value)}
                      className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none"
                    />
                    <button onClick={() => handleAddReply(comm.id)} className="bg-slate-800 text-white font-bold text-[10px] px-3 rounded-lg uppercase">Send</button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
}
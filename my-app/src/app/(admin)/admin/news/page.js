"use client";

import { useState } from "react";

export default function AdminNewsAdvancedManagement() {
  // SIMULATING ENTIRE WORKSPACE STATE REPOSITORIES
  const [newsNodes, setNewsNodes] = useState([
    { id: 1, title: "New Safety Equipment Compliance Protocols Issued for Singrauli Site", category: "Compliance", showPreviousVersion: true }
  ]);

  // LIVE COMMENTS MANAGED LOG BLOCK FOR ADMIN PURGING REMOVAL SYSTEM
  const [allComments, setAllComments] = useState([
    { id: 401, text: "Will there be any official subsidy allocation from depot?", user: "Ramesh Singh", targetNode: "NEWS-7721" },
    { id: 402, text: "Some spam comment links tracking data errors", user: "Unknown Bot Node", targetNode: "NEWS-7721" }
  ]);

  const [activeWorkspaceBlock, setActiveWorkspaceBlock] = useState([
    { type: "text", content: "", style: { fontFamily: "serif", color: "#1e293b", fontSize: "16px", alignment: "left" } }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Compliance");
  const [globalHistoryToggle, setGlobalHistoryToggle] = useState(true);

  // BLOCK MANIPULATION ENGINE: Dynamic Positions & Text Content Layout Setters
  const addTextBlockNode = () => {
    setActiveWorkspaceBlock([...activeWorkspaceBlock, { type: "text", content: "", style: { fontFamily: "sans-serif", color: "#000000", fontSize: "14px", alignment: "left" } }]);
  };

  const addImageBlockNode = () => {
    setActiveWorkspaceBlock([...activeWorkspaceBlock, { type: "imageRow", images: [{ src: "", caption: "" }], layout: "grid-cols-1" }]);
  };

  const updateBlockTextData = (index, value) => {
    setActiveWorkspaceBlock(prev => prev.map((b, i) => i === index ? { ...b, content: value } : b));
  };

  const updateBlockStyleMatrix = (index, property, value) => {
    setActiveWorkspaceBlock(prev => prev.map((b, i) => i === index ? { ...b, style: { ...b.style, [property]: value } } : b));
  };

  // ACTIONS FOR COMMENTS PURGING CONTROL SECURITY LAYER
  const deleteCommentNode = (id) => {
    if (confirm("Execute Terminal Command: Completely wipe out this comment block metadata?")) {
      setAllComments(prev => prev.filter(c => c.id !== id));
      alert("Comment log vanished cleanly from all dynamic layouts.");
    }
  };

  const handlePublishPayload = (e) => {
    e.preventDefault();
    
    // Sluggified Dynamic URL Router conversion regex
    const sluggifiedUrl = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Clear weird parameters character hashes
      .replace(/\s+/g, "-"); // Swapping empty whitespace nodes with clean dashboards lines
    
    const finalizedPayload = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      slug: sluggifiedUrl,
      showPreviousVersion: globalHistoryToggle,
      contentBlocks: activeWorkspaceBlock
    };

    console.log("Composed Master Article Node Database Sheet Payload:", finalizedPayload);
    alert(`Success, Bhai! System compiled path destination route: /news/${sluggifiedUrl}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* LEFT: FULL SUITE STRUCTURAL CMS EDITOR FORM WORKSPACE (7 Columns) */}
      <form onSubmit={handlePublishPayload} className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h1 className="text-base font-black text-slate-900 uppercase tracking-tight">Advanced Matrix Content Composer</h1>
          <p className="text-[11px] text-slate-400 font-medium">Design text spacing position, font colors style attributes, inject multiple custom in-line media logs dynamically.</p>
        </div>

        {/* Root Node Settings */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border">
          <input 
            type="text" required placeholder="Enter Strategic Bulletin Headline..."
            value={newTitle} onChange={e => setNewTitle(e.target.value)}
            className="w-full text-xs font-bold px-3 py-2 rounded-lg border focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="text-xs font-bold px-3 py-2 border rounded-lg bg-white">
              <option value="Compliance">Compliance</option>
              <option value="Logistics">Logistics</option>
              <option value="Corporate">Corporate</option>
            </select>
            <div className="flex items-center justify-between px-2 bg-white border rounded-lg text-xs font-bold text-slate-500">
              <span>Allow Version Auditing:</span>
              <input type="checkbox" checked={globalHistoryToggle} onChange={e => setGlobalHistoryToggle(e.target.checked)} className="h-4 w-4 accent-slate-950 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* CENTRAL BLOCKS LOOP WORKSPACE */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Structural Canvas Pipeline</p>
          {activeWorkspaceBlock.map((block, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                <span>Block Node #{idx + 1} - System Layer {block.type}</span>
              </div>

              {block.type === "text" && (
                <div className="space-y-2">
                  {/* TEXT EDITOR TOOLS BAR SETTINGS INJECTED */}
                  <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg border border-slate-100 shadow-inner">
                    {/* Font Family Setter */}
                    <select value={block.style.fontFamily} onChange={e => updateBlockStyleMatrix(idx, "fontFamily", e.target.value)} className="text-[10px] font-bold border-none outline-none">
                      <option value="sans-serif">Sans Serif (Modern)</option>
                      <option value="serif">Classic Serif (News Style)</option>
                      <option value="mono">Monospace (System Technical Logs)</option>
                    </select>
                    {/* Font color hex picker input */}
                    <input type="color" value={block.style.color} onChange={e => updateBlockStyleMatrix(idx, "color", e.target.value)} className="w-6 h-4 border rounded cursor-pointer mt-0.5" title="Font Family Color Parameter" />
                    {/* Font sizing index */}
                    <select value={block.style.fontSize} onChange={e => updateBlockStyleMatrix(idx, "fontSize", e.target.value)} className="text-[10px] font-bold border-none outline-none">
                      <option value="12px">Small Text</option>
                      <option value="16px">Standard Article Read</option>
                      <option value="20px">Sub-Heading Header</option>
                    </select>
                  </div>
                  <textarea 
                    rows="3" placeholder="Compose dynamic node paragraphs content stream fields..."
                    value={block.content} onChange={e => updateBlockTextData(idx, e.target.value)}
                    style={{ fontFamily: block.style.fontFamily, color: block.style.color, fontSize: block.style.fontSize }}
                    className="w-full border p-2 text-xs rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
              )}

              {block.type === "imageRow" && (
                <div className="bg-white p-3 rounded-lg border space-y-2">
                  <input 
                    type="text" placeholder="Paste Image Source Web HTTP URL Address..." 
                    className="w-full text-[11px] p-2 border rounded focus:outline-none"
                    onChange={e => {
                      const nextImgs = [{ src: e.target.value, caption: "Admin Custom Injected Media Block" }];
                      setActiveWorkspaceBlock(prev => prev.map((b, i) => i === idx ? { ...b, images: nextImgs } : b));
                    }}
                  />
                  <p className="text-[9px] text-slate-400 font-bold">* To stack multi-images configuration shapes grid patterns change layout mapping variables data rows inside system schemas arrays.</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ACTIONS APPEND BLOCKS SECTORS BUTTONS */}
        <div className="flex gap-3 border-t border-dashed pt-4">
          <button type="button" onClick={addTextBlockNode} className="flex-1 text-[10px] font-black bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl uppercase tracking-wider border">＋ Append Text Engine Paragraph</button>
          <button type="button" onClick={addImageBlockNode} className="flex-1 text-[10px] font-black bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl uppercase tracking-wider border">＋ Inject Component Media Box</button>
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-widest shadow-md">
          🚀 Compile and Broadcast Dynamic Endpoint Routes
        </button>
      </form>

      {/* RIGHT: LIVE PUBLIC COMMENTS MODERATION PANEL TRACKER (4 Columns) */}
      <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
        <div>
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2">Comments Security Desk</h2>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Live active global moderation monitors. Delete toxic pipelines, spam bot logs or invalid data parameters on-the-fly.</p>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {allComments.map((comment) => (
            <div key={comment.id} className="p-3 bg-slate-50 border rounded-xl space-y-2 relative group hover:border-rose-200 transition-colors">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span className="text-slate-800 font-black">{comment.user}</span>
                <span className="font-mono text-[9px] bg-slate-200 text-slate-600 px-1 rounded">{comment.targetNode}</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-normal">{comment.text}</p>
              
              <button 
                type="button"
                onClick={() => deleteCommentNode(comment.id)}
                className="w-full mt-2 text-center text-[9px] font-black bg-rose-50 text-rose-600 border border-rose-100 py-1 rounded-md hover:bg-rose-600 hover:text-white transition-all uppercase"
              >
                🗑️ WIPE DATA CELL
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
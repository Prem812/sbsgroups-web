"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// 🔥 CORE FIX: EditorJS instance ko pure client asset component matrix me transform kiya taaki typing freeze na ho
const EditorCanvasNode = dynamic(
  () =>
    import("@editorjs/editorjs").then((mod) => {
      return function EditorComponent({ onInstanceCreated, initialBlocksData }) {
        const holderId = "editorjs_block_container";
        const mountedRef = useRef(false);

        useEffect(() => {
          if (mountedRef.current) return;
          mountedRef.current = true;

          Promise.all([
            import("@editorjs/header"),
            import("@editorjs/list"),
            import("@editorjs/list"),
            import("@editorjs/checklist"),
            import("@editorjs/quote"),
            import("@editorjs/warning"),
            import("@editorjs/table"),
            import("@editorjs/code"),
            import("@editorjs/raw"),
            import("@editorjs/image"),
            import("@editorjs/embed"),
            import("@editorjs/delimiter"),
            import("@editorjs/marker"),
            import("@editorjs/inline-code"),
          ]).then((tools) => {
            const [
              Header, List, NestedList, Checklist, Quote, Warning, Table, Code, Raw, ImageTool, Embed, Delimiter, Marker, InlineCode
            ] = tools.map((t) => t.default || t);

            const instance = new mod.default({
              holder: holderId,
              placeholder: "⚙️ Press 'Tab' or click here to write high-fidelity diagnostic blocks context mapping...",
              autofocus: true,
              inlineToolbar: ["bold", "italic", "link", "marker", "inlineCode"],
              tools: {
                header: { class: Header, inlineToolbar: true, config: { placeholder: "Heading Level", levels: [2, 3, 4], defaultLevel: 2 } },
                list: { class: List, inlineToolbar: true },
                nestedList: { class: NestedList, inlineToolbar: true },
                checklist: { class: Checklist, inlineToolbar: true },
                quote: { class: Quote, inlineToolbar: true },
                warning: { class: Warning, inlineToolbar: true },
                table: { class: Table, inlineToolbar: true },
                code: Code,
                raw: Raw,
                delimiter: Delimiter,
                marker: Marker,
                inlineCode: InlineCode,
                image: {
                  class: ImageTool,
                  config: { endpoints: { byFile: "http://localhost:4000/api/faq/upload-media" } }
                },
                embed: {
                  class: Embed,
                  config: { services: { youtube: true, vimeo: true, twitter: true } }
                }
              },
              data: initialBlocksData || {},
              onReady: () => {
                onInstanceCreated(instance);
              }
            });
          });
        }, []);

        return (
          <div className="bg-white rounded-2xl p-4 min-h-[400px] border border-slate-700/50 shadow-inner text-slate-900 prose max-w-none">
            <div id={holderId} className="min-h-[380px] focus:outline-none cursor-text text-sm" />
          </div>
        );
      };
    }),
  { ssr: false }
);

export default function AdvancedFaqManagerDashboardStudio() {
  const activeEditorInstance = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  
  const [showEditorForm, setShowEditorForm] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [activeTab, setActiveTab] = useState("KNOWLEDGE_BASE");
  
  // Dynamic form schema structure anchors
  const [question, setQuestion] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [initialDataPayload, setInitialDataPayload] = useState({});

  // Mail modal triggers
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [emailReplyText, setEmailReplyText] = useState("");
  const [isSendingMail, setIsSendingMail] = useState(false);

  // Synchronizers
  const fetchFaqsFromDb = useCallback(async () => {
    try {
      // ⚠️ FIX: Endpoint matches NestJS routing matrix -> 'admin-list'
      const res = await fetch("http://localhost:4000/api/faq/admin-list");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error("Pipeline breakdown:", err);
    }
  }, []);

  const fetchInquiriesFromDb = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/api/faq/user-inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Inquiries tracking offline:", err);
    }
  }, []);

  useEffect(() => {
    fetchFaqsFromDb();
    fetchInquiriesFromDb();
  }, [fetchFaqsFromDb, fetchInquiriesFromDb]);

  const openCreateComposer = () => {
    setEditingFaqId(null);
    setQuestion("");
    setIsPinned(false);
    setIsActive(true);
    setInitialDataPayload({});
    activeEditorInstance.current = null;
    setIsReady(false);
    setShowEditorForm(true);
  };

  const openUpdateComposer = (faq) => {
    setEditingFaqId(faq.id);
    setQuestion(faq.question);
    setIsPinned(faq.isPinned);
    setIsActive(faq.isActive);
    setInitialDataPayload(faq.answerJson || {});
    activeEditorInstance.current = null;
    setIsReady(false);
    setShowEditorForm(true);
  };

  const handleSaveFaqBlueprint = async () => {
    if (!activeEditorInstance.current || !question) return alert("Fill core fields node parameters.");
    
    try {
      const blocksData = await activeEditorInstance.current.save();
      const payload = {
        question,
        slug: question.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"),
        answerJson: blocksData,
        isPinned,
        isActive,
        sortOrder: 0
      };

      const routeUrl = editingFaqId 
        ? `http://localhost:4000/api/faq/save?id=${editingFaqId}`
        : "http://localhost:4000/api/faq/save";

      const res = await fetch(routeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ FAQ parameters successfully integrated inside local cluster schemas.");
        setShowEditorForm(false);
        fetchFaqsFromDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleVisibilityState = async (faq) => {
    try {
      const res = await fetch(`http://localhost:4000/api/faq/save?id=${faq.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...faq, isActive: !faq.isActive })
      });
      if (res.ok) fetchFaqsFromDb();
    } catch (err) {
      console.error(err);
    }
  };

  const terminalWipeDeleteFaq = async (id) => {
    if (!confirm("Wipe out database row entity permanently?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/faq/delete/${id}`, { method: "DELETE" });
      if (res.ok) fetchFaqsFromDb();
    } catch (err) {
      console.error(err);
    }
  };

  const dispatchInquiryEmailReply = async (e) => {
    e.preventDefault();
    if (!emailReplyText.trim()) return alert("Write reply parameters stream.");
    setIsSendingMail(true);
    try {
      const res = await fetch("http://localhost:4000/api/faq/reply-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedInquiry.id,
          email: selectedInquiry.email,
          question: selectedInquiry.question,
          replyText: emailReplyText
        })
      });

      if (res.ok) {
        alert("🚀 Structural solution email fired to targeted gateway address routing channels.");
        setSelectedInquiry(null);
        setEmailReplyText("");
        fetchInquiriesFromDb();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingMail(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Control Workspace */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">SBS Operational Knowledge Engine</h1>
            <p className="text-xs text-slate-400">Manage internal block architectures or dispatch secure resolution arrays.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab("KNOWLEDGE_BASE")} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === "KNOWLEDGE_BASE" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400"}`}>📚 FAQs Inventory</button>
            <button onClick={() => setActiveTab("INCOMING_INQUIRIES")} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === "INCOMING_INQUIRIES" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400"}`}>📥 Client Queries ({inquiries.filter(i => !i.isAnswered).length})</button>
          </div>
        </div>

        {activeTab === "KNOWLEDGE_BASE" ? (
          <div className="space-y-6">
            {!showEditorForm && (
              <div className="flex justify-end">
                <button onClick={openCreateComposer} className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-3 rounded-xl uppercase tracking-widest transition-all">📝 Provision New FAQ</button>
              </div>
            )}

            {showEditorForm && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h2 className="text-xs font-black uppercase text-blue-400 tracking-wider">{editingFaqId ? "Modify Target Entity Node" : "Instantiate New FAQ Core"}</h2>
                  <button onClick={() => setShowEditorForm(false)} className="bg-slate-800 text-slate-400 hover:text-white text-xs h-6 w-6 rounded-full flex items-center justify-center font-bold">✕</button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Inquiry Question Target String</label>
                    <input type="text" placeholder="Type query string structure mapping here..." value={question} onChange={e => setQuestion(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500" />
                  </div>

                  <div className="flex gap-4 bg-slate-950 p-3 rounded-xl max-w-xl">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer"><input type="checkbox" checked={isPinned} onChange={e => setIsPinned(e.target.checked)} className="accent-blue-500" /> Pin Highlight Strip</label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer border-l border-slate-800 pl-4"><input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="accent-emerald-500" /> Render Public Deployment</label>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Solution Matrix Context Layout Blocks</label>
                    <EditorCanvasNode initialBlocksData={initialDataPayload} onInstanceCreated={(ins) => { activeEditorInstance.current = ins; setIsReady(true); }} />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button onClick={() => setShowEditorForm(false)} className="bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl uppercase">Cancel</button>
                    <button onClick={handleSaveFaqBlueprint} disabled={!isReady} className="bg-emerald-600 disabled:bg-slate-800 text-white font-black text-xs px-6 py-2.5 rounded-xl uppercase tracking-widest shadow-lg">🚀 Commit Blueprint Module</button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800 pb-3">
                    <th className="pb-3 pl-2">System Question Header Target</th>
                    <th className="pb-3 text-center">Pinned Flag</th>
                    <th className="pb-3 text-center">Visibility Layer</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs font-medium">
                  {faqs.map((faq) => (
                    <tr key={faq.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-4 pl-2 font-bold text-slate-200 max-w-md truncate">❓ {faq.question}</td>
                      <td className="py-4 text-center"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${faq.isPinned ? "bg-amber-950 text-amber-400 border border-amber-900" : "bg-slate-950 text-slate-600"}`}>{faq.isPinned ? "Pinned" : "Standard"}</span></td>
                      <td className="py-4 text-center"><button onClick={() => toggleVisibilityState(faq)} className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border transition-all ${faq.isActive ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" : "bg-rose-950/50 text-rose-400 border-rose-900"}`}>{faq.isActive ? "🟢 Active" : "🔴 Hidden"}</button></td>
                      <td className="py-4 text-right pr-2"><div className="flex justify-end gap-2"><button onClick={() => openUpdateComposer(faq)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-[10px] font-bold uppercase">Edit</button><button onClick={() => terminalWipeDeleteFaq(faq.id)} className="p-1.5 bg-rose-950/20 text-rose-400 border border-rose-900 rounded-lg">🗑️</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white">Client Inquiry Queue Systems</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800 pb-3">
                    <th className="pb-3 pl-2">Sender Framework Metadata</th>
                    <th className="pb-3">Question Raw Stream Payload</th>
                    <th className="pb-3 text-center">Status Index</th>
                    <th className="pb-3 text-right pr-2">Action Engine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-4 pl-2 font-mono text-[11px] text-slate-300">{inq.email}</td>
                      <td className="py-4 max-w-xs truncate font-medium text-slate-400">{inq.question}</td>
                      <td className="py-4 text-center"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${inq.isAnswered ? "bg-emerald-950 text-emerald-400" : "bg-amber-950 text-amber-400"}`}>{inq.isAnswered ? "Resolved" : "Pending"}</span></td>
                      <td className="py-4 text-right pr-2"><button onClick={() => setSelectedInquiry(inq)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-wider rounded-lg">Reply ✉️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <form onSubmit={dispatchInquiryEmailReply} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">SMTP Resolution Terminal</h3>
              <button type="button" onClick={() => setSelectedInquiry(null)} className="bg-slate-800 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs">✕</button>
            </div>
            <p className="text-xs font-medium text-slate-400 italic bg-slate-950 p-3 rounded-xl border border-slate-800">"{selectedInquiry.question}"</p>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Solution Text Message Body</label>
              <textarea rows="5" required placeholder="Write explicit resolution statement text..." value={emailReplyText} onChange={e => setEmailReplyText(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" disabled={isSendingMail} className="w-full bg-blue-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-widest">{isSendingMail ? "Processing mail transporters..." : "Dispatch Email Resolution ➔"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect, useRef } from "react";
import WebBuilderHeader from "./Web-Builder-Header";
import WebBuilderMain from "./Web-Builder-Main";
import Sidebar from "./sidebar/Web-Builder-Sidebar";
import TemplateNavbar from "./TemplateNavbar";
import TemplateNavbarEditor from "./TemplateNavbarEditor";
import Modal from './Modal';
import { createBlock, createId } from './parts/blockFactory';
import AddPageModal from './parts/AddPageModal';
import PageNav from './parts/PageNav';
import PreviewModal from './parts/PreviewModal';
import SaveToast from './parts/SaveToast';

type Page = { id: string; title: string; slug: string; blocks: any[] };

export default function Template1({
  setTempalte,
}: {
  setTempalte: (t: string) => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [navbarSettings, setNavbarSettings] = useState(() => ({
    logoText: 'EventDome',
    logoUrl: '',
    bg: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500',
    buttonColor: '#ffffff',
    buttonTextColor: '#4f46e5',
    showAuth: true,
  }));
  const [isNavbarEditorOpen, setIsNavbarEditorOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [newPageTemplate, setNewPageTemplate] = useState<string>('blank');
  const [newPageTitle, setNewPageTitle] = useState<string>('');
  const [newPageSlug, setNewPageSlug] = useState<string>('');

  const STORAGE_KEY_PAGES = 'template1_pages_v1';
  const STORAGE_KEY_NAVBAR = 'template1_navbar_v1';
  const saveTimerRef = useRef<number | null>(null);
 

  const [pages, setPages] = useState<Page[]>(() => {
    const homeBlock = createBlock('layout') as any;
    return [
      { id: createId('page'), title: 'Home', slug: 'home', blocks: [homeBlock] },
      { id: createId('page'), title: 'About', slug: 'about', blocks: [] },
    ];
  });

  const [currentPageId, setCurrentPageId] = useState<string>(() => pages[0].id);
  const [openEditorForId, setOpenEditorForId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
 
  function addBlock(type: string) {
    const newBlock: any = createBlock(type);
    setPages((prev) => prev.map((p) => (p.id === currentPageId ? { ...p, blocks: [...p.blocks, newBlock] } : p)));
    setSidebarOpen(false);
      // scroll the newly added block into view after it renders
      setTimeout(() => {
        try {
          const el = document.getElementById(`block-${newBlock.id}`);
          if (el && typeof el.scrollIntoView === 'function') {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // briefly highlight the new block so it's easier to spot
            el.classList.add('ring-4', 'ring-indigo-300', 'ring-opacity-40');

            // Create a blinking border effect using the Web Animations API
            try {
              const anim = (el as HTMLElement).animate(
                [
                  { boxShadow: '0 0 0 0 rgba(99,102,241,0.9)' },
                  { boxShadow: '0 0 0 8px rgba(99,102,241,0)' },
                ],
                { duration: 400, iterations: 4 }
              );
              anim.onfinish = () => {
                try {
                  el.classList.remove('ring-4', 'ring-indigo-300', 'ring-opacity-40');
                  (el as HTMLElement).style.boxShadow = '';
                } catch (e) {
                  // ignore
                }
              };
            } catch (e) {
              // Fallback: remove ring after timeout if animation isn't supported
              setTimeout(() => {
                try { el.classList.remove('ring-4', 'ring-indigo-300', 'ring-opacity-40'); } catch (er) { /* ignore */ }
              }, 1600);
            }
          }
        } catch (e) {
          // ignore
        }
      }, 150);
  }

  function updateBlock(id: string, data: any) {
    setPages((ps) => ps.map((p) => (p.id === currentPageId ? { ...p, blocks: p.blocks.map((b) => (b.id === id ? { ...b, data } : b)) } : p)));
  }

  function deleteBlock(id: string) {
    setPages((ps) => ps.map((p) => (p.id === currentPageId ? { ...p, blocks: p.blocks.filter((b) => b.id !== id) } : p)));
  }

  // Block reordering is handled via drag-and-drop (onReorder)

  function reorderBlocksByIds(ids: string[]) {
    setPages((ps) => ps.map((p) => {
      if (p.id !== currentPageId) return p;
      const map = new Map(p.blocks.map((b) => [b.id, b]));
      const newBlocks = ids.map((id) => map.get(id)).filter(Boolean) as any[];
      return { ...p, blocks: newBlocks };
    }));
  }

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];

  // Load persisted pages + navbar settings on first client render
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PAGES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((p: any) => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.slug === 'string' && Array.isArray(p.blocks))) {
          setPages(parsed as Page[]);
          // restore current page if possible
          const found = (parsed as Page[]).find((pp) => pp.id === currentPageId);
          if (found) setCurrentPageId(found.id);
          else if ((parsed as Page[]).length) setCurrentPageId((parsed as Page[])[0].id);
        }
      }

      const rawNav = localStorage.getItem(STORAGE_KEY_NAVBAR);
      if (rawNav) {
        const parsedNav = JSON.parse(rawNav);
        if (parsedNav && typeof parsedNav === 'object') {
          setNavbarSettings((s) => ({ ...s, ...parsedNav }));
        }
      }
    } catch (e) {
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY_PAGES, JSON.stringify(pages));
        localStorage.setItem(STORAGE_KEY_NAVBAR, JSON.stringify(navbarSettings));
      } catch (e) {
        // ignore quota errors
      }
      saveTimerRef.current = null;
    }, 500);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [pages, navbarSettings]);

  function addPage(title = 'New Page') {
    createPage(title, 'blank');
  }

  // Create page with optional template key
  function createPage(title = 'New Page', templateKey: string = 'blank', slugOverride?: string) {
    const id = createId('page');
    const slug = (slugOverride || title).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    // initial blocks based on template
    let initialBlocks: any[] = [];
    try {
      if (templateKey === 'about') initialBlocks = [createBlock('about')];
      else if (templateKey === 'contact') initialBlocks = [createBlock('forms')];
      else if (templateKey === 'gallery') initialBlocks = [createBlock('gallery')];
      else if (templateKey === 'schedule') initialBlocks = [createBlock('schedule')];
      else if (templateKey === 'testimonials') initialBlocks = [createBlock('testimonials')];
      else if (templateKey === 'blank') initialBlocks = [];
    } catch (e) {
      initialBlocks = [];
    }
    setPages((s) => [...s, { id, title, slug, blocks: initialBlocks }]);
    setCurrentPageId(id);
    // return created page id and initial blocks so caller can open editor if needed
    return { id, initialBlocks };
  }

  function renamePage(id: string, title: string) {
    setPages((s) => s.map((p) => (p.id === id ? { ...p, title, slug: title.toLowerCase().replace(/\s+/g, '-') } : p)));
  }

  function removePage(id: string) {
    setPages((s) => {
      if (s.length <= 1) return s; // never remove last page
      const next = s.filter((p) => p.id !== id);
      if (currentPageId === id) setCurrentPageId(next[0].id);
      return next;
    });
  }

  return (
    <div className={`${isDark ? "dark" : ""} `}>
      <WebBuilderHeader
        onToggleSidebar={() => setSidebarOpen(true)}
        onToggleDark={() => setIsDark((s) => !s)}
        isDark={isDark}
        onChangeViewport={(v) => setViewport(v)}
        viewport={viewport}
        setViewport={setViewport}
      />

    
      <PageNav pages={pages} currentPageId={currentPageId} onSelectPage={(id) => setCurrentPageId(id)} onAdd={() => setIsAddPageOpen(true)} />

      <AddPageModal
        open={isAddPageOpen}
        onClose={() => setIsAddPageOpen(false)}
        createPage={(title?: string, templateKey?: string, slugOverride?: string) => createPage(title || 'New Page', templateKey || 'blank', slugOverride)}
        onOpenEditorForId={(id) => setOpenEditorForId(id)}
      />

      <div className="mx-auto mt-6   flex w-full gap-2 px-4 items-stretch">
        <div className="hidden lg:block">
          <Sidebar isVisible={true} onAddBlock={addBlock} />
        </div>

        <main className="flex-1 flex flex-col overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-lg font-semibold">{currentPage.title}</h1>
                <div className="text-sm text-gray-500">/{currentPage.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => renamePage(currentPage.id, prompt('Rename page', currentPage.title) || currentPage.title)} className="rounded px-3 py-1 text-sm bg-white/10">Rename</button>
                <button onClick={() => removePage(currentPage.id)} className="rounded px-3 py-1 text-sm bg-red-600 text-white">Delete</button>
              </div>
            </div>

            <div className="flex-1 rounded-2xl bg-white/80 shadow-lg dark:bg-gray-900/70">
              <TemplateNavbar
                pages={pages}
                currentPageId={currentPageId}
                onSelectPage={(id) => setCurrentPageId(id)}
                onAddPage={(title) => addPage(title)}
                settings={navbarSettings}
                onEdit={() => setIsNavbarEditorOpen(true)}
                viewport={viewport}
                setViewport={setViewport}
              />

              <TemplateNavbarEditor
                open={isNavbarEditorOpen}
                initial={navbarSettings}
                onClose={() => setIsNavbarEditorOpen(false)}
                onSave={(s) => setNavbarSettings(s)}
              />

              <WebBuilderMain
                blocks={currentPage.blocks}
                onUpdateBlock={updateBlock}
                onDeleteBlock={deleteBlock}
                onReorder={reorderBlocksByIds}
                openEditorFor={openEditorForId}
                viewport={viewport}
                onEditorOpened={() => setOpenEditorForId(null)}
              />
            </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-80 max-w-[86%] animate-slide-in bg-transparent p-4">
            <Sidebar isVisible={true} onClose={() => setSidebarOpen(false)} onAddBlock={addBlock} />
          </div>
        </div>
      )}
    </div>
  );
}

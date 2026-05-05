import React, { useState } from 'react';
import AboutBlock from './about-section/AboutBlock';
import ContentBlock from './content-section/ContentBlock';
import CountdownBlock from './countdown-section/CountdownBlock';
import MapBlock from './map-section/MapBlock';
import GalleryBlock from './gallery-section/GalleryBlock';
import HeroBlock from './hero/HeroBlock';
import GalleryGridBlock from './gallery-section/GalleryGridBlock';
import ContactFormBlock from './form-section/ContactFormBlock';
import ScheduleBlock from './schedule-section/ScheduleBlock';
import SessionsBlock from './sessions-section/SessionsBlock';
import SpeakersBlock from './speakers-section/SpeakersBlock';
import Modal from './Modal';
// dnd-kit
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
 
import CountdownEditForm from './countdown-section/CountdownEditForm';
import MapEditForm from './map-section/MapEditForm';
import GalleryEditForm from './gallery-section/GalleryEditForm';
import ContactFormEditForm from './form-section/ContactFormEditForm';
import RsvpBlock from './rsvp-section/RsvpBlock';
import RsvpEditForm from './rsvp-section/RsvpEditForm';
import ScheduleEditForm from './schedule-section/ScheduleEditForm';
import SessionsEditForm from './sessions-section/SessionsEditForm';
import SpeakersEditForm from './speakers-section/SpeakersEditForm';
import MultiDayScheduleBlock from './multi-day-schedule-section/MultiDayScheduleBlock';
import MultiDayScheduleEditForm from './multi-day-schedule-section/MultiDayScheduleEditForm';
import TicketBlock from './ticket-section/TicketBlock';
import TicketEditForm from './ticket-section/TicketEditForm';
import PricingBlock from './pricing-section/PricingBlock';
import PricingEditForm from './pricing-section/PricingEditForm';
import SocialFeedBlock from './social-feed-section/SocialFeedBlock';
import SocialFeedEditForm from './social-feed-section/SocialFeedEditForm';
import TestimonialsBlock from './testimonials-section/TestimonialsBlock';
import TestimonialsEditForm from './testimonials-section/TestimonialsEditForm';
import SponsorShowcaseBlock from './sponsors-section/SponsorShowcaseBlock';
import SponsorShowcaseEditForm from './sponsors-section/SponsorShowcaseEditForm';
import LiveStreamBlock from './live-stream-section/LiveStreamBlock';
import LiveStreamEditForm from './live-stream-section/LiveStreamEditForm';
import NetworkingBlock from './networking-section/NetworkingBlock';
import NetworkingEditForm from './networking-section/NetworkingEditForm';
import FooterBlock from './footer-section/FooterBlock';
import FooterEditForm from './footer-section/FooterEditForm';
import BlockActions from './BlockActions';
import VenueMapBlock from './venue-section/VenueMapBlock';
import VenueMapEditForm from './venue-section/VenueMapEditForm';
import HeroEditForm from './hero/HeroEditForm';
import { EditAboutFormContent } from './about-section/EditAboutModal';
import ContentEditForm from './content-section/ContentEditForm';

export default function WebBuilderMain({
    blocks = [],
    onUpdateBlock,
    onDeleteBlock,
    onReorder,
    openEditorFor,
    onEditorOpened,
    viewport = 'desktop',
}: {
    blocks?: any[];
    onUpdateBlock?: (id: string, data: any) => void;
    onDeleteBlock?: (id: string) => void;
    onReorder?: (ids: string[]) => void;
    openEditorFor?: string | null;
    onEditorOpened?: (id: string) => void;
    viewport?: 'desktop'|'tablet'|'mobile';
}) {
   
    const previewWidthClass = viewport === 'desktop' ? 'max-w-3xl' : viewport === 'tablet' ? 'max-w-xl' : 'max-w-sm';
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    function openEdit(id: string) {
        setEditingId(id);
    }

    function closeEdit() {
        setEditingId(null);
    }

    function openDelete(id: string) {
        setDeletingId(id);
    }

    function closeDelete() {
        setDeletingId(null);
    }

    const editingBlock = blocks.find((b: any) => b.id === editingId);
    const deletingBlock = blocks.find((b: any) => b.id === deletingId);

    // When parent requests to open editor for a block id, set editingId
    React.useEffect(() => {
        if (openEditorFor) {
            setEditingId(openEditorFor);
            // notify parent that we opened it so it can clear the request
            onEditorOpened?.(openEditorFor);
            // scroll to the block after it renders
            setTimeout(() => {
                try {
                    const el = document.getElementById(`block-${openEditorFor}`);
                    if (el && typeof el.scrollIntoView === 'function') {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } catch (e) {
                    // ignore
                }
            }, 120);
        }
    }, [openEditorFor, onEditorOpened]);

    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const ids = blocks.map((b: any) => b.id);
        const oldIndex = ids.indexOf(String(active.id));
        const newIndex = ids.indexOf(String(over.id));
        if (oldIndex === -1 || newIndex === -1) return;
        const newIds = arrayMove(ids, oldIndex, newIndex);
        onReorder?.(newIds);
    }

                // Compute the appropriate editor component for the modal using a switch for clarity
                const editorComponent = editingBlock
                    ? (() => {
                            switch (editingBlock.type) {
                                case 'layout':
                                    return (
                                        <HeroEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'about':
                                    return (
                                        <EditAboutFormContent
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'content':
                                    return (
                                        <ContentEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'countdown':
                                    return (
                                        <CountdownEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'map':
                                    return (
                                        <MapEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'social-feed':
                                    return (
                                        <SocialFeedEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'testimonials':
                                    return (
                                        <TestimonialsEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'sponsors':
                                    return (
                                        <SponsorShowcaseEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d: unknown) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'live-stream':
                                    return (
                                        <LiveStreamEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d: any) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'footer':
                                    return (
                                        <FooterEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'networking':
                                    return (
                                        <NetworkingEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d: any) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'venue':
                                    return (
                                        <VenueMapEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d: any) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'sessions':
                                    return (
                                        <SessionsEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'speakers':
                                    return (
                                        <SpeakersEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'pricing':
                                    return (
                                        <PricingEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'forms':
                                    return (
                                        <ContactFormEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'rsvp':
                                    return (
                                        <RsvpEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'ticket':
                                    return (
                                        <TicketEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'schedule':
                                    return (
                                        <ScheduleEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'multi-day-schedule':
                                    return (
                                        <MultiDayScheduleEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                case 'gallery':
                                case 'gallery-grid':
                                    return (
                                        <GalleryEditForm
                                            initial={editingBlock.data}
                                            onCancel={closeEdit}
                                            onSave={(d) => {
                                                onUpdateBlock?.(editingBlock.id, d);
                                                closeEdit();
                                            }}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })()
                    : null;

    if (!blocks || blocks.length === 0) {
        return (
            <div className={`mx-auto w-full ${previewWidthClass} flex items-center justify-center py-8`}>
                <div className="w-full rounded-xl bg-linear-to-br from-white to-slate-50 p-8 text-center shadow-xl dark:from-gray-900 dark:to-gray-800">
                    <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">Build your event website</h2>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">Drag blocks from the left to construct pages. Use the toolbar above to preview and save.</p>
                    <div className="flex items-center justify-center gap-3">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 cursor-pointer">Add Section</button>
                        <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 cursor-pointer">Explore Templates</button>
                    </div>
                </div>
            </div>
        );
    }

        return (
                <div className="w-full">
                    {/* Use same outer container width as WebBuilderHeader (max-w-8xl with px-4) */}
                    <div className="mx-auto w-full max-w-8xl  ">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={blocks.map((b: any) => b.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-6">
                    {blocks.map((b, idx) => {
                        const disableDrag =
                            (b.type === 'gallery' || b.type === 'gallery-grid') &&
                            b?.data?.displayMode === 'stack';

                        return (
                        <SortableBlock key={b.id} id={b.id} disabled={disableDrag}>
                            <div className="relative  border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 group">
                                <div className="absolute right-3 bottom-3 z-10">
                                    <BlockActions onEdit={() => openEdit(b.id)} onDelete={() => openDelete(b.id)} />
                                </div>

                                {b.type === 'layout' && <HeroBlock data={b.data}   />}
                                {b.type === 'about' && <AboutBlock data={b.data} />}
                                {b.type === 'footer' && <FooterBlock data={b.data} />}
                                {b.type === 'content' && <ContentBlock data={b.data} />}
                                {b.type === 'countdown' && <CountdownBlock data={b.data} />}
                                {b.type === 'map' && <MapBlock data={b.data} />}
                                {b.type === 'schedule' && <ScheduleBlock data={b.data} />}
                                {b.type === 'multi-day-schedule' && <MultiDayScheduleBlock data={b.data} />}
                                {b.type === 'social-feed' && <SocialFeedBlock data={b.data} />}
                                {b.type === 'testimonials' && <TestimonialsBlock data={b.data} />}
                                {b.type === 'sponsors' && <SponsorShowcaseBlock data={b.data} />}
                                {b.type === 'venue' && <VenueMapBlock data={b.data} />}
                                {b.type === 'sessions' && <SessionsBlock data={b.data} />}
                                {b.type === 'speakers' && <SpeakersBlock data={b.data} />}
                                {b.type === 'pricing' && <PricingBlock data={b.data} />}
                                {b.type === 'live-stream' && <LiveStreamBlock data={b.data} />}
                                {b.type === 'networking' && <NetworkingBlock data={b.data} />}
                                {b.type === 'ticket' && <TicketBlock data={b.data} />}
                                {b.type === 'gallery' && <GalleryBlock data={b.data} />}
                                {b.type === 'gallery-grid' && <GalleryGridBlock data={b.data} />}
                                {b.type === 'forms' && <ContactFormBlock data={b.data} />}
                                {b.type === 'rsvp' && <RsvpBlock data={b.data} />}
                            </div>
                        </SortableBlock>
                    )})}

                    <Modal open={!!editingBlock} onClose={closeEdit}>
                        {editorComponent}
                    </Modal>

                    <Modal open={!!deletingBlock} title="Confirm delete" onClose={closeDelete}>
                        {deletingBlock && (
                            <div>
                                <p className="mb-4">Are you sure you want to delete this block?</p>
                                <div className="flex justify-end gap-2">
                                    <button type="button" onClick={(e) => { e.stopPropagation(); closeDelete && closeDelete(); }} className="rounded border px-3 py-1">Cancel</button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteBlock?.(deletingBlock.id);
                                            closeDelete();
                                        }}
                                        className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
        );
}


function SortableBlock({ id, children, disabled = false }: { id: string; children: React.ReactNode; disabled?: boolean }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });
    const localRef = React.useRef<HTMLDivElement | null>(null);

    // set both dnd-kit ref and our local ref
    const setRefs = (node: HTMLDivElement | null) => {
        setNodeRef(node);
        localRef.current = node;
    };

    // apply transform/transition via DOM to avoid JSX inline style prop
    React.useEffect(() => {
        const el = localRef.current;
        if (!el) return;
        const t = CSS.Transform.toString(transform);
        try {
            if (t) el.style.transform = t;
            if (transition) el.style.transition = transition;
            el.style.zIndex = isDragging ? '50' : '';
        } catch (e) {
            // ignore silently if DOM not available or style assignment fails
        }
    }, [transform, transition, isDragging]);

    return (
        <div id={`block-${id}`} ref={setRefs} {...attributes} {...listeners}>
            {children}
        </div>
    );
}
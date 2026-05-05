import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Quote, Star } from 'lucide-react';

interface TestimonialData {
  title: string;
  subtitle: string;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
    rating: number;
  }>;
}

interface TestimonialsContentTabProps {
  data: TestimonialData;
  onChange: (data: TestimonialData) => void;
}

export default function TestimonialsContentTab({ data, onChange }: TestimonialsContentTabProps) {
  const updateTestimonial = (idx: number, patch: Partial<TestimonialData['testimonials'][0]>) => {
    const updatedTestimonials = data.testimonials.map((t, i) => (i === idx ? { ...t, ...patch } : t));
    onChange({ ...data, testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      name: 'New Person',
      role: 'Role',
      company: 'Company',
      quote: 'Add your testimonial quote here...',
      rating: 5,
    };
    onChange({ ...data, testimonials: [...data.testimonials, newTestimonial] });
  };

  const removeTestimonial = (idx: number) => {
    const updatedTestimonials = data.testimonials.filter((_, i) => i !== idx);
    onChange({ ...data, testimonials: updatedTestimonials });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500 rounded-lg">
            <Quote className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'What Attendees Say'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Hear from previous event participants'}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {data.testimonials.length > 0 ? (
            data.testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-4 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                    {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.name || 'Name'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role || 'Role'}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                  "{testimonial.quote || 'Add testimonial quote...'}"
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
              No testimonials added yet
            </div>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="testimonials-title">Title</Label>
          <Input
            id="testimonials-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="What Attendees Say"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="testimonials-subtitle">Subtitle</Label>
          <Input
            id="testimonials-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Hear from previous event participants"
          />
        </div>
      </div>

      {/* Testimonials Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Testimonials</h3>
          <Button
            type="button"
            onClick={addTestimonial}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {data.testimonials.map((testimonial, idx) => (
            <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Testimonial {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestimonial(idx)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-name-${idx}`}>Name</Label>
                  <Input
                    id={`testimonial-name-${idx}`}
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(idx, { name: e.target.value })}
                    placeholder="Jennifer Martinez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`testimonial-role-${idx}`}>Role</Label>
                  <Input
                    id={`testimonial-role-${idx}`}
                    value={testimonial.role}
                    onChange={(e) => updateTestimonial(idx, { role: e.target.value })}
                    placeholder="Product Manager"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`testimonial-company-${idx}`}>Company</Label>
                <Input
                  id={`testimonial-company-${idx}`}
                  value={testimonial.company}
                  onChange={(e) => updateTestimonial(idx, { company: e.target.value })}
                  placeholder="StartupCo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`testimonial-quote-${idx}`}>Quote</Label>
                <Textarea
                  id={`testimonial-quote-${idx}`}
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(idx, { quote: e.target.value })}
                  placeholder="This event exceeded my expectations! The speakers were incredible and I made valuable connections."
                  rows={3}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Keep it concise and impactful
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`testimonial-rating-${idx}`}>Rating (1-5 stars)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id={`testimonial-rating-${idx}`}
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) =>
                      updateTestimonial(idx, { rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)) })
                    }
                    className="w-24"
                  />
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.testimonials.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Quote className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No testimonials added yet</p>
              <p className="text-xs mt-1">Click "Add Testimonial" to create your first testimonial</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import type React from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Star, Upload, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ReviewFormData, ReviewFormProps } from '../../types/review';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGES = 5;

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  review: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be less than 1000 characters'),
  categories: z.object({
    quality: z.number().min(1, 'Please rate product quality').max(5),
    communication: z.number().min(1, 'Please rate communication').max(5),
    delivery: z.number().min(1, 'Please rate delivery time').max(5),
    fulfillment: z.number().min(1, 'Please rate contract fulfillment').max(5),
  }),
  media: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported'
        )
    )
    .max(MAX_IMAGES, `You can upload up to ${MAX_IMAGES} images`)
    .optional(),
});

export default function ReviewForm({
  farmId,
  escrowContractId,
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const defaultValues: Partial<ReviewFormData> = {
    rating: initialData?.rating || 0,
    review: initialData?.review || '',
    categories: {
      quality: initialData?.categories?.quality || 0,
      communication: initialData?.categories?.communication || 0,
      delivery: initialData?.categories?.delivery || 0,
      fulfillment: initialData?.categories?.fulfillment || 0,
    },
    media: [],
  };

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues,
  });

  const handleSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Create preview URLs for the selected files
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

      // Update form value
      const currentMedia = form.getValues('media') || [];
      form.setValue('media', [...currentMedia, ...files]);
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);

    // Remove from preview URLs
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);

    // Remove from form value
    const currentMedia = form.getValues('media') || [];
    const newMedia = [...currentMedia];
    newMedia.splice(index, 1);
    form.setValue('media', newMedia);
  };

  const renderStarRating = (
    name:
      | 'rating'
      | 'categories.quality'
      | 'categories.communication'
      | 'categories.delivery'
      | 'categories.fulfillment',
    value: number,
    onChange: (value: number) => void
  ) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= value ? 'fill-[#375B42] text-[#375B42]' : 'text-muted-foreground'
            }`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Your Review' : 'Write a Review'}</CardTitle>
        <CardDescription>
          Share your experience with this farm to help other farmers make informed decisions.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {/* Overall Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Rating</FormLabel>
                  <FormControl>
                    {renderStarRating('rating', field.value, field.onChange)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categories.quality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Quality</FormLabel>
                    <FormControl>
                      {renderStarRating('categories.quality', field.value, field.onChange)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories.communication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Communication</FormLabel>
                    <FormControl>
                      {renderStarRating('categories.communication', field.value, field.onChange)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories.delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Time</FormLabel>
                    <FormControl>
                      {renderStarRating('categories.delivery', field.value, field.onChange)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories.fulfillment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Fulfillment</FormLabel>
                    <FormControl>
                      {renderStarRating('categories.fulfillment', field.value, field.onChange)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Written Review */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this farm..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your review helps other farmers make informed decisions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Media Upload */}
            <FormItem>
              <FormLabel>Add Photos (Optional)</FormLabel>
              <div className="mt-2">
                <div className="flex flex-wrap gap-4 mb-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <Image
                        src={url || '/placeholder.svg'}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {(form.getValues('media')?.length || 0) < MAX_IMAGES && (
                  <div className="flex items-center">
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border border-dashed rounded-md hover:bg-muted">
                        <Upload className="w-4 h-4" />
                        <span>Upload Images</span>
                      </div>
                      <input
                        id="media-upload"
                        type="file"
                        multiple
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <FormDescription className="ml-4">
                      Max 5 images (JPG, PNG, WebP), 5MB each
                    </FormDescription>
                  </div>
                )}
              </div>
              <FormMessage>{form.formState.errors.media?.message}</FormMessage>
            </FormItem>
          </CardContent>
          <CardFooter className="flex justify-between">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#375B42] hover:bg-[#375B42]/90"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEdit ? 'Update Review' : 'Submit Review'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

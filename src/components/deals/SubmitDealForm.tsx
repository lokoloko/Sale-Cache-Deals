// src/components/deals/SubmitDealForm.tsx
"use client"; // This directive indicates that this is a Client Component due to its use of hooks and interactivity.

// --- Core React/Next.js Imports ---
import { useState } from 'react';

// --- Form Handling Imports ---
import { useForm, Controller } from 'react-hook-form'; // For managing form state and validation.
import { zodResolver } from '@hookform/resolvers/zod'; // For integrating Zod schema validation with react-hook-form.
import * as z from 'zod'; // Schema validation library.

// --- UI Component Imports ---
// Reusable components from ShadCN UI library.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- Hook Imports ---
import { useToast } from '@/hooks/use-toast'; // Custom hook for displaying toast notifications.

// --- Icon Imports ---
import { Wand2, Tags, FileText, Loader2 } from 'lucide-react'; // Icons for buttons and visual cues.

// --- AI Flow Imports ---
// 🔍 AI functions to suggest tags and descriptions. These interact with Genkit flows.
import { suggestDealTags, SuggestDealTagsInput } from '@/ai/flows/suggest-deal-tags';
import { suggestDealDescription, SuggestDealDescriptionInput } from '@/ai/flows/suggest-deal-description';

// --- Type Imports ---
// 🔍 Defines the allowed categories for deals.
import type { DealCategory } from '@/lib/types';

// --- Constants ---
// TODO: `dealCategories` could potentially be fetched from a backend or be more dynamic.
const dealCategories: DealCategory[] = ['Firearms', 'Accessories', 'Ammunition', 'Optics', 'Gear'];

// --- Form Validation Schema ---
// 🔍 Zod schema defines the shape and validation rules for the deal submission form.
const submitDealSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  productDescription: z.string().min(10, "Product description must be at least 10 characters"),
  category: z.enum(dealCategories, { required_error: "Please select a category" }),
  retailer: z.string().min(2, "Retailer name is required"),
  retailerUrl: z.string().url("Please enter a valid URL"), // Ensures a valid URL format.
  originalPrice: z.coerce.number().positive("Original price must be positive"), // `coerce` converts string input to number.
  dealPrice: z.coerce.number().positive("Deal price must be positive"),
  imageUrl: z.string().url("Please enter a valid image URL").optional().or(z.literal('')), // Optional image URL.
  tags: z.string().optional(), // Tags are entered as a comma-separated string, then processed.
});

// Infer the TypeScript type from the Zod schema.
type SubmitDealFormValues = z.infer<typeof submitDealSchema>;

// --- SubmitDealForm Component ---
/**
 * @component SubmitDealForm
 * @description A form for users to submit new deals. Includes fields for product details, pricing,
 * retailer information, and AI-powered suggestions for tags and descriptions.
 */
const SubmitDealForm = () => {
  // --- Hooks ---
  const { toast } = useToast(); // Hook for displaying notifications.
  
  // --- State Definitions ---
  /**
   * @state isSubmitting
   * @description Boolean state to indicate if the form is currently being submitted to the backend.
   * Used to disable the submit button and show a loader.
   */
  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * @state isSuggestingTags
   * @description Boolean state for loading indicator on "Suggest Tags" button.
   */
  const [isSuggestingTags, setIsSuggestingTags] = useState(false);
  /**
   * @state isSuggestingDescription
   * @description Boolean state for loading indicator on "Suggest Description" button.
   */
  const [isSuggestingDescription, setIsSuggestingDescription] = useState(false);

  // Initialize react-hook-form with the Zod schema resolver and default values.
  const form = useForm<SubmitDealFormValues>({
    resolver: zodResolver(submitDealSchema),
    defaultValues: { // Default values for form fields.
      productName: '',
      productDescription: '',
      // category: undefined, // Will be handled by Select placeholder
      retailer: '',
      retailerUrl: '',
      tags: '',
      imageUrl: '',
      // originalPrice: undefined, // Handled by number input
      // dealPrice: undefined, // Handled by number input
    },
  });

  // --- Event Handlers ---
  /**
   * @function onSubmit
   * @description Handles the form submission process.
   * // TODO: Replace simulation with an actual API call to the backend to save the deal.
   * // The backend would handle admin review, database insertion, etc.
   * @param {SubmitDealFormValues} data - The validated form data.
   */
  const onSubmit = async (data: SubmitDealFormValues) => {
    setIsSubmitting(true);
    console.log('Submitting deal:', data); // For debugging.
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({ // Display success notification.
      title: "Deal Submitted!",
      description: `${data.productName} has been submitted for review.`,
      variant: 'default',
    });
    form.reset(); // Reset form fields after successful submission.
    setIsSubmitting(false);
  };

  /**
   * @function handleSuggestTags
   * @description Invokes an AI flow to suggest tags based on product name, description, and category.
   * // 🔧 AI (Genkit flow `suggestDealTags`) is called here to provide tag suggestions.
   */
  const handleSuggestTags = async () => {
    // Get current form values needed for the AI suggestion.
    const productName = form.getValues("productName");
    const productDescription = form.getValues("productDescription");
    const category = form.getValues("category");

    // Basic client-side validation before calling AI.
    if (!productName || !productDescription || !category) {
      toast({ title: "Missing Information", description: "Please fill in Product Name, Description, and Category to suggest tags.", variant: "destructive" });
      return;
    }
    setIsSuggestingTags(true);
    try {
      const input: SuggestDealTagsInput = { productName, productDescription, category };
      // Call the AI flow.
      const result = await suggestDealTags(input);
      if (result.tags && result.tags.length > 0) {
        form.setValue("tags", result.tags.join(', ')); // Update the 'tags' field with AI suggestions.
        toast({ title: "Tags Suggested", description: "AI has suggested tags for your deal." });
      } else {
        toast({ title: "No Tags Suggested", description: "AI could not suggest tags based on the provided information.", variant: "default" });
      }
      // `result.description` from `suggestDealTags` output is not currently used but available.
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast({ title: "Error", description: "Could not suggest tags. Please try again.", variant: "destructive" });
    }
    setIsSuggestingTags(false);
  };

  /**
   * @function handleSuggestDescription
   * @description Invokes an AI flow to suggest a product description.
   * // 🔧 AI (Genkit flow `suggestDealDescription`) is called here.
   */
  const handleSuggestDescription = async () => {
    const productName = form.getValues("productName");
    const category = form.getValues("category");
    const retailer = form.getValues("retailer");
    const originalPrice = form.getValues("originalPrice");
    const dealPrice = form.getValues("dealPrice");
    const currentDescription = form.getValues("productDescription"); // Current description can be used as context.

    if (!productName || !category || !retailer || !originalPrice || !dealPrice) {
      toast({ title: "Missing Information", description: "Please fill in Product Name, Category, Retailer, Original Price, and Deal Price to suggest a description.", variant: "destructive" });
      return;
    }
    setIsSuggestingDescription(true);
    try {
      const input: SuggestDealDescriptionInput = { 
        productName, 
        productCategory: category, 
        retailer, 
        originalPrice, 
        dealPrice,
        productDetails: currentDescription // Pass existing description as part of details to the AI.
      };
      const result = await suggestDealDescription(input);
      if (result.suggestedDescription) {
        form.setValue("productDescription", result.suggestedDescription); // Update description field.
        toast({ title: "Description Suggested", description: "AI has suggested a new description." });
      } else {
        toast({ title: "No Description Suggested", description: "AI could not suggest a description.", variant: "default" });
      }
    } catch (error) {
      console.error("Error suggesting description:", error);
      toast({ title: "Error", description: "Could not suggest description. Please try again.", variant: "destructive" });
    }
    setIsSuggestingDescription(false);
  };

  // --- Render Logic ---
  return (
    // Reusable Card component for form structure.
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Submit a New Deal</CardTitle>
        <CardDescription>Share a great find with the community. Fill out the details below.</CardDescription>
      </CardHeader>
      {/* Form element with react-hook-form's handleSubmit. */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6"> {/* Vertical spacing for form groups. */}
          {/* Product Name Field */}
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" {...form.register("productName")} placeholder="e.g., Glock 19 Gen 5" />
            {form.formState.errors.productName && <p className="text-sm text-destructive">{form.formState.errors.productName.message}</p>}
          </div>

          {/* Product Description Field with AI Suggestion Button */}
          <div className="space-y-2">
            <div className="flex justify-between items-center"> {/* Align label and button. */}
              <Label htmlFor="productDescription">Product Description</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleSuggestDescription} disabled={isSuggestingDescription}>
                {isSuggestingDescription ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <FileText className="h-4 w-4 mr-1" />} Suggest
              </Button>
            </div>
            <Textarea id="productDescription" {...form.register("productDescription")} placeholder="Detailed description of the product and deal..." rows={5} />
            {form.formState.errors.productDescription && <p className="text-sm text-destructive">{form.formState.errors.productDescription.message}</p>}
          </div>
          
          {/* Category and Retailer Fields (Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              {/* Controller for integrating Select component with react-hook-form. */}
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* // 🔍 `dealCategories` are mapped to SelectItem components. */}
                      {dealCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.category && <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="retailer">Retailer</Label>
              <Input id="retailer" {...form.register("retailer")} placeholder="e.g., Primary Arms" />
              {form.formState.errors.retailer && <p className="text-sm text-destructive">{form.formState.errors.retailer.message}</p>}
            </div>
          </div>

          {/* Retailer URL Field */}
          <div className="space-y-2">
            <Label htmlFor="retailerUrl">Retailer URL (Link to Deal)</Label>
            <Input id="retailerUrl" {...form.register("retailerUrl")} placeholder="https://..." type="url" />
            {form.formState.errors.retailerUrl && <p className="text-sm text-destructive">{form.formState.errors.retailerUrl.message}</p>}
          </div>
          
          {/* Original Price and Deal Price Fields (Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input id="originalPrice" {...form.register("originalPrice")} type="number" step="0.01" placeholder="e.g., 599.99" />
              {form.formState.errors.originalPrice && <p className="text-sm text-destructive">{form.formState.errors.originalPrice.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dealPrice">Deal Price ($)</Label>
              <Input id="dealPrice" {...form.register("dealPrice")} type="number" step="0.01" placeholder="e.g., 539.99" />
              {form.formState.errors.dealPrice && <p className="text-sm text-destructive">{form.formState.errors.dealPrice.message}</p>}
            </div>
          </div>

          {/* Image URL Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input id="imageUrl" {...form.register("imageUrl")} placeholder="https://.../image.png" type="url" />
            {form.formState.errors.imageUrl && <p className="text-sm text-destructive">{form.formState.errors.imageUrl.message}</p>}
          </div>
          
          {/* Tags Field with AI Suggestion Button (Optional) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center"> {/* Align label and button. */}
              <Label htmlFor="tags">Tags (Comma-separated, optional)</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleSuggestTags} disabled={isSuggestingTags}>
                {isSuggestingTags ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Tags className="h-4 w-4 mr-1" />} Suggest
              </Button>
            </div>
            <Input id="tags" {...form.register("tags")} placeholder="e.g., pistol, 9mm, edc" />
            {form.formState.errors.tags && <p className="text-sm text-destructive">{form.formState.errors.tags.message}</p>}
          </div>

        </CardContent>
        <CardFooter> {/* Footer for the submit button. */}
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />} {/* Icon changes based on submission state. */}
            {isSubmitting ? 'Submitting...' : 'Submit Deal for Review'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SubmitDealForm;

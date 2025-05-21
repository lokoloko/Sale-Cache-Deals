"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Tags, FileText, Loader2 } from 'lucide-react';
import { suggestDealTags, SuggestDealTagsInput } from '@/ai/flows/suggest-deal-tags';
import { suggestDealDescription, SuggestDealDescriptionInput } from '@/ai/flows/suggest-deal-description';
import type { DealCategory } from '@/lib/types';

const dealCategories: DealCategory[] = ['Firearms', 'Accessories', 'Ammunition', 'Optics', 'Gear'];

const submitDealSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  productDescription: z.string().min(10, "Product description must be at least 10 characters"),
  category: z.enum(dealCategories, { required_error: "Please select a category" }),
  retailer: z.string().min(2, "Retailer name is required"),
  retailerUrl: z.string().url("Please enter a valid URL"),
  originalPrice: z.coerce.number().positive("Original price must be positive"),
  dealPrice: z.coerce.number().positive("Deal price must be positive"),
  imageUrl: z.string().url("Please enter a valid image URL").optional().or(z.literal('')),
  tags: z.string().optional(), // Will be comma-separated, then processed
});

type SubmitDealFormValues = z.infer<typeof submitDealSchema>;

const SubmitDealForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggestingTags, setIsSuggestingTags] = useState(false);
  const [isSuggestingDescription, setIsSuggestingDescription] = useState(false);

  const form = useForm<SubmitDealFormValues>({
    resolver: zodResolver(submitDealSchema),
    defaultValues: {
      productName: '',
      productDescription: '',
      retailer: '',
      retailerUrl: '',
      tags: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: SubmitDealFormValues) => {
    setIsSubmitting(true);
    console.log('Submitting deal:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Deal Submitted!",
      description: `${data.productName} has been submitted for review.`,
      variant: 'default',
    });
    form.reset();
    setIsSubmitting(false);
  };

  const handleSuggestTags = async () => {
    const productName = form.getValues("productName");
    const productDescription = form.getValues("productDescription");
    const category = form.getValues("category");

    if (!productName || !productDescription || !category) {
      toast({ title: "Missing Information", description: "Please fill in Product Name, Description, and Category to suggest tags.", variant: "destructive" });
      return;
    }
    setIsSuggestingTags(true);
    try {
      const input: SuggestDealTagsInput = { productName, productDescription, category };
      const result = await suggestDealTags(input);
      if (result.tags && result.tags.length > 0) {
        form.setValue("tags", result.tags.join(', '));
        toast({ title: "Tags Suggested", description: "AI has suggested tags for your deal." });
      } else {
        toast({ title: "No Tags Suggested", description: "AI could not suggest tags based on the provided information.", variant: "default" });
      }
      // Optionally use result.description for something if needed
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast({ title: "Error", description: "Could not suggest tags. Please try again.", variant: "destructive" });
    }
    setIsSuggestingTags(false);
  };

  const handleSuggestDescription = async () => {
    const productName = form.getValues("productName");
    const category = form.getValues("category");
    const retailer = form.getValues("retailer");
    const originalPrice = form.getValues("originalPrice");
    const dealPrice = form.getValues("dealPrice");
    const currentDescription = form.getValues("productDescription");


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
        productDetails: currentDescription // Using existing description as part of product details
      };
      const result = await suggestDealDescription(input);
      if (result.suggestedDescription) {
        form.setValue("productDescription", result.suggestedDescription);
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


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Submit a New Deal</CardTitle>
        <CardDescription>Share a great find with the community. Fill out the details below.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" {...form.register("productName")} placeholder="e.g., Glock 19 Gen 5" />
            {form.formState.errors.productName && <p className="text-sm text-destructive">{form.formState.errors.productName.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="productDescription">Product Description</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleSuggestDescription} disabled={isSuggestingDescription}>
                {isSuggestingDescription ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <FileText className="h-4 w-4 mr-1" />} Suggest
              </Button>
            </div>
            <Textarea id="productDescription" {...form.register("productDescription")} placeholder="Detailed description of the product and deal..." rows={5} />
            {form.formState.errors.productDescription && <p className="text-sm text-destructive">{form.formState.errors.productDescription.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
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

          <div className="space-y-2">
            <Label htmlFor="retailerUrl">Retailer URL (Link to Deal)</Label>
            <Input id="retailerUrl" {...form.register("retailerUrl")} placeholder="https://..." type="url" />
            {form.formState.errors.retailerUrl && <p className="text-sm text-destructive">{form.formState.errors.retailerUrl.message}</p>}
          </div>
          
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

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input id="imageUrl" {...form.register("imageUrl")} placeholder="https://.../image.png" type="url" />
            {form.formState.errors.imageUrl && <p className="text-sm text-destructive">{form.formState.errors.imageUrl.message}</p>}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="tags">Tags (Comma-separated, optional)</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleSuggestTags} disabled={isSuggestingTags}>
                {isSuggestingTags ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Tags className="h-4 w-4 mr-1" />} Suggest
              </Button>
            </div>
            <Input id="tags" {...form.register("tags")} placeholder="e.g., pistol, 9mm, edc" />
            {form.formState.errors.tags && <p className="text-sm text-destructive">{form.formState.errors.tags.message}</p>}
          </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />}
            {isSubmitting ? 'Submitting...' : 'Submit Deal for Review'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SubmitDealForm;

"use client";

import type { ExtensionOptions } from "@/types/content";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { updateTabsOnSave } from "@/utils/messaging";

const formSchema = z.object({
  enabled: z.boolean().default(false),
  redirectMode: z.enum(["none", "following", "messages"]).default("none"),
  blockStories: z.boolean().default(false),
  blockReels: z.boolean().default(false),
  blockExplore: z.boolean().default(false),
  blockPosts: z.union([z.boolean(), z.literal("suggested")]).default(false),
  blockSidebar: z.union([z.boolean(), z.literal("suggested")]).default(true),
});

export function ExtensionControls() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    (async () => {
      const options = await extensionOptions.getValue();

      form.reset({
        ...options,
        blockPosts:
          options.blockPosts === "suggested"
            ? "suggested"
            : Boolean(options.blockPosts),
        blockSidebar:
          options.blockSidebar === "suggested"
            ? "suggested"
            : Boolean(options.blockSidebar),
      });
    })();
  }, [form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const options = { ...data } as ExtensionOptions;
    // Convert "yes" and "no" to boolean values
    options.blockPosts =
      options.blockPosts === "suggested"
        ? "suggested"
        : Boolean(options.blockPosts);
    options.blockSidebar =
      options.blockSidebar === "suggested"
        ? "suggested"
        : Boolean(options.blockSidebar);

    await extensionOptions.setValue(options);

    toast.success("Settings saved successfully.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  enable extension
                </FormLabel>
                <FormDescription>
                  turn the instagram control extension on or off
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="redirectMode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  redirect mode
                </FormLabel>
                <FormDescription>
                  choose where to redirect when opening instagram
                </FormDescription>
              </div>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="!mt-0 max-w-48">
                    <SelectValue placeholder="select a redirect mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">none</SelectItem>
                  <SelectItem value="following">
                    redirect to following
                  </SelectItem>
                  <SelectItem value="messages">redirect to messages</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blockStories"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  block stories
                </FormLabel>
                <FormDescription>
                  prevent stories from loading in your feed
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blockReels"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  block reels
                </FormLabel>
                <FormDescription>
                  remove reels from your instagram experience
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blockExplore"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  block explore
                </FormLabel>
                <FormDescription>
                  disable access to the explore page
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blockPosts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  block posts
                </FormLabel>
                <FormDescription>
                  control which posts appear in your feed
                </FormDescription>
              </div>
              <Select
                value={String(field.value)}
                onValueChange={(value) =>
                  field.onChange(
                    value === "true" ? true : value === "false" ? false : value
                  )
                }>
                <FormControl>
                  <SelectTrigger className="!mt-0 max-w-48">
                    <SelectValue placeholder="select a block posts option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">yes</SelectItem>
                  <SelectItem value="false">no</SelectItem>
                  <SelectItem value="suggested">
                    suggested posts only
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blockSidebar"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  block sidebar
                </FormLabel>
                <FormDescription>
                  customize the visibility of the sidebar content
                </FormDescription>
              </div>
              <Select
                value={String(field.value)}
                onValueChange={(value) =>
                  field.onChange(
                    value === "true" ? true : value === "false" ? false : value
                  )
                }>
                <FormControl>
                  <SelectTrigger className="!mt-0 max-w-48">
                    <SelectValue placeholder="select a block sidebar option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">yes</SelectItem>
                  <SelectItem value="false">no</SelectItem>
                  <SelectItem value="suggested">
                    suggested followers only
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="justify-end">
          <Button
            onClick={() => updateTabsOnSave()}
            type="submit"
            variant="secondary"
            className="w-fit">
            save settings
          </Button>
        </div>
      </form>
    </Form>
  );
}

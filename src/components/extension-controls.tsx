"use client";

import type { ExtensionOptions } from "@/types/content";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod/v3";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { extensionOptions } from "@/utils/storage";

const formSchema = z.object({
  enabled: z.boolean(),
  redirectMode: z.enum(["none", "following", "messages"]),
  blockStories: z.boolean(),
  blockReels: z.boolean(),
  blockExplore: z.boolean(),
  blockPosts: z.boolean(),
  blockSidebar: z.union([z.boolean(), z.literal("suggested")]),
});

export function ExtensionControls() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enabled: false,
      redirectMode: "none",
      blockStories: false,
      blockReels: false,
      blockExplore: false,
      blockPosts: false,
      blockSidebar: true,
    },
  });

  useEffect(() => {
    (async () => {
      const options = await extensionOptions.getValue();

      form.reset({
        ...options,
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
    options.blockSidebar =
      options.blockSidebar === "suggested"
        ? "suggested"
        : Boolean(options.blockSidebar);

    await extensionOptions.setValue(options);

    toast.success("Settings saved successfully.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="enabled"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="enabled"
                  className="text-base font-semibold">
                  enable extension
                </FieldLabel>
                <FieldDescription>
                  turn the Instagram control extension on or off
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="enabled"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Separator />

        <Controller
          control={form.control}
          name="redirectMode"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="redirectMode"
                  className="text-base font-semibold">
                  redirect mode
                </FieldLabel>
                <FieldDescription>
                  choose where to redirect when opening Instagram
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id="redirectMode"
                  aria-invalid={fieldState.invalid}
                  className="max-w-48">
                  <SelectValue placeholder="select a redirect mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">none</SelectItem>
                  <SelectItem value="following">
                    redirect to following
                  </SelectItem>
                  <SelectItem value="messages">redirect to messages</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="blockStories"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="blockStories"
                  className="text-base font-semibold">
                  block stories
                </FieldLabel>
                <FieldDescription>
                  prevent stories from loading in your feed
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="blockStories"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="blockReels"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="blockReels"
                  className="text-base font-semibold">
                  block reels
                </FieldLabel>
                <FieldDescription>
                  remove reels from your Instagram experience
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="blockReels"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="blockExplore"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="blockExplore"
                  className="text-base font-semibold">
                  block explore
                </FieldLabel>
                <FieldDescription>
                  disable access to the explore page
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="blockExplore"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="blockPosts"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="blockPosts"
                  className="text-base font-semibold">
                  block posts
                </FieldLabel>
                <FieldDescription>
                  control which posts appear in your feed
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="blockPosts"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="blockSidebar"
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="bg-card rounded-2xl p-4">
              <FieldContent>
                <FieldLabel
                  htmlFor="blockSidebar"
                  className="text-base font-semibold">
                  block sidebar
                </FieldLabel>
                <FieldDescription>
                  customize the visibility of the sidebar content
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={String(field.value)}
                onValueChange={(value) =>
                  field.onChange(
                    value === "true" ? true : value === "false" ? false : value
                  )
                }>
                <SelectTrigger
                  id="blockSidebar"
                  aria-invalid={fieldState.invalid}
                  className="max-w-48">
                  <SelectValue placeholder="select a block sidebar option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">yes</SelectItem>
                  <SelectItem value="false">no</SelectItem>
                  <SelectItem value="suggested">
                    suggested followers only
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>

      <div className="justify-end">
        <Button
          onClick={() => updateTabsOnSave()}
          type="submit"
          className="w-fit">
          save settings
        </Button>
      </div>
    </form>
  );
}

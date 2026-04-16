"use client"

import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormItem, FormMessage, FormField, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";
import { Button } from "../ui/button";




type EventFormProps = {
    userId: string;
    type: "Create" | "Update"
}

const EventForm = ({userId, type}: EventFormProps) => {

  const initialValues = eventDefaultValues

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })

  
  return (
    <>
      <Form {...form}>
        
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <Button type="submit" size="lg" className="button col-span-2 w-full">
          Submit
        </Button>
        </form>
      </Form>
    </>
  )
}

export default EventForm

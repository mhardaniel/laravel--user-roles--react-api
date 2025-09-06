'use client';

import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRoleStore } from "@/store/roleStore";
import { useUserStore } from "@/store/userStore";

const CreatePage = () => {
  const navigate = useNavigate();
  const { createUser, loading, error } = useUserStore()
  const { fetchRoles, roles } = useRoleStore();

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    roles: z.string().array().min(1, "Required"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      roles: []
    },
  })

  useEffect(() => {
    fetchRoles();

  }, [fetchRoles]);

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const success = await createUser(values)

    success ?
      toast.success("User created successfully!") && navigate('/') :
      toast.error("Failed to create user.")

  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="w-full">
        <h1 className="text-2xl mb-5 text-center">Create New User</h1>

        {error && <p className="text-(--destructive) py-8">Error: {error}</p>}

        <div className="w-full p-6 rounded-lg shadow-md">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>
                    <MultiSelect onValuesChange={field.onChange} values={field.value}>
                      <FormControl>
                        <MultiSelectTrigger className="w-full">
                          <MultiSelectValue placeholder="Select roles..." />
                        </MultiSelectTrigger>
                      </FormControl>
                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {roles.map((role) => (
                            <MultiSelectItem value={role} key={role}>{role}</MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} type="submit">Submit</Button>
            </form>
          </Form>

        </div>
      </div>
    </div>
  )
}

export default CreatePage

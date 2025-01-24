"use client"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(1, { message: "Name must be at least 1 character." }).max(50, { message: "Name must be at most 50 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().min(10, { message: "Phone NUmber must be at least 10 characters." }).max(15, { message: "Name must be at most 15 characters." }),
    role: z.string().nonempty({ message: "Role is required." }),
})

export default function CreateUser() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "15rem",
                } as React.CSSProperties
            }
        >
            <SideBar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between mb-4">
                    <SidebarTrigger className="-ml-1 dark:text-white" />
                    <ModeToggle />
                </header>
                <CreateBlogContent />
            </SidebarInset>
        </SidebarProvider>
    )
}

export const CreateBlogContent = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            phoneNumber: "",
        },
    })

    const onCreateUser = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div>
            <h1 className="text-xl dark:text-white ml-8 font-bold">Create User</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateUser)} className="space-y-8">
                    <div className="flex flex-1 flex-col gap-4 py-4 px-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name of the user" {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter user email address"
                                           {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="Number" placeholder="Enter user phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value} 
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="author">Author</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="ml-8" >
                        Create
                    </Button>
                </form>
            </Form>
        </div>
    )
}
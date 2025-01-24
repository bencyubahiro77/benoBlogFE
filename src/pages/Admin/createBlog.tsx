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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).max(50, { message: "Title must be at most 50 characters." }),
    category: z.string().nonempty({ message: "Category is required." }),
    coverImage: z
        .instanceof(File, { message: "Cover image is required and must be a valid file." })
        .or(z.null()),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(2545000),
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
            title: "",
            description: "",
            category: "",
            coverImage: null,
        },
    })

    const onCreateUser = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div>
            <h1 className="text-xl dark:text-white ml-8 font-bold">Create Blog</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateUser)} className="space-y-8">
                    <div className="flex flex-1 flex-col gap-4 py-4 px-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title of the blog" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value} // Bind the value
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="business">Business</SelectItem>
                                                <SelectItem value="politic">Politic</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="health">Health</SelectItem>
                                                <SelectItem value="sports">Sports</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null; // Get selected file or null
                                                field.onChange(file); // Update form value
                                            }}
                                            onBlur={field.onBlur} // Maintain blur functionality
                                            name={field.name} // Ensure the correct name is used
                                            ref={field.ref} // Use the correct ref for the input
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="h-[20vh] resize-none" {...field} />
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